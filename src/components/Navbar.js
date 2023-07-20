import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const NavbarComponent = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">Resume Maker</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link active href="/">Home</Nav.Link>
            <Nav.Link active href="/templates">Templates</Nav.Link>
            <Nav.Link active href="/about">About</Nav.Link>
            <Nav.Link active href="/contact">Contact</Nav.Link>
            <Nav.Link active href="/feedback">Feedback</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            <Nav.Link active href="/login">Login</Nav.Link>
            <Nav.Link active href="/signup">Sign Up</Nav.Link>
            <NavDropdown active title="User" id="basic-nav-dropdown">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item> {/* Add more dropdown items if needed */}
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;