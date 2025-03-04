import Sidebar from 'components/Sidebar';
import React from 'react'
import { Outlet } from 'react-router-dom';

const PrivateLayout = ({children}) => {
  return (
    <div className='sidebar-admin'>
      <Sidebar/>
      <main className='private-main'>
      {children}
      <Outlet/>
      </main>
    </div>
  )
};

export default PrivateLayout;