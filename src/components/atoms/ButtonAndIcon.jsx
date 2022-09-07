import React from 'react'

export default function ButtonAndIcon({icon, text, otherStyles, responsive, onClick}) {

  let responsiveStyle=''
  responsive ? responsiveStyle=' hidden md:inline' : responsiveStyle='inline';



  return (
    <button onClick={onClick} className={'flex flex-row items-center rounded p-2 md:space-x-1 '+otherStyles}>
      <span className={responsiveStyle}>{text}</span>
      {icon}
    </button>
  )
}
