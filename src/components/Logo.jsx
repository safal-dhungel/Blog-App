import React from 'react'

const Logo = ({width = '100%'}) => {
  return (
    <img src='/vite.svg' alt='logo' style={{width:`${width}`}}/>
  )
}

export default Logo