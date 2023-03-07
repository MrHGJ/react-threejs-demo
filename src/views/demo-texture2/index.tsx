import React, { useEffect } from 'react'
import * as THREE from 'three'
import { MathUtils, TextureLoader } from 'three'
import TextureBlack from '@/assets/textures/uv-black.png'
import TextureColor from '@/assets/textures/uv-color.png'
import TextureWall from '@/assets/textures/uv-wall.png'
import './index.scss'

const CONTAINER_ID = 'three-container'

const DemoTexture2 = () => {
  // 场景
  const scene = new THREE.Scene()
  // 透视相机 (视野角度，长宽比，近截面，远截面)
  const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100)
  // 渲染器 抗锯齿
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  // 开启物理上正确的光照模式
  renderer.physicallyCorrectLights = true

  // 立方体对象
  const geometry = new THREE.BoxGeometry(2, 2, 2)
  // 创建纹理加载器实例
  const texureLoader = new TextureLoader()
  // 加载纹理, 纹理分配给材质的颜色贴图插槽
  const material1 = new THREE.MeshStandardMaterial({ map: texureLoader.load(TextureBlack) })
  const material2 = new THREE.MeshStandardMaterial({ map: texureLoader.load(TextureColor) })
  const material3 = new THREE.MeshStandardMaterial({ map: texureLoader.load(TextureWall) })
  const cube = new THREE.Mesh(geometry, [
    material2,
    material2,
    material1,
    material1,
    material3,
    material3,
  ])

  // 平行光
  const light = new THREE.DirectionalLight('white', 4)

  // 容器
  let container

  // 用于跟踪时间
  const clock = new THREE.Clock()

  // 动画
  const cubeAnimate = (delta: number) => {
    cube.rotation.y += delta * MathUtils.degToRad(-120)
  }

  const init = () => {
    scene.background = new THREE.Color('skyblue')
    // 设置渲染尺寸
    renderer.setSize(window.innerWidth, window.innerHeight)
    container = document.getElementById(CONTAINER_ID)
    // 将渲染器的dom添加到html中
    container?.appendChild(renderer.domElement)
    light.position.set(10, 10, 10)
    scene.add(new THREE.AmbientLight(0xffffff, 2))
    // 将网格对象放入场景中
    scene.add(cube, light)
    // 将摄像机往外移动，防止摄像机和物体重合
    camera.position.z = 10
    // 立方体向x倾斜30度
    cube.rotation.x = MathUtils.degToRad(30)
    renderer.render(scene, camera)
  }

  // 开启动画
  const startAnimate = () => {
    renderer.setAnimationLoop(() => {
      // 两帧时间间隔 一般60帧下为0.016s左右浮动
      const delta = clock.getDelta()

      cubeAnimate(delta)

      renderer.render(scene, camera)
    })
  }

  useEffect(() => {
    init()
    startAnimate()
  }, [])

  return (
    <div>
      <div id={CONTAINER_ID} />
    </div>
  )
}

export default DemoTexture2
