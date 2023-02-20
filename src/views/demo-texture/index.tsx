import { Button } from 'antd'
import React, { useEffect } from 'react'
import * as THREE from 'three'
import { MathUtils, TextureLoader } from 'three'
import TextureBlack from '@/assets/textures/uv-black.png'
import TextureColor from '@/assets/textures/uv-color.png'
import TextureWall from '@/assets/textures/uv-wall.png'
import './index.scss'

const CONTAINER_ID = 'three-container'

const DemoTexture = () => {
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
  const material = new THREE.MeshStandardMaterial({ color: 'purple' })
  const cube = new THREE.Mesh(geometry, material)

  // 平行光
  const light = new THREE.DirectionalLight('white', 4)

  // 容器
  let container

  // 用于跟踪时间
  const clock = new THREE.Clock()

  // 动画
  const cubeAnimate = (delta: number) => {
    cube.rotation.x += delta * MathUtils.degToRad(30)
    cube.rotation.y += delta * MathUtils.degToRad(30)
    cube.rotation.z += delta * MathUtils.degToRad(30)
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

  // 无纹理， 添加颜色
  const setNoTexture = () => {
    const newMaterial = new THREE.MeshStandardMaterial({ color: 'purple' })
    cube.material = newMaterial
  }

  // 设置纹理1
  const setTexture1 = () => {
    // 创建纹理加载器实例
    const texureLoader = new TextureLoader()
    // 加载纹理
    const texture = texureLoader.load(TextureBlack)
    // 纹理分配给材质的颜色贴图插槽
    const newMaterial = new THREE.MeshStandardMaterial({ map: texture })
    cube.material = newMaterial
  }

  // 设置纹理2
  const setTexture2 = () => {
    const texureLoader = new TextureLoader()
    const texture = texureLoader.load(TextureColor)
    const newMaterial = new THREE.MeshStandardMaterial({ map: texture })
    cube.material = newMaterial
  }

  // 设置纹理3
  const setTexture3 = () => {
    const texureLoader = new TextureLoader()
    const texture = texureLoader.load(TextureWall)
    const newMaterial = new THREE.MeshStandardMaterial({ map: texture })
    cube.material = newMaterial
  }

  return (
    <div className='demo-animate-simple'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button type='primary' style={{ margin: 5 }} onClick={setNoTexture}>
          无纹理
        </Button>
        <Button type='primary' style={{ margin: 5 }} onClick={setTexture1}>
          纹理1
        </Button>
        <Button type='primary' style={{ margin: 5 }} onClick={setTexture2}>
          纹理2
        </Button>
        <Button type='primary' style={{ margin: 5 }} onClick={setTexture3}>
          纹理3
        </Button>
      </div>

      <div id={CONTAINER_ID} />
    </div>
  )
}

export default DemoTexture
