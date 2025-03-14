import React from 'react'
import { useDarkMode } from 'context/darkMode';

const Admin = () => {

  const {darkMode} = useDarkMode();

  return (
    <div className={`${darkMode ? 'dark-mode' : '' }`}>Index del panel de Admin
      
    </div>
  )
};

export default Admin;