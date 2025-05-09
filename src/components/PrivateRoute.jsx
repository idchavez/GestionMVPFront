import { useUser } from 'context/userContext';
import React from 'react'
import ReactLoading from 'react-loading';

const PrivateRoute = ({roleList, children}) => {

    const {userData} = useUser();

    console.log('rol: ',userData.rol);
    console.log('rolelist: ', roleList);

    if (roleList.includes(userData.rol)) {
        return children;
    }
    
    return <div>No estas autorizado para ver este sitio.</div>;
};

export default PrivateRoute;