import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Événements Tunisie</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={NavLink} 
              to="/" 
              end
              style={({ isActive }) => ({
                textDecoration: isActive ? 'underline' : 'none'
              })}
            >
              Accueil
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/events"
              style={({ isActive }) => ({
                textDecoration: isActive ? 'underline' : 'none'
              })}
            >
              Événements
            </Nav.Link>
            <Nav.Link 
              as={NavLink} 
              to="/add-event"
              style={({ isActive }) => ({
                textDecoration: isActive ? 'underline' : 'none'
              })}
            >
              Ajouter un événement
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;