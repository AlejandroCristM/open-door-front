import React, {useState} from 'react'
import openDoorLogo from '../../assets/openDoorIcon.svg'
import { BiExit } from "react-icons/bi";
import ButtonAndIcon from '../../components/atoms/ButtonAndIcon'
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { Link } from 'react-router-dom';


export default function NavBar() {

  const [navbarOpen, setNavbarOpen] = useState(false)

  const handleMenuToggle = () => {
    setNavbarOpen(!navbarOpen)
  }

  return (
    <nav className='flex flex-row w-full mt-5 px-5 py-5 justify-between items-center md:px-10 lg:px-20'>
        <div className='absolute top top-16 left-8'>
        {navbarOpen? <DropMenu toggle={handleMenuToggle}/>: null}
        </div>
        <section className='flex flex-row items-center'>
            <div className='mr-5' onClick={handleMenuToggle}>
              {navbarOpen?
                <MdClose className='h-5 w-5 text-orange-lt md:hidden' />:
                <GiHamburgerMenu className='h-5 w-5 text-black md:hidden' />
              }
            </div>
            <Link to={'/'}>
              <img src={openDoorLogo} alt="Open Door Logo" />
            </Link>
            <div className='flex flex-row space-x-10 ml-8 list-none hidden text-blue-lt md:flex'>
              <Link to={'/profile'} className='navItem'>Mi perfil</Link>
              <Link to={'/tracking'} className='navItem'>Seguimiento</Link>
              <Link to={'/courses'} className='navItem'>Cursos</Link>
            </div>
        </section>
        <ButtonAndIcon icon={<BiExit className='h-5 w-5'/>} text='Salir' otherStyles='bg-orange-lt text-white' responsive={true} />
    </nav>
  )
}

const DropMenu =({toggle})=>{
  return(
    <div className='flex flex-col bg-blue-lt text-white p-2 space-y-2'>
      <Link to={'/profile'} className='navItem'  onClick={toggle}>Mi perfil</Link>
      <Link to={'/tracking'} className='navItem' onClick={toggle}>Seguimiento</Link>
      <Link to={'/courses'} className='navItem' onClick={toggle}>Cursos</Link>
    </div>
  )
}
