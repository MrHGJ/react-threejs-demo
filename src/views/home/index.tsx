import { routList } from '@/routes'
import React from 'react'
import { useHistory } from 'react-router-dom'
import './index.scss'

function Home() {
  const history = useHistory()
  return (
    <div className='home'>
      {routList.map((item) => {
        const { path, title } = item
        return (
          <div className='item' key={path} onClick={() => history.push(path)}>
            {title}
          </div>
        )
      })}
    </div>
  )
}

export default Home
