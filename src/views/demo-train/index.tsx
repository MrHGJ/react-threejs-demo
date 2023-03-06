import React, { useEffect } from 'react'
import * as THREE from 'three'
import { MathUtils, Mesh } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './index.scss'

const CONTAINER_ID = 'three-container'

const DemoTrain = () => {
  // 场景
  const scene = new THREE.Scene()
  // 透视相机 (视野角度，长宽比，近截面，远截面)
  const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100)
  // 渲染器 抗锯齿
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  // 开启物理上正确的光照模式
  renderer.physicallyCorrectLights = true

  // 轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  // 旋转的中心点
  controls.target.set(0, 1, 0)
  controls.update()
  // 右键拖拽 固定目标
  controls.enablePan = true
  // 启用阻尼，增强现实感
  controls.enableDamping = true

  // 灰色材质 开启平坦阴影渲染
  const materialDetail = new THREE.MeshStandardMaterial({
    color: 'darkslategray',
    flatShading: true,
  })
  // 红色材质
  const materialBody = new THREE.MeshStandardMaterial({ color: 'firebrick', flatShading: true })

  // 方形货仓
  const geometryCabin = new THREE.BoxGeometry(2, 2.25, 1.5)
  // 圆柱体大鼻子
  const geometryNose = new THREE.CylinderGeometry(0.75, 0.75, 3, 12)
  // 圆柱体车轮
  const geometryWheel = new THREE.CylinderGeometry(0.4, 0.4, 1.75, 16)
  // 圆椎体烟囱
  const geometryChimney = new THREE.CylinderGeometry(0.3, 0.1, 0.5)

  // 货仓
  const cubeCabin = new Mesh(geometryCabin, materialBody)
  // 大鼻子
  const cubeNose = new Mesh(geometryNose, materialBody)
  // 车轮
  const cubeSmallWheelRear = new Mesh(geometryWheel, materialDetail)
  cubeSmallWheelRear.position.y = 0.5
  cubeSmallWheelRear.rotation.x = MathUtils.degToRad(90)
  const cubeSmallWheelCenter = cubeSmallWheelRear.clone()
  const cubeSmallWheelFront = cubeSmallWheelRear.clone()
  const cubeBigWheel = cubeSmallWheelRear.clone()
  // 烟囱
  const cubeChimney = new Mesh(geometryChimney, materialDetail)

  // 平行光
  const light = new THREE.DirectionalLight('white', 2)
  // 半球光
  const mainLight = new THREE.HemisphereLight('white', 'darkslategray', 3)

  // 容器
  let container

  // 用于跟踪时间
  const clock = new THREE.Clock()

  // 初始化每个对象的位置
  const initPosition = () => {
    light.position.set(10, 10, 10)
    cubeCabin.position.set(1.5, 1.4, 0)
    cubeNose.position.set(-1, 1, 0)
    cubeNose.rotation.z = MathUtils.degToRad(90)
    cubeSmallWheelCenter.position.x = -1
    cubeSmallWheelFront.position.x = -2
    cubeBigWheel.position.set(1.5, 0.9, 0)
    cubeBigWheel.scale.set(2, 1.25, 2)
    cubeChimney.position.set(-2, 1.9, 0)
  }

  // 车轮动画
  const cubeAnimate = (delta: number) => {
    const wheelSpeed = MathUtils.degToRad(24)
    cubeBigWheel.rotation.y += delta * wheelSpeed
    cubeSmallWheelRear.rotation.y += delta * wheelSpeed
    cubeSmallWheelCenter.rotation.y += delta * wheelSpeed
    cubeSmallWheelFront.rotation.y += delta * wheelSpeed
  }

  const init = () => {
    scene.background = new THREE.Color('skyblue')
    // 设置渲染尺寸
    renderer.setSize(window.innerWidth, window.innerHeight)
    container = document.getElementById(CONTAINER_ID)
    // 将渲染器的dom添加到html中
    container?.appendChild(renderer.domElement)
    initPosition()
    // 将网格对象放入场景中
    scene.add(
      cubeCabin,
      cubeNose,
      cubeSmallWheelRear,
      cubeSmallWheelCenter,
      cubeSmallWheelFront,
      cubeBigWheel,
      cubeChimney,
      light,
      mainLight,
    )
    // 将摄像机往外移动，防止摄像机和物体重合
    camera.position.set(-5, 5, 7)
    renderer.render(scene, camera)
  }

  // 开启动画
  const startAnimate = () => {
    renderer.setAnimationLoop(() => {
      // 两帧时间间隔 一般60帧下为0.016s左右浮动
      const delta = clock.getDelta()
      cubeAnimate(delta)
      controls.update()
      renderer.render(scene, camera)
    })
  }

  useEffect(() => {
    init()
    startAnimate()
  }, [])

  return (
    <div className='demo-train'>
      <div id={CONTAINER_ID} />
    </div>
  )
}

export default DemoTrain
