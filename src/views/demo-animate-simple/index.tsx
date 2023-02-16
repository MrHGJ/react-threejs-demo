import { Button } from 'antd'
import React, { useEffect } from 'react'
import * as THREE from 'three'
import { MathUtils } from 'three'
import './index.scss'

const CONTAINER_ID = 'three-container'

const DemoAnimateSimple = () => {
  // 场景
  const scene = new THREE.Scene()
  // 透视相机 (视野角度，长宽比，近截面，远截面)
  const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000)
  // 渲染器 抗锯齿
  const renderer = new THREE.WebGLRenderer({ antialias: true })

  // 立方体对象
  const geometry1 = new THREE.BoxGeometry(1, 1, 1)
  const material1 = new THREE.MeshStandardMaterial({ color: 'purple' })
  const cube1 = new THREE.Mesh(geometry1, material1)
  // 圆锥体
  const geometry2 = new THREE.ConeGeometry(0.5, 1, 32)
  const material2 = new THREE.MeshStandardMaterial({ color: 'green' })
  const cube2 = new THREE.Mesh(geometry2, material2)

  // 平行光
  const light = new THREE.DirectionalLight('white', 8)

  // 容器
  let container

  // 用于跟踪时间
  const clock = new THREE.Clock()

  // 动画1
  const cube1Animate = (delta: number) => {
    cube1.rotation.x += delta * MathUtils.degToRad(30)
    cube1.rotation.y += delta * MathUtils.degToRad(30)
    cube1.rotation.z += delta * MathUtils.degToRad(30)
  }

  let step = 0.5
  // 动画2
  const cube2Animate = (delta: number) => {
    const cube2X = cube2.position.x
    // 碰到左下角  圆锥体反方向 并旋转180°
    if (cube2X < 0) {
      step = 0.5
      cube2.rotation.z += MathUtils.degToRad(180)
    }
    // 碰到右上角  圆锥体反方向 并旋转180°
    if (cube2X > 1.5) {
      step = -0.5
      cube2.rotation.z += MathUtils.degToRad(180)
    }
    cube2.position.x += step * delta
    cube2.position.y += step * delta
    cube2.position.z += step * delta
  }
  // 动画集合
  const animateArray: ((delta: number) => void)[] = [cube1Animate, cube2Animate]

  const init = () => {
    scene.background = new THREE.Color('skyblue')
    // 设置渲染尺寸
    renderer.setSize(window.innerWidth, window.innerHeight)
    container = document.getElementById(CONTAINER_ID)
    // 将渲染器的dom添加到html中
    container?.appendChild(renderer.domElement)

    light.position.set(10, 10, 10)
    cube1.position.set(-2, 0, 0)
    cube2.position.set(0, 0, 0)
    cube2.rotation.z = MathUtils.degToRad(-45)
    // 将网格对象放入场景中
    scene.add(cube1, cube2, light)

    // 将摄像机往外移动，防止摄像机和物体重合
    camera.position.z = 10

    renderer.render(scene, camera)
  }

  // 开启动画
  const startAnimate = () => {
    renderer.setAnimationLoop(() => {
      // 两帧时间间隔 一般60帧下为0.016s左右浮动
      const delta = clock.getDelta()
      animateArray.length > 0 &&
        animateArray.forEach((cubeAnimate) => {
          cubeAnimate(delta)
        })
      renderer.render(scene, camera)
    })
  }

  // 结束动画
  const stopAnimate = () => {
    renderer.setAnimationLoop(null)
  }

  useEffect(() => {
    init()
    startAnimate()
  }, [])

  return (
    <div className='demo-animate-simple'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button type='primary' style={{ margin: 5 }} onClick={startAnimate}>
          开启动画
        </Button>
        <Button type='primary' style={{ margin: 5 }} onClick={stopAnimate}>
          结束动画
        </Button>
      </div>

      <div id={CONTAINER_ID} />
    </div>
  )
}

export default DemoAnimateSimple
