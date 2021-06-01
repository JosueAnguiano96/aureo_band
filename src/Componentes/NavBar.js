import React from 'react';
import Logo from './../imagenes/aureoblanco.png';
import './../css/colores.css'
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useAuth} from './../contextos/AuthContext';


const NavBar = () => {
  const {usuario} = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand to="/"><img src={Logo} style={{width:"100px",height:"30px"}} alt="áureo"></img></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link><Link to="/">Home</Link></Nav.Link>
          <Nav.Link><Link to="/sobre-aureo">Sobre Áureo</Link></Nav.Link>
          <Nav.Link><Link to="/merch">Merch</Link></Nav.Link>
          <Nav.Link><Link to="/contacto">Contacto</Link></Nav.Link>
          {
            usuario ? <Nav.Link><Link to="/adminaureo">Admin</Link></Nav.Link> : ''
          }
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
); 
}


export default NavBar;