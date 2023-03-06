import { HomeOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'
import './index.scss'

export const Header = () => {
  const history = useHistory()

  return (
    <div className='common-header'>
      <Button
        className='common-header__home'
        icon={<HomeOutlined />}
        onClick={() => {
          history.go(-1)
        }}
      />
    </div>
  )
}
