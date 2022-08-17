import React from 'react'

export default function ButtonAndIcon({icon, text, otherStyles, responsive}) {

  let responsiveStyle=''
  responsive ? responsiveStyle=' hidden md:inline' : responsiveStyle='inline';

  return (
    <button className={'flex flex-row items-center rounded p-2 '+otherStyles}>
      <span className={responsiveStyle}>{text}</span>
      {icon}
    </button>
  )
}
