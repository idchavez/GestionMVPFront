import {createContext, useContext} from 'react';

export const DarkModeContext = createContext(null);
//Hook Personalizado
export const useDarkMode = () => {
    return useContext(DarkModeContext);
};