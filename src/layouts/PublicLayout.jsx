import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import React from 'react'
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className='public-layout'>
      <Navbar/>
      <main className='public-main'><Outlet/></main>
      <Footer/>
    </div>
  )
};

export default PublicLayout;