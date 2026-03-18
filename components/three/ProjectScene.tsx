'use client'
import { useRef, useEffect, useState, useCallback } from 'react'
import * as THREE from 'three'
import { Project } from '@/lib/data'

type View = 'overview' | 'flow' | 'explode'
interface Props { project: Project }

const C: Record<string, number> = {
  blue: 0x00d4ff, purple: 0x7c3aed, amber: 0xf59e0b, green: 0x34d399,
}
const CCSS: Record<string, string> = {
  blue: '#00d4ff', purple: '#a78bfa', amber: '#f59e0b', green: '#34d399',
}

// Canvas always dark — independent of site theme
const CANVAS_BG = 0x04080f

export default function ProjectScene({ project }: Props) {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const wrapRef    = useRef<HTMLDivElement>(null)
  const viewRef    = useRef<View>('overview')
  const rafRef     = useRef(0)
  const hovRef     = useRef<string | null>(null)
  const rendRef    = useRef<THREE.WebGLRenderer | null>(null)
  const camRef     = useRef({ theta: 0.0, phi: 0.18, r: 20 })
  const dragRef    = useRef({ active: false, px: 0, py: 0 })
  const meshMapRef = useRef<Map<string, THREE.Mesh>>(new Map())
  const lineGeoRef = useRef<Map<string, THREE.BufferAttribute>>(new Map())
  const cameraRef  = useRef<THREE.PerspectiveCamera | null>(null)

  const [activeView, setActiveView] = useState<View>('overview')
  const [hovId, setHovId]           = useState<string | null>(null)
  const [labels, setLabels]         = useState<Record<string, {x:number;y:number;ok:boolean}>>({})
  const [canvasH, setCanvasH]       = useState(500)

  const { nodes, edges } = project.architecture

  useEffect(() => {
    const canvas = canvasRef.current!
    const wrap   = wrapRef.current!

    const getW = () => wrap.clientWidth
    const getH = () => Math.max(460, Math.round(wrap.clientWidth * 0.44))

    const initH = getH()
    setCanvasH(initH)

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(getW(), initH)
    renderer.setClearColor(CANVAS_BG, 1)
    rendRef.current = renderer

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(CANVAS_BG)
    scene.fog = new THREE.Fog(CANVAS_BG, 35, 65)

    const camera = new THREE.PerspectiveCamera(40, getW() / initH, 0.1, 200)
    cameraRef.current = camera

    // ── Lighting ──────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.45))
    const dl1 = new THREE.DirectionalLight(0x00d4ff, 2.5)
    dl1.position.set(6, 10, 8); scene.add(dl1)
    const dl2 = new THREE.DirectionalLight(0x7c3aed, 1.4)
    dl2.position.set(-8, -5, 4); scene.add(dl2)
    const pl  = new THREE.PointLight(0xf59e0b, 1.2, 55)
    pl.position.set(0, 3, 12); scene.add(pl)

    // ── Grid ─────────────────────────────────────────────────
    const grid = new THREE.GridHelper(50, 40, 0x0b1e38, 0x0b1e38)
    ;(grid.material as THREE.Material).transparent = true
    ;(grid.material as THREE.Material).opacity = 0.55
    grid.position.y = -6; scene.add(grid)

    // ── Layout: strict rows, each row centered ────────────────
    const rowGroups = new Map<number, typeof nodes>()
    nodes.forEach(n => {
      if (!rowGroups.has(n.row)) rowGroups.set(n.row, [])
      rowGroups.get(n.row)!.push(n)
    })

    const totalRows = rowGroups.size
    const maxCols   = Math.max(...Array.from(rowGroups.values()).map(r => r.length))

    // Dynamic spacing so layout fills ~85% of view
    const ROW_H = Math.min(3.2, 13 / Math.max(totalRows - 1, 1))
    const COL_W = Math.min(4.8, 16 / Math.max(maxCols - 1, 1))

    const posMap = new Map<string, THREE.Vector3>()
    rowGroups.forEach((rowNodes, rowIdx) => {
      const n      = rowNodes.length
      const startX = -(n - 1) * COL_W / 2
      const y      = ((totalRows - 1) / 2 - rowIdx) * ROW_H
      rowNodes.forEach((nd, ci) => {
        posMap.set(nd.id, new THREE.Vector3(startX + ci * COL_W, y, 0))
      })
    })

    // Camera distance — based on actual layout spread
    const spreadX  = (maxCols - 1) * COL_W + 5
    const spreadY  = (totalRows - 1) * ROW_H + 3
    const baseDist = Math.max(spreadX, spreadY) / (2 * Math.tan(((40 / 2) * Math.PI) / 180)) + 4
    camRef.current.r = Math.min(baseDist, 28)

    const updateCam = () => {
      const { theta, phi, r } = camRef.current
      camera.position.set(
        r * Math.sin(theta) * Math.cos(phi),
        r * Math.sin(phi) + 1,
        r * Math.cos(theta) * Math.cos(phi),
      )
      camera.lookAt(0, 0, 0)
    }
    updateCam()

    // ── Node geometry ─────────────────────────────────────────
    const NW = Math.max(1.8, Math.min(3.0, COL_W * 0.58))
    const NH = 0.58
    const ND = 1.05

    const meshMap = new Map<string, THREE.Mesh>()
    nodes.forEach(nd => {
      const col = C[nd.color] ?? C.blue
      const pos = posMap.get(nd.id)!

      const geo = new THREE.BoxGeometry(NW, NH, ND)
      const mat = new THREE.MeshPhongMaterial({
        color: col, emissive: col, emissiveIntensity: 0.28,
        transparent: true, opacity: 0.92, shininess: 110,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.copy(pos)
      mesh.userData = {
        id: nd.id, label: nd.label, sub: nd.sublabel,
        col: nd.color, hex: col,
        orig: pos.clone(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.18 + Math.random() * 0.12,
        expl: new THREE.Vector3(),
      }
      mesh.add(new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.65 }),
      ))
      scene.add(mesh)
      meshMap.set(nd.id, mesh)
    })
    meshMapRef.current = meshMap

    // ── Connector lines ───────────────────────────────────────
    const lineGeoMap = new Map<string, THREE.BufferAttribute>()
    edges.forEach(edge => {
      const key  = `${edge.from}>${edge.to}`
      const geom = new THREE.BufferGeometry()
      const buf  = new THREE.BufferAttribute(new Float32Array(6), 3)
      geom.setAttribute('position', buf)
      const mat  = new THREE.LineBasicMaterial({ color: 0x1e4060, transparent: true, opacity: 0.9 })
      scene.add(new THREE.Line(geom, mat))
      lineGeoMap.set(key, buf)
    })
    lineGeoRef.current = lineGeoMap

    // ── Input ────────────────────────────────────────────────
    const onMD = (e: MouseEvent) => {
      dragRef.current = { active: true, px: e.clientX, py: e.clientY }
    }
    const onMU = () => { dragRef.current.active = false }
    const onMM = (e: MouseEvent) => {
      if (!dragRef.current.active) return
      camRef.current.theta += (e.clientX - dragRef.current.px) * 0.007
      camRef.current.phi    = Math.max(0.04, Math.min(0.72, camRef.current.phi + (e.clientY - dragRef.current.py) * 0.004))
      dragRef.current.px = e.clientX
      dragRef.current.py = e.clientY
      updateCam()
    }
    let ltx = 0, lty = 0
    const onTD = (e: TouchEvent) => {
      dragRef.current.active = true
      ltx = e.touches[0].clientX; lty = e.touches[0].clientY
    }
    const onTU = () => { dragRef.current.active = false }
    const onTM = (e: TouchEvent) => {
      if (!dragRef.current.active || !e.touches[0]) return
      camRef.current.theta += (e.touches[0].clientX - ltx) * 0.007
      camRef.current.phi    = Math.max(0.04, Math.min(0.72, camRef.current.phi + (e.touches[0].clientY - lty) * 0.004))
      ltx = e.touches[0].clientX; lty = e.touches[0].clientY
      updateCam(); e.preventDefault()
    }
    canvas.addEventListener('mousedown', onMD)
    window.addEventListener('mouseup', onMU)
    window.addEventListener('mousemove', onMM)
    canvas.addEventListener('touchstart', onTD, { passive: true })
    canvas.addEventListener('touchend', onTU)
    canvas.addEventListener('touchmove', onTM, { passive: false })

    // Raycaster
    const ray   = new THREE.Raycaster()
    const mouse = new THREE.Vector2(-99, -99)
    const onHov = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x =  ((e.clientX - r.left) / r.width)  * 2 - 1
      mouse.y = -((e.clientY - r.top)  / r.height) * 2 + 1
    }
    canvas.addEventListener('mousemove', onHov)

    const onResize = () => {
      const w = getW(), h = getH()
      renderer.setSize(w, h)
      setCanvasH(h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ────────────────────────────────────────
    const meshList = Array.from(meshMap.values())
    const tmp = new THREE.Vector3()
    let t = 0

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      t += 0.011

      meshList.forEach(m => {
        const orig = m.userData.orig as THREE.Vector3
        const expl = m.userData.expl as THREE.Vector3
        // Lerp toward target (orig + explode offset)
        m.position.x += (orig.x + expl.x - m.position.x) * 0.07
        m.position.z += (orig.z + expl.z - m.position.z) * 0.07
        // Float on Y
        m.position.y = orig.y + expl.y + Math.sin(t * m.userData.speed + m.userData.phase) * 0.09
        m.rotation.y += 0.0025

        const mat = m.material as THREE.MeshPhongMaterial

        if (viewRef.current === 'flow') {
          // Cascade pulse: top rows glow first, then lower rows
          const rowPhase = -orig.y * 0.55
          const pulse = (Math.sin(t * 2.0 + rowPhase) + 1) / 2
          mat.emissiveIntensity = 0.12 + pulse * 0.8
          mat.opacity = 0.7 + pulse * 0.28
        } else {
          mat.emissiveIntensity += (0.28 - mat.emissiveIntensity) * 0.06
          mat.opacity += (0.92 - mat.opacity) * 0.06
        }

        // Hover boost
        if (m.userData.id === hovRef.current) {
          mat.emissiveIntensity = Math.min(mat.emissiveIntensity + 0.35, 1.0)
        }
      })

      // Update connector line positions every frame
      edges.forEach(edge => {
        const buf = lineGeoMap.get(`${edge.from}>${edge.to}`)
        const mA  = meshMap.get(edge.from)
        const mB  = meshMap.get(edge.to)
        if (!buf || !mA || !mB) return
        buf.setXYZ(0, mA.position.x, mA.position.y, mA.position.z)
        buf.setXYZ(1, mB.position.x, mB.position.y, mB.position.z)
        buf.needsUpdate = true
      })

      // Auto-rotate (slow, gentle)
      if (!dragRef.current.active) {
        camRef.current.theta += 0.0010
        updateCam()
      }

      // Hover detection
      ray.setFromCamera(mouse, camera)
      const hits = ray.intersectObjects(meshList, false)
      const hid  = hits.length > 0 ? hits[0].object.userData.id as string : null
      if (hid !== hovRef.current) {
        hovRef.current = hid
        setHovId(hid)
      }

      // Project to 2D for CSS labels
      const cw = getW(), ch = getH()
      const newL: Record<string, {x:number;y:number;ok:boolean}> = {}
      meshList.forEach(m => {
        tmp.copy(m.position).project(camera)
        const x = ((tmp.x + 1) / 2) * cw
        const y = ((-tmp.y + 1) / 2) * ch
        newL[m.userData.id] = { x, y, ok: tmp.z < 1 && x > 10 && x < cw - 10 && y > 6 && y < ch - 6 }
      })
      setLabels(newL)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener('mousedown', onMD)
      window.removeEventListener('mouseup', onMU)
      window.removeEventListener('mousemove', onMM)
      canvas.removeEventListener('touchstart', onTD)
      canvas.removeEventListener('touchend', onTU)
      canvas.removeEventListener('touchmove', onTM)
      canvas.removeEventListener('mousemove', onHov)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id])

  const handleView = useCallback((v: View) => {
    viewRef.current = v
    setActiveView(v)
    const mm = meshMapRef.current
    if (v === 'explode') {
      let i = 0
      mm.forEach(m => {
        const orig = m.userData.orig as THREE.Vector3
        // Fan each node outward from center on Z axis
        const angle = (i / mm.size) * Math.PI * 2
        ;(m.userData.expl as THREE.Vector3).set(
          Math.cos(angle) * 2.8, 0, Math.sin(angle) * 2.8,
        )
        i++
      })
    } else {
      mm.forEach(m => (m.userData.expl as THREE.Vector3).set(0, 0, 0))
    }
  }, [])

  const hovNode = hovId ? nodes.find(n => n.id === hovId) : null

  return (
    <div style={{ borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(0,212,255,0.15)', background: '#04080f' }}>

      {/* ── Canvas area ─────────────────────────────── */}
      <div ref={wrapRef} style={{ position: 'relative', background: '#04080f', cursor: 'grab', width: '100%' }}>

        {/* Top-left status */}
        <div style={{
          position: 'absolute', top: 12, left: 14, zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 7,
          fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
          color: '#00d4ff', fontFamily: 'monospace',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', display: 'inline-block', animation: 'blink 1.1s step-end infinite' }} />
          Interactive · Drag to rotate
        </div>

        {/* Top-right stats */}
        <div style={{
          position: 'absolute', top: 12, right: 14, zIndex: 10,
          fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
          fontFamily: 'monospace', color: 'rgba(107,127,163,0.7)',
          background: 'rgba(4,8,15,0.8)', border: '1px solid rgba(255,255,255,0.07)',
          padding: '3px 9px',
        }}>
          {nodes.length} nodes · {edges.length} edges
        </div>

        {/* ── CSS label overlay ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none', overflow: 'hidden', height: canvasH }}>
          {nodes.map(nd => {
            const lp = labels[nd.id]
            if (!lp?.ok) return null
            const isHov = hovId === nd.id
            const css   = CCSS[nd.color] ?? '#00d4ff'
            return (
              <div key={nd.id} style={{
                position: 'absolute',
                left: lp.x, top: lp.y,
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                pointerEvents: 'none',
                opacity: isHov ? 1 : 0.92,
                transition: 'opacity 0.15s',
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, fontFamily: 'monospace',
                  letterSpacing: '0.04em', color: css, whiteSpace: 'nowrap',
                  textShadow: `0 0 12px ${css}bb, 0 0 4px #000, 0 1px 3px #000`,
                  lineHeight: 1.2,
                }}>
                  {nd.label}
                </div>
                <div style={{
                  fontSize: 8, fontFamily: 'monospace', letterSpacing: '0.05em',
                  color: 'rgba(160,180,210,0.8)', marginTop: 1, whiteSpace: 'nowrap',
                  textShadow: '0 1px 3px #000',
                }}>
                  {nd.sublabel}
                </div>
              </div>
            )
          })}
        </div>

        {/* Hover tooltip */}
        {hovNode && (
          <div style={{
            position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
            zIndex: 20, pointerEvents: 'none',
            background: 'rgba(4,8,15,0.97)',
            border: `1px solid ${CCSS[hovNode.color] ?? '#00d4ff'}44`,
            borderLeft: `3px solid ${CCSS[hovNode.color] ?? '#00d4ff'}`,
            padding: '8px 18px', minWidth: 180, textAlign: 'center',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, fontFamily: 'monospace', color: CCSS[hovNode.color] ?? '#00d4ff', letterSpacing: '0.05em' }}>
              {hovNode.label}
            </div>
            <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#6b7fa3', marginTop: 3 }}>
              {hovNode.sublabel}
            </div>
          </div>
        )}

        <canvas ref={canvasRef} style={{ width: '100%', height: canvasH, display: 'block' }} />
      </div>

      {/* ── Controls bar ────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', borderTop: '1px solid rgba(255,255,255,0.05)',
        background: '#030710', flexWrap: 'wrap', gap: 8,
      }}>
        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(107,127,163,0.4)', fontFamily: 'monospace' }}>
            Legend
          </span>
          {Object.entries(CCSS).map(([name, hex]) => (
            <span key={name} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: hex, display: 'inline-block', boxShadow: `0 0 6px ${hex}88` }} />
              <span style={{ fontSize: 9, textTransform: 'capitalize', color: 'rgba(160,176,204,0.5)', fontFamily: 'monospace' }}>{name}</span>
            </span>
          ))}
        </div>
        {/* View buttons */}
        <div style={{ display: 'flex', gap: 6 }}>
          {(['overview', 'flow', 'explode'] as View[]).map(v => (
            <button key={v} onClick={() => handleView(v)} style={{
              fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '5px 13px',
              border: activeView === v ? '1px solid #00d4ff' : '1px solid rgba(255,255,255,0.09)',
              color: activeView === v ? '#00d4ff' : 'rgba(107,127,163,0.75)',
              background: activeView === v ? 'rgba(0,212,255,0.1)' : 'rgba(4,8,15,0.6)',
              fontFamily: 'monospace', cursor: 'pointer', transition: 'all 0.18s',
            }}>
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
