//import React from 'react'
import {Spinner} from "react-bootstrap"

const Loader=()=>{
  return(
    <div className="loader">
        <Spinner animation="grow" variant="danger" className="loader-spinner"/>
    </div>
  )
}
export default Loader