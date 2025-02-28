import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import React from 'react'
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className='publiclayout'>
      <Navbar/>
      <main className='publicmain'><Outlet/></main>
      <Footer/>
    </div>
  )
};

export default PublicLayout;