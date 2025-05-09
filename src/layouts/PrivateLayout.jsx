import PrivateRoute from 'components/PrivateRoute';
import Sidebar from 'components/Sidebar';
import SidebarResponsive from 'components/SidebarResponsive';
import { Outlet } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import ReactLoading from 'react-loading';
import { obtenerDatosUsuario } from 'utils/api';
import { useUser } from 'context/userContext';
import { useEffect, useState } from 'react';

const PrivateLayout = ({children}) => {
  const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently, logout } = useAuth0();
  const [loadingUserInformation, setLoadingUserInformation] = useState(false);
  const {setUserData} = useUser();
  
      useEffect(() => {
          const fetchAuth0Token = async () => {
  
              //1. pedimos token a auth0
              setLoadingUserInformation(true);
              const accessToken = await getAccessTokenSilently({
                  audience: 'https://api-autenticacion-gestion-mvp',
                  scope: 'openid profile email'
              });
              //2. recibimos el token de auth0
              localStorage.setItem('token', accessToken);
              //console.log('Token: ',accessToken);
              //3. enviar token a back
              await obtenerDatosUsuario(
                  (response) => {
                      console.log('response con datos usuario', response);
                      setUserData(response.data);
                      setLoadingUserInformation(false);
                  },
                  (error) => {
                      console.error('Error: ', error);
                      setLoadingUserInformation(false);
                      logout({ logoutParams: { returnTo: window.location.origin } });
                  }
              );
          };
          if (isAuthenticated) {
              fetchAuth0Token();
          }
      }, [isAuthenticated, getAccessTokenSilently]);

      if(isLoading || loadingUserInformation) 
              return 
              <ReactLoading type='cylon' color='#0006F0' height={667} width={375} />;
          
      if(!isAuthenticated) {
        return loginWithRedirect();
      }
  return (
    <PrivateRoute roleList={['admin']}>
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