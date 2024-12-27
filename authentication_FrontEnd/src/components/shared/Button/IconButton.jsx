import React from 'react'

const IconButton = ({children, onClick}) => {
  return (
    <div onClick={onClick} className='px-4 border flex justify-center border-blue-600 w-full rounded cursor-pointer'>
       {children}
    </div>
  )
}

export default IconButton
