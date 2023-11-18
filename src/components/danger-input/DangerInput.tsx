import React,{useState} from 'react';
import {Form} from 'react-bootstrap';
import DangerBar from "../danger-bar/DangerBar";

const DangerInput=()=>{
  const[value,setValue]=useState(0);
  const HandleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setValue(Number(event.target.value));
  }  
  return(
    <div className="m-3 w-50">
        <h2>Ejemplo 1</h2>
        {/* Componente Padre */}
        <Form.Range value={value} onChange={HandleChange} />
        {/* Componente Hijo */}
        <DangerBar value={value} />
    </div>
  )
}
export default DangerInput;