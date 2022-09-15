import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
import axios from "axios";
import Loading from '../components/atoms/Loading';
import { BsLinkedin } from "react-icons/bs";

export default function UserProfile() {

  const { user } = useAuth0();
  const [userId, setUserId] = useState('')
  const [userDB, setUserDB] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUserId = async () => {
      setIsLoading(true)
      const res = await axios.get('https://udea-open-door-back-git-develop-cristiancastano852.vercel.app/getRole', {
        headers: { email: 'sndj.kddbd@yopmail.net' }
      });
      switch (res.data.rol) {
        case 'admin':
          setUserId(res.data.admin.id)
          break;

        case 'user':
          setUserId(res.data.user.id)
          break;

        default:
          break;
      }
    }
    fetchUserId()
    setIsLoading(false)
  }, [user]);


  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true)
      const res = await axios.get('https://udea-open-door-back-git-develop-cristiancastano852.vercel.app/userProfile/' + userId);
      setUserDB(res.data.user)
    }

    fetchUserData();
    setIsLoading(false)
  }, [userId])


  return (
    <section className="flex flex-col justify-center items-center px-4 text-blue-lt md:flex-row md:mt-10">
      <section className='w-full flex flex-col space-y-5 md:w-1/2'>
        <h1 className='text-xl text-center mt-4 font-bold'>{user.name}</h1>
        <picture className='flex flex-col items-center rounded-full px-5'>
          <img
            src={user.picture}
            className='w-1/3 rounded-full md:w-1/4 lg:w-1/5'
            alt='Foto personal'
          />
        </picture>
        <div className="flex flex-col space-y-1 items-center md:space-y-3">
          <a href={user.linkedin}>
            <BsLinkedin className="h-5 w-5" />
          </a>
          <h3>{user.email}</h3>
          <h3>{userDB.age + " años"}</h3>
        </div>
      </section>
      <section className="w-full flex mt-8 flex-col items-center text-center text-lg md:w-1/2">
        {isLoading ? <Loading /> :
          <div className="flex flex-col items-center">
            <h4 className='text-orange-lt font-semibold'>Acerca:</h4>
            <p className='text-sm'>{userDB.about}</p>
            <h4 className='mt-3 text-orange-lt font-semibold'>Objetivos:</h4>
            <p className='text-sm'>{userDB.expectations}</p>
          </div>
        }
      </section>
    </section>
  )
}
