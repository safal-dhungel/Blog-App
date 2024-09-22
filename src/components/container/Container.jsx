import React from 'react'

const Container = ({children,className,backgroundImage}) => {
  return (
    <div className={`h-full w-full ${className} bg-secondary bg-cover bg-center bg-no-repeat`} style={{backgroundImage:`${backgroundImage ? `url(${backgroundImage})` : ""}`}}>{children}</div>
  )
}

export default Container