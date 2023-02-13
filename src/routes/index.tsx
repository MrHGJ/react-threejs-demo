import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import Home from '@/views/home'
import DemoStart from '@/views/demo-start'
import DemoDrawLine from '@/views/demo-draw-line'
import DemoDrawLine2 from '@/views/demo-draw-line2'
import DemoLoadGltf from '@/views/demo-load-gltf'

export const routList = [
  { path: '/demo-start', component: DemoStart, title: '起步Demo' },
  { path: '/demo-draw-line', component: DemoDrawLine, title: '画线' },
  { path: '/demo-draw-line2', component: DemoDrawLine2, title: '线画的立方体' },
  { path: '/demo-load-gltf', component: DemoLoadGltf, title: '加载.gltf格式文件' },
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
