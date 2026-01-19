import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <div className='h-14 bg-blue-950 text-white flex items-center justify-center'>
      <p>Copyright &copy; {currentYear} Get me a chai - All rights reserved</p>
    </div>
  )
}

export default Footer
