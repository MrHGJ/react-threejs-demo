import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { Spin } from 'antd'
import './index.scss'

const CONTAINER_ID = 'three-container'

const DemoLoadGltf = () => {
  const [loading, setLoading] = useState(false)
  // 动画混合器，用于场景中特定对象的动画的播放器
  let mixer
  // 用于跟踪时间
  const clock = new THREE.Clock()
  const stats = new Stats()

  let container

  const renderer = new THREE.WebGLRenderer({ antialias: true })

  const pmremGenerator = new THREE.PMREMGenerator(renderer)
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0.5, 0)
  controls.update()
  controls.enablePan = false
  controls.enableDamping = true

  /**
   * React项目中DRACOLoader的setDecoderPath报错解决
   * https://stackoverflow.com/questions/56071764/how-to-use-dracoloader-with-gltfloader-in-reactjs
   */
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderConfig({ type: 'js' })
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')

  const loader = new GLTFLoader()

  function animate() {
    requestAnimationFrame(animate)

    const delta = clock.getDelta()

    mixer.update(delta)

    controls.update()

    stats.update()

    renderer.render(scene, camera)
  }

  const init = () => {
    container = document.getElementById(CONTAINER_ID)
    container?.appendChild(stats.dom)

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputEncoding = THREE.sRGBEncoding
    container?.appendChild(renderer.domElement)

    scene.background = new THREE.Color(0xbfe3dd)
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture

    camera.position.set(5, 2, 8)

    loader.setDRACOLoader(dracoLoader)
    setLoading(true)
    loader.load(
      '/static/LittlestTokyo.glb',
      function (gltf) {
        setLoading(false)
        const model = gltf.scene
        model.position.set(1, 1, 0)
        model.scale.set(0.01, 0.01, 0.01)
        scene.add(model)

        mixer = new THREE.AnimationMixer(model)
        mixer.clipAction(gltf.animations[0]).play()

        animate()
      },
      undefined,
      function (e) {
        console.error(e)
      },
    )
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className='demo-load-gltf'>
      {loading && (
        <div className='loading-container'>
          <Spin size='large' tip='Loading...' />
        </div>
      )}
      <div id={CONTAINER_ID} />
    </div>
  )
}

export default DemoLoadGltf
