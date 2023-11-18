//import React from "react";
import {MDBCol,MDBContainer,MDBRow,MDBFooter} from "mdbreact";

const FooterPage=()=>{
  return(
    <MDBFooter color="blue" className="font-small pt-4 mt-4 bg-warning">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
          <img src="https://images2.imgbox.com/6f/d6/GOdjUVYr_o.png" alt="logo" style={{width:'180px'}} />
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Enlaces</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Catálogo</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Sucursales</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Sobre nosotros</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Contacto</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> MDBootstrap.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}
export default FooterPage;