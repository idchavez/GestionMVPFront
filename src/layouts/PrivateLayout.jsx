import PrivateRoute from 'components/PrivateRoute';
import Sidebar from 'components/Sidebar';
import SidebarResponsive from 'components/SidebarResponsive';
import { Outlet } from 'react-router-dom';

const PrivateLayout = ({children}) => {

  return (
    <PrivateRoute>
      <div className='admin-layout'>
          <Sidebar/>
          <SidebarResponsive/>
        <main className='private-main'>
        {children}
        <Outlet/>
        </main>
      </div>
    </PrivateRoute>
  )
};

export default PrivateLayout;