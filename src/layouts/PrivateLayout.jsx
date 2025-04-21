import Sidebar from 'components/Sidebar';
import SidebarResponsive from 'components/SidebarResponsive';
import React from 'react'
import { Outlet } from 'react-router-dom';

const PrivateLayout = ({children}) => {
  return (
    <div className='admin-layout'>
        <Sidebar/>
        <SidebarResponsive/>
      <main className='private-main'>
      {children}
      <Outlet/>
      </main>
    </div>
  )
};

export default PrivateLayout;