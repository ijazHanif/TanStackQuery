import React from 'react'

const Wraper = ({children, className}) => {
  return (
    <div className={`max-w-screen-2xl mx-auto px-4 ${className}`}>
      {children}
    </div>
  )
}

export default Wraper
