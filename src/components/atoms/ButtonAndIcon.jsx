import React from 'react'

export default function ButtonAndIcon({icon, text, otherStyles, responsive, onClick, urlDocument}) {

  let responsiveStyle=''
  responsive ? responsiveStyle=' hidden md:inline' : responsiveStyle='inline';

  return (
    urlDocument ?
      <a href={urlDocument} target='_blank' rel='noopener noreferrer' className={'w-fit flex flex-row items-center justify-center rounded p-2 md:space-x-1 '+otherStyles}>
        <span className={responsiveStyle}>{text}</span>
        {icon}
      </a>
      :
      <button className={'w-fit flex flex-row items-center justify-center rounded p-2 md:space-x-1 '+otherStyles} onClick={onClick}>
        <span className={responsiveStyle}>{text}</span>
        {icon}
      </button>
  )
}
