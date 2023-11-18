//import React from 'react'
import {useState} from "react";
import {Button} from "react-bootstrap";
import ModalColorPick from "../my-modal-props/ModalColorPick";


const ButtonColorPick=()=>{
    const [buttonColor,setButtonColor]=useState("#3d7c40");
    const [showModal,setShowModal]=useState(false);
    const handleColorChange=(color:string)=>{setButtonColor(color);};
    const handleShowModal=()=>{setShowModal(true);};
  return(
    <div className="m-3">
        <h2>Ejemplo 3</h2>
        {/* Componente Padre */}
        <Button variant="primary" style={{backgroundColor:buttonColor}} onClick={handleShowModal}>
        Cambiar color
        </Button>
        {/* Componente Hijo */}
        {showModal&&<ModalColorPick show={showModal} onHide={()=>setShowModal(false)} handleColorChange={handleColorChange}/>}
    </div>
  )
}
export default ButtonColorPick