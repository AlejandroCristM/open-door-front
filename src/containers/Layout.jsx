import React from 'react';
import NavBar from '../components/molecules/NavBar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='flex flex-col w-full'>
      <NavBar />
      <Outlet />
    </div>
  );
}
