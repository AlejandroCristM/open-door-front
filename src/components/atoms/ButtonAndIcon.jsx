import React from 'react'

export default function ButtonAndIcon({icon, text, otherStyles}) {
  return (
    <button className={'flex flex-row items-center rounded p-2 '+otherStyles}>
      <span>{text}</span>
      {icon}
    </button>
  )
}
