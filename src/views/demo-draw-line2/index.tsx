import React, { useEffect } from 'react'
import * as THREE from 'three'
import './index.scss'

const CONTAINER_ID = 'three-container'

const DemoDrawLine2 = () => {
  // 场景
  const scene = new THREE.Scene()
  // 透视相机 (视野角度，长宽比，近截面，远截面)
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
  // 渲染器
  const renderer = new THREE.WebGLRenderer()

  // 材质
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff })
  const pointsArray = []
  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * 2 - 1 // 范围在-1到1
    const y = Math.random() * 2 - 1
    const z = Math.random() * 2 - 1
    pointsArray.push(new THREE.Vector3(x, y, z))
  }

  // 对象
  const geometry = new THREE.BufferGeometry().setFromPoints(pointsArray)
  const line = new THREE.Line(geometry, material)

  // 容器
  let container

  const init = () => {
    // 设置渲染尺寸
    renderer.setSize(window.innerWidth, window.innerHeight)
    container = document.getElementById(CONTAINER_ID)
    // 将渲染器的dom添加到html中
    container?.appendChild(renderer.domElement)
    camera.position.set(0, 0, 5)
    camera.lookAt(0, 0, 0)

    // 将对象放入场景中
    scene.add(line)
    renderer.render(scene, camera)
  }

  const animate = () => {
    // 循环渲染场景
    requestAnimationFrame(animate)
    line.rotation.x += 0.01
    line.rotation.y += 0.01
    renderer.render(scene, camera)
  }

  useEffect(() => {
    init()
    animate()
  }, [])

  return (
    <div>
      <div id={CONTAINER_ID} />
    </div>
  )
}

export default DemoDrawLine2
