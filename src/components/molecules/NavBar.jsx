import React from 'react'
import openDoorLogo from '../../assets/openDoorIcon.svg'
import { BiExit } from "react-icons/bi";
import ButtonAndIcon from '../../components/atoms/ButtonAndIcon'
import { GiHamburgerMenu } from "react-icons/gi";


export default function NavBar() {
  return (
    <nav className='flex flex-row w-full mt-5 px-5 py-5 justify-between items-center md:px-10 lg:px-20'>
        <section className='flex flex-row items-center'>
            <div className='mr-5'>
                <GiHamburgerMenu className='h-5 w-5 text-black md:hidden' />
            </div>
            <img src={openDoorLogo} alt="Open Door Logo" />
            <ul className='flex flex-row space-x-10 ml-8 list-none hidden md:flex'>
                <li>Mi perfil</li>
                <li>Seguimiento</li>
                <li>Cursos</li>
            </ul>
        </section>
        <ButtonAndIcon icon={<BiExit className='h-5 w-5'/>} text='Salir' otherStyles='bg-orange-lt text-white'></ButtonAndIcon>
    </nav>
  )
}
