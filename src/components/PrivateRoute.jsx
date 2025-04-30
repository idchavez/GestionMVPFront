import React, { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import ReactLoading from 'react-loading';

const PrivateRoute = ({children}) => {
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    
    useEffect(() => {
        const fetchAuth0Token = async () => {
            const accessToken = await getAccessTokenSilently({
                audience: 'api-autenticacion-gestion-mvp'
            });
            localStorage.setItem('token', accessToken);
        };
        if (isAuthenticated) {
            fetchAuth0Token();
        }
    }, [isAuthenticated, getAccessTokenSilently]);

    if(isLoading) 
        return 
        <ReactLoading type='cylon' color='#abc444' height={667} width={375} />;
    
    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <div>No estas autorizado para ver este sitio.</div>
    );
}

export default PrivateRoute;