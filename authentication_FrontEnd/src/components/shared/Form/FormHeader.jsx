import React from 'react'

const FormHeader = ({children}) => {
  return (
    <div className='text-2xl sm:text-3xl font-semibold text-purple-taupe'>
      {children}
    </div>
  )
}

export default FormHeader
