import React from 'react'
import { AiOutlineEye } from "react-icons/ai";

export default function CourseCard({title, description, duration}) {
  console.log(title, description, duration)
  return (
    <section className='flex flex-col w-32 grow max-w-xs h-auto bg-blue-lt p-2 text-white text-center rounded divide-y'>
        <div className='flex h-16 items-center'>
            <h3 className='w-full text-center text-base pb-2'>{title}</h3>
        </div>
        <div className='flex flex-col'>
            <div className='flex flex-row justify-between items-center p-2 md:px-10'>
                <p className='text-sm'>{duration}</p>
                <button>
                    <AiOutlineEye className='h-5 w-5 text-white'/>
                </button>
            </div>
            <div className='hidden w-full h-32 md:flex md:items-center'>
                {description}
            </div>
        </div>
    </section>
  )
}
