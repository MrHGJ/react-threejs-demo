import React, { useEffect } from 'react'
import * as THREE from 'three'
import './index.scss'

const CONTAINER_ID = 'three-container'

const DemoStart = () => {
  // 场景
  const scene = new THREE.Scene()
  // 透视相机 (视野角度，长宽比，近截面，远截面)
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  // 渲染器
  const renderer = new THREE.WebGLRenderer()

  // 立方体对象
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  // 材质
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  // 网格
  const cube = new THREE.Mesh(geometry, material)

  // 容器
  let container

  const init = () => {
    // 设置渲染尺寸
    renderer.setSize(window.innerWidth, window.innerHeight)
    container = document.getElementById(CONTAINER_ID)
    // 将渲染器的dom添加到html中
    container?.appendChild(renderer.domElement)

    // 将网格对象放入场景中
    scene.add(cube)
    // 将摄像机往外移动，防止摄像机和物体重合
    camera.position.z = 5
  }

  const animate = () => {
    // 循环渲染场景
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
  }

  useEffect(() => {
    init()
    animate()
  }, [])

  return (
    <div className='demo-start'>
      <div id={CONTAINER_ID} />
    </div>
  )
}

export default DemoStart
