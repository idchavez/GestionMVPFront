import {createContext, useContext} from 'react';

export const UserContext = createContext(null);
//Hook Personalizado
export const useUser = () => {
    return useContext(UserContext);
};