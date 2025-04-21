import Admin from "pages/admin/Index";
import Login from "pages/Login";
import Registro from "pages/Registro";
import Index from "pages/Index";
import {BrowserRouter, Route,Routes} from "react-router-dom";
import 'styles/styles.css';
import PublicLayout from "layouts/PublicLayout";
import PrivateLayout from "layouts/PrivateLayout";
import AuthLayout from "layouts/AuthLayout";
import Empleados from 'pages/admin/Empleados';
import Actividades from "pages/admin/Actividades";
import Productos from "pages/admin/Productos";
import { DarkModeContext } from "context/darkMode";
import { useEffect, useState } from "react";
import Perfil from "pages/admin/Perfil";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    console.log('modo dark:', darkMode)
  }, [darkMode]);

  return (
    <div>
      <DarkModeContext.Provider value={{darkMode, setDarkMode}}>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthLayout/>}>
              <Route path="/login" element={<Login/>}/>
              <Route path="/registro" element={<Registro/>}/>
            </Route>

            <Route element={<PrivateLayout/>}>
              <Route path="/admin/perfil" element={<Perfil/>}/>
              <Route path="/admin/empleados" element={<Empleados/>}/>
              <Route path="/admin/actividades" element={<Actividades/>}/>
              <Route path="/admin/productos" element={<Productos/>}/>
              <Route path="/admin/inicio" element={<Admin/>}/>
            </Route>on
            
            <Route element={<PublicLayout/>}>
              <Route path="/" element={<Index/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </DarkModeContext.Provider>
    </div>
  );
}

export default App;
