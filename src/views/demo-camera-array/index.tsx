import React, { useEffect } from 'react'
import * as THREE from 'three'
import './index.scss'

const CONTAINER_ID = 'three-container'

const DemoCameraArray = () => {
  // 容器
  let container

  let camera, scene, renderer
  let mesh

  const AMOUNT = 6

  const init = () => {
    const ASPECT_RATIO = window.innerWidth / window.innerHeight
    const WIDTH = (window.innerWidth / AMOUNT) * window.devicePixelRatio
    const HEIGHT = (window.innerHeight / AMOUNT) * window.devicePixelRatio
    const cameras = []
    for (let y = 0; y < AMOUNT; y++) {
      for (let x = 0; x < AMOUNT; x++) {
        // 透视相机
        const subcamera = new THREE.PerspectiveCamera(40, ASPECT_RATIO, 0.1, 10)
        subcamera.viewport = new THREE.Vector4(
          Math.floor(x * WIDTH),
          Math.floor(y * HEIGHT),
          Math.ceil(WIDTH),
          Math.ceil(HEIGHT),
        )
        subcamera.position.x = x / AMOUNT - 0.5
        subcamera.position.y = 0.5 - y / AMOUNT
        subcamera.position.z = 1.5
        subcamera.position.multiplyScalar(2)
        subcamera.lookAt(0, 0, 0)
        subcamera.updateMatrixWorld()
        cameras.push(subcamera)
      }
    }
    camera = new THREE.ArrayCamera(cameras)
    camera.position.z = 3

    scene = new THREE.Scene()
    // 环境光
    scene.add(new THREE.AmbientLight(0x222244))

    // 平行光
    const light = new THREE.DirectionalLight()
    light.position.set(0.5, 0.5, 1)
    light.castShadow = true
    light.shadow.camera.zoom = 4
    scene.add(light)

    const geomertryBackground = new THREE.PlaneGeometry(100, 100)
    const materalBackground = new THREE.MeshPhongMaterial({ color: 0x000066 })

    const background = new THREE.Mesh(geomertryBackground, materalBackground)
    background.receiveShadow = true
    background.position.set(0, 0, -1)
    scene.add(background)

    const geometryCylinder = new THREE.CylinderGeometry(0.5, 0.5, 1, 32)
    const materialCylinder = new THREE.MeshPhongMaterial({ color: 0xff0000 })

    mesh = new THREE.Mesh(geometryCylinder, materialCylinder)
    mesh.castShadow = true
    mesh.receiveShadow = true
    scene.add(mesh)

    renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    container = document.getElementById(CONTAINER_ID)
    container.appendChild(renderer.domElement)
  }

  const onWindowResize = (e) => {
    const ASPECT_RATIO = window.innerWidth / window.innerHeight
    const WIDTH = (window.innerWidth / AMOUNT) * window.devicePixelRatio
    const HEIGHT = (window.innerHeight / AMOUNT) * window.devicePixelRatio

    camera.aspect = ASPECT_RATIO
    camera.updateProjectionMatrix()

    for (let y = 0; y < AMOUNT; y++) {
      for (let x = 0; x < AMOUNT; x++) {
        const subcamera = camera.cameras[AMOUNT * y + x]

        subcamera.viewport.set(
          Math.floor(x * WIDTH),
          Math.floor(y * HEIGHT),
          Math.ceil(WIDTH),
          Math.ceil(HEIGHT),
        )

        subcamera.aspect = ASPECT_RATIO
        subcamera.updateProjectionMatrix()
      }
    }

    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  const animate = () => {
    mesh.rotation.x += 0.005
    mesh.rotation.z += 0.01

    renderer.render(scene, camera)

    requestAnimationFrame(animate)
  }

  useEffect(() => {
    init()
    animate()
    window.addEventListener('resize', onWindowResize)
    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  }, [])

  return (
    <div className='demo-start'>
      <div id={CONTAINER_ID} />
    </div>
  )
}

export default DemoCameraArray
