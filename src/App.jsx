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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registro" element={<Registro/>}/>
          </Route>

          <Route element={<PrivateLayout/>}>
            <Route path="/admin/empleados" element={<Empleados/>}/>
            <Route path="/admin/actividades" element={<Actividades/>}/>
            <Route path="/admin/productos" element={<Productos/>}/>
            <Route path="/admin" element={<Admin/>}/>
          </Route>on
          
          <Route element={<PublicLayout/>}>
            <Route path="/" element={<Index/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
