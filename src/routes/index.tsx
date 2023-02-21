import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import Home from '@/views/home'
import DemoStart from '@/views/demo-start'
import DemoDrawLine from '@/views/demo-draw-line'
import DemoDrawLine2 from '@/views/demo-draw-line2'
import DemoLoadGltf from '@/views/demo-load-gltf'
import DemoCameraArray from '@/views/demo-camera-array'
import DemoAnimateSimple from '@/views/demo-animate-simple'
import DemoTexture from '@/views/demo-texture'
import DemoTrain from '@/views/demo-train'

export const routList = [
  { path: '/demo-start', component: DemoStart, title: '1. 旋转立方体' },
  { path: '/demo-draw-line', component: DemoDrawLine, title: '2. 画线' },
  { path: '/demo-draw-line2', component: DemoDrawLine2, title: '3. 旋转线型立方体' },
  { path: '/demo-load-gltf', component: DemoLoadGltf, title: '4. 加载gltf格式3D模型' },
  { path: '/demo-camera-array', component: DemoCameraArray, title: '5. camera array' },
  { path: '/demo-animate-simple', component: DemoAnimateSimple, title: '6. 动画基础' },
  { path: '/demo-texture', component: DemoTexture, title: '7. 纹理映射' },
  { path: '/demo-train', component: DemoTrain, title: '8. 火车模型 Demo' },
]

export const CoreRouter = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        {routList.map((item) => (
          <Route exact path={item.path} component={item.component} key={item.path} />
        ))}
      </Switch>
    </HashRouter>
  )
}
