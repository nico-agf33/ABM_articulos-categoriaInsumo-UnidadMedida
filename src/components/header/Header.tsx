import {Container,Nav,Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Header=()=>{
    const navigate=useNavigate();
    return(
        <>
         <Navbar bg="warning" data-bs-theme="light" className="mb-3">
         <Container>
          <Navbar.Brand onClick={()=>navigate('/')}>
            <img src="https://images2.imgbox.com/6f/d6/GOdjUVYr_o.png" alt="logo" style={{width:'100px'}} />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate('/')}>Inicio</Nav.Link>
            <Nav.Link onClick={()=>navigate('/articulos')}>Artículos</Nav.Link>
            <Nav.Link onClick={() => navigate('/categorias-insumos')}>Categorías</Nav.Link>
            <Nav.Link onClick={() => navigate('/unidades-medida')}>Unidades de medida</Nav.Link>
          </Nav>
         </Container>
         </Navbar>
        </>
    )
}
export default Header;
