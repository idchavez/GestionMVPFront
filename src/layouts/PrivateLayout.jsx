import Sidebar from 'components/Sidebar';
import React from 'react'
import { Outlet } from 'react-router-dom';

const PrivateLayout = ({children}) => {
  return (
    <div>
      <Sidebar/>
      {children}
      <Outlet/>
    </div>
  )
};

export default PrivateLayout;