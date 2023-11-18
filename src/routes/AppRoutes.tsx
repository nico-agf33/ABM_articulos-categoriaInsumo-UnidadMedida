//import React from 'react'
import {Route,Routes} from "react-router-dom"
import HomePage from "../pages/HomePage"
import Articulos from "../pages/Articulos"
import Categorias from "../pages/Categorias";
import UnidadesMedida from "../pages/UnidadesMedida";
import Componentes from "../pages/Componentes"

const AppRoutes:React.FC=()=>{
  return(
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/articulos" element={<Articulos />} />
        <Route path="/categorias-insumos" element={<Categorias />} />
        <Route path="/unidades-medida" element={<UnidadesMedida />} />
        <Route path="/componentes" element={<Componentes />} />
    </Routes>
  )
}
export default AppRoutes