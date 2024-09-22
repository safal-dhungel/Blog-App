import React, { useId } from 'react'

const Button = (
  { children,
    type = "button",
    bgColor = "",
    textColor = "text-white",
    classname = '',
    ...props }) => {

      const id = useId();
  return (
    <button id={id} className={`px-4 py-2 duration-200 w-full rounded-lg ${bgColor} ${textColor} ${classname}`} {...props}>{children}</button>
  )
}

export default Button