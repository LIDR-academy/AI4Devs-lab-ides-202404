import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <Container>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link as={Link} to="/add-candidate">Agregar Nuevo Candidato</Nav.Link>
          {/* Más enlaces de navegación pueden ser añadidos aquí */}
        </Nav>
      </Navbar>      
    </Container>
  );
}

export default Menu;