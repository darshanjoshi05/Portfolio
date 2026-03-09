'use client'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

type View = 'overview' | 'flow' | 'modules' | 'explode'

export default function ProjectScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const viewRef   = useRef<View>('overview')
  const sceneRef  = useRef<{ meshes: THREE.Mesh[]; camera: THREE.PerspectiveCamera; camTheta: number; camPhi: number; isDrag: boolean }>()
  const [activeView, setActiveView] = useState<View>('overview')

  useEffect(() => {
    const canvas = canvasRef.current!
    const container = canvas.parentElement!
    const W = () => container.clientWidth
    const H = 520

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W(), H)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, W() / H, 0.1, 500)
    camera.position.set(0, 4, 16)
    camera.lookAt(0, 0, 0)

    scene.add(new THREE.AmbientLight(0xffffff, 0.4))
    const l1 = new THREE.DirectionalLight(0x00d4ff, 1.5); l1.position.set(6, 8, 6); scene.add(l1)
    const l2 = new THREE.DirectionalLight(0x7c3aed, 0.8); l2.position.set(-6, -4, 4); scene.add(l2)
    const l3 = new THREE.PointLight(0xf59e0b, 1, 20); l3.position.set(0, 0, 6); scene.add(l3)

    const grid = new THREE.GridHelper(30, 30, 0x0c1120, 0x0c1120)
    ;(grid.material as THREE.Material).transparent = true;
    ;(grid.material as THREE.Material).opacity = 0.4
    grid.position.y = -3; scene.add(grid)

    const LAYERS = [
      { y: 2.5,  color: 0x00d4ff, count: 1, w: 3,   h: 0.5, d: 1.5 },
      { y: 1.2,  color: 0x7c3aed, count: 1, w: 4,   h: 0.5, d: 1.5 },
      { y: -0.2, color: 0x00d4ff, count: 4, w: 1.6,  h: 0.5, d: 1.2 },
      { y: -1.5, color: 0xf59e0b, count: 1, w: 4,   h: 0.5, d: 1.5 },
      { y: -2.8, color: 0x34d399, count: 3, w: 1.8,  h: 0.5, d: 1.2 },
    ]

    const allMeshes: THREE.Mesh[] = []
    LAYERS.forEach(layer => {
      const spacing = layer.count > 1 ? (layer.count - 1) * (layer.w + 0.3) : 0
      const startX  = -spacing / 2
      for (let i = 0; i < layer.count; i++) {
        const geo = new THREE.BoxGeometry(layer.w, layer.h, layer.d)
        const mat = new THREE.MeshPhongMaterial({ color: layer.color, emissive: layer.color, emissiveIntensity: 0.2, transparent: true, opacity: 0.82 })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(startX + i * (layer.w + 0.3), layer.y, 0)
        mesh.userData = { origY: layer.y, phase: i * 0.8, speed: 0.3 + i * 0.1, explodeZ: 0 }
        scene.add(mesh)
        mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: layer.color, transparent: true, opacity: 0.5 })))
        allMeshes.push(mesh)
      }
    })

    // Connectors
    const cMat = new THREE.LineBasicMaterial({ color: 0x6b7fa3, transparent: true, opacity: 0.3 })
    const yVals = LAYERS.map(l => l.y)
    for (let i = 0; i < yVals.length - 1; i++) {
      const pts = [new THREE.Vector3(0, yVals[i] - 0.25, 0), new THREE.Vector3(0, yVals[i+1] + 0.25, 0)]
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), cMat))
    }

    let camTheta = 0, camPhi = 0.25, isDrag = false, px = 0, py = 0
    const updateCam = () => {
      const r = 16
      camera.position.set(r * Math.sin(camTheta) * Math.cos(camPhi), r * Math.sin(camPhi) + 2, r * Math.cos(camTheta) * Math.cos(camPhi))
      camera.lookAt(0, 0, 0)
    }

    sceneRef.current = { meshes: allMeshes, camera, camTheta, camPhi, isDrag }

    const onMD = (e: MouseEvent) => { isDrag = true; px = e.clientX; py = e.clientY }
    const onMU = () => isDrag = false
    const onMM = (e: MouseEvent) => {
      if (!isDrag) return
      camTheta += (e.clientX - px) * 0.008
      camPhi = Math.max(0.05, Math.min(1.2, camPhi + (e.clientY - py) * 0.005))
      px = e.clientX; py = e.clientY; updateCam()
    }
    canvas.addEventListener('mousedown', onMD)
    window.addEventListener('mouseup', onMU)
    window.addEventListener('mousemove', onMM)

    const onResize = () => {
      renderer.setSize(W(), H)
      camera.aspect = W() / H
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    let t = 0, raf: number
    const animate = () => {
      raf = requestAnimationFrame(animate)
      t += 0.01
      allMeshes.forEach(m => {
        m.position.y = m.userData.origY + Math.sin(t * m.userData.speed + m.userData.phase) * 0.08
        m.rotation.y += 0.003
        const targetZ = viewRef.current === 'explode' ? (m.userData.explodeZ || 0) : 0
        m.position.z += (targetZ - m.position.z) * 0.05
      })
      if (!isDrag) { camTheta += 0.002; updateCam() }
      renderer.render(scene, camera)
    }
    animate()
    updateCam()

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('mousedown', onMD)
      window.removeEventListener('mouseup', onMU)
      window.removeEventListener('mousemove', onMM)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  const handleView = (v: View) => {
    viewRef.current = v
    setActiveView(v)
    const s = sceneRef.current
    if (!s) return
    if (v === 'explode') {
      s.meshes.forEach((m, i) => { m.userData.explodeZ = (i % 3 - 1) * 3 })
    } else {
      s.meshes.forEach(m => { m.userData.explodeZ = 0 })
    }
  }

  const views: View[] = ['overview', 'flow', 'modules', 'explode']

  return (
    <div className="border border-white/[0.08] overflow-hidden bg-surface">
      {/* Canvas wrapper with relative for the label only */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-10 text-[0.62rem] tracking-[0.15em] uppercase text-accent flex items-center gap-2">
          <span className="w-[6px] h-[6px] rounded-full bg-accent animate-blink inline-block" />
          Interactive · Drag to Explore
        </div>
        <canvas ref={canvasRef} style={{ width: '100%', height: 520, display: 'block' }} />
      </div>
      {/* View mode buttons — BELOW the canvas, never overlapping */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06] bg-bg/60">
        <span className="text-[0.58rem] tracking-[0.1em] uppercase text-muted/50 font-mono hidden sm:block">View Mode</span>
        <div className="flex gap-2">
          {views.map(v => (
            <button key={v} onClick={() => handleView(v)}
              className={`text-[0.62rem] tracking-[0.1em] uppercase px-3 py-1.5 border font-mono transition-all ${activeView === v ? 'border-accent text-accent bg-accent/10' : 'border-white/[0.08] text-muted hover:border-accent/50 hover:text-accent/70'} bg-bg/80`}>
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
