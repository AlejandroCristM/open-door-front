import React from 'react'
import { AiOutlineEye } from "react-icons/ai";
import ButtonAndIcon from './ButtonAndIcon';
import { useNavigate } from 'react-router-dom';

export default function CourseCard({id, title, description}) {
  const navigate = useNavigate();
  const urlFriendly = title.replaceAll(' ', '-').toLowerCase();

  const handleCourseCLick=()=>{
    navigate(`/course/${id}-${urlFriendly}`)
  }

  return (
    <section className='flex flex-col w-32 h-auto bg-blue-lt p-2 text-white text-center rounded-lg divide-y md:w-72' onClick={handleCourseCLick}>
        <div className='flex h-16 items-center'>
            <h3 className='w-full text-center text-base pb-2'>{title}</h3>
        </div>
        <div className='flex flex-col'>
            <div className='hidden px-5 w-full h-32 md:flex md:items-center'>
                {description}
            </div>
            <div className='flex flex-row justify-center items-center p-2 md:px-5'>
                {/* <p className='text-sm'>{}</p> */}
                <ButtonAndIcon text='ver más' icon={<AiOutlineEye className='h-5 w-5 text-white'/>} otherStyles='bg-orange-lt' responsive={true} />
            </div>
        </div>
    </section>
  )
}
