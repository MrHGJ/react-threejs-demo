import React, { useEffect } from 'react'
import * as THREE from 'three'
import './index.scss'

const CONTAINER_ID = 'three-container'

const DemoDrawLine = () => {
  // 场景
  const scene = new THREE.Scene()
  // 透视相机 (视野角度，长宽比，近截面，远截面)
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
  // 渲染器
  const renderer = new THREE.WebGLRenderer()

  // 材质
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff })
  const points = [
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(0, 10, 0),
    new THREE.Vector3(10, 0, 0),
  ]
  // 对象
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const line = new THREE.Line(geometry, material)

  // 容器
  let container

  const init = () => {
    // 设置渲染尺寸
    renderer.setSize(window.innerWidth, window.innerHeight)
    container = document.getElementById(CONTAINER_ID)
    // 将渲染器的dom添加到html中
    container?.appendChild(renderer.domElement)
    camera.position.set(0, 0, 100)
    camera.lookAt(0, 0, 0)

    // 将对象放入场景中
    scene.add(line)
    renderer.render(scene, camera)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <div id={CONTAINER_ID} />
    </div>
  )
}

export default DemoDrawLine
