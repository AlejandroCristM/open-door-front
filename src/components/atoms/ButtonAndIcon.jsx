import React from 'react'

<<<<<<< HEAD
export default function ButtonAndIcon({icon, text, otherStyles, responsive, onClick, urlDocument}) {
=======
export default function ButtonAndIcon({icon, text, otherStyles, responsive, onClick}) {
>>>>>>> dev

  let responsiveStyle=''
  responsive ? responsiveStyle=' hidden md:inline' : responsiveStyle='inline';

  return (
    urlDocument ?
      <a href={urlDocument} target='_blank' rel='noopener noreferrer' className={'w-fit flex flex-row items-center rounded p-2 md:space-x-1 '+otherStyles}>
        <span className={responsiveStyle}>{text}</span>
        {icon}
      </a>
      :
      <button className={'w-fit flex flex-row items-center rounded p-2 md:space-x-1 '+otherStyles} onClick={onClick}>
        <span className={responsiveStyle}>{text}</span>
        {icon}
      </button>
  )
}
