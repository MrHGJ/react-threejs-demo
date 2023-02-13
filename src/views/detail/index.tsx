import React from 'react'
import { useHistory } from 'react-router-dom'
import './index.scss'

function Detail() {
  const history = useHistory()
  return (
    <div className='detail'>
      <div
        className='button'
        onClick={() => {
          history.goBack()
        }}
      >
        回到首页
      </div>
      这是详情页
    </div>
  )
}

export default Detail
