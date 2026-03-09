'use client'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

const NODE_DATA = [
  { color: 0x00d4ff, pos: [-5, 2, -2],  shape: 'sphere',   size: 0.7 },
  { color: 0x7c3aed, pos: [0, 3, 0],    shape: 'box',      size: 0.9 },
  { color: 0x00d4ff, pos: [5, 1, -1],   shape: 'sphere',   size: 0.6 },
  { color: 0xf59e0b, pos: [-3, -2, 1],  shape: 'octahed',  size: 0.7 },
  { color: 0x7c3aed, pos: [3, -2, 0],   shape: 'box',      size: 0.75 },
  { color: 0x34d399, pos: [-6, -1, 2],  shape: 'tetra',    size: 0.6 },
  { color: 0x34d399, pos: [6, -1, 1],   shape: 'tetra',    size: 0.6 },
  { color: 0xf59e0b, pos: [1, 0, 3],    shape: 'octahed',  size: 0.55 },
  { color: 0x00d4ff, pos: [-2, 1, 4],   shape: 'sphere',   size: 0.5 },
  { color: 0xf59e0b, pos: [4, 3, 2],    shape: 'octahed',  size: 0.5 },
  { color: 0x7c3aed, pos: [-4, 3, 1],   shape: 'box',      size: 0.45 },
  { color: 0x34d399, pos: [2, -4, 0],   shape: 'sphere',   size: 0.5 },
] as const

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 18)

    scene.add(new THREE.AmbientLight(0xffffff, 0.3))
    const d1 = new THREE.DirectionalLight(0x00d4ff, 1.2); d1.position.set(5, 8, 5); scene.add(d1)
    const d2 = new THREE.DirectionalLight(0x7c3aed, 0.8); d2.position.set(-5, -3, 3); scene.add(d2)

    const nodes: THREE.Mesh[] = []
    NODE_DATA.forEach(d => {
      let geo: THREE.BufferGeometry
      if (d.shape === 'sphere')  geo = new THREE.SphereGeometry(d.size, 16, 16)
      else if (d.shape === 'box') geo = new THREE.BoxGeometry(d.size * 1.4, d.size * 1.4, d.size * 1.4)
      else if (d.shape === 'octahed') geo = new THREE.OctahedronGeometry(d.size)
      else geo = new THREE.TetrahedronGeometry(d.size)

      const mat = new THREE.MeshPhongMaterial({ color: d.color, emissive: d.color, emissiveIntensity: 0.25, transparent: true, opacity: 0.85 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(d.pos[0], d.pos[1], d.pos[2])
      mesh.userData = { origPos: [...d.pos], speed: Math.random() * 0.4 + 0.2, phase: Math.random() * Math.PI * 2 }
      scene.add(mesh)

      const wireMat = new THREE.MeshBasicMaterial({ color: d.color, wireframe: true, transparent: true, opacity: 0.1 })
      mesh.add(new THREE.Mesh(geo.clone(), wireMat))
      nodes.push(mesh)
    })

    // Connection lines
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.1 })
    NODE_DATA.forEach((a, i) => {
      NODE_DATA.forEach((b, j) => {
        if (j <= i) return
        const dist = Math.hypot(a.pos[0]-b.pos[0], a.pos[1]-b.pos[1], a.pos[2]-b.pos[2])
        if (dist < 7) {
          const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...a.pos), new THREE.Vector3(...b.pos)])
          scene.add(new THREE.Line(geo, lineMat))
        }
      })
    })

    // Particles
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(300 * 3)
    for (let i = 0; i < 900; i++) pPos[i] = (Math.random() - 0.5) * 50
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x00d4ff, size: 0.06, transparent: true, opacity: 0.45 })))

    let isDragging = false, prevX = 0, prevY = 0, rotX = 0, rotY = 0
    const onMouseDown = (e: MouseEvent) => { isDragging = true; prevX = e.clientX; prevY = e.clientY }
    const onMouseUp   = () => isDragging = false
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      rotY += (e.clientX - prevX) * 0.005; rotX += (e.clientY - prevY) * 0.005
      prevX = e.clientX; prevY = e.clientY
    }
    canvas.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    let t = 0, raf: number
    const animate = () => {
      raf = requestAnimationFrame(animate)
      t += 0.008
      nodes.forEach(n => {
        const { origPos, speed, phase } = n.userData
        n.position.y = origPos[1] + Math.sin(t * speed + phase) * 0.3
        n.position.x = origPos[0] + Math.cos(t * speed * 0.7 + phase) * 0.15
        n.rotation.x += 0.003; n.rotation.y += 0.005
      })
      rotX *= 0.92; rotY *= 0.92
      scene.rotation.x += rotX; scene.rotation.y += rotY
      if (!isDragging) scene.rotation.y += 0.001
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-[1]" />
}
