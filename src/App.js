import React, { useState, useEffect } from 'react'
import { Link, HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
// import Navbar from './components/Navbar'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import HomeScreen from './screens/HomeScreen'
import FeedbackScreen from './screens/FeedbackScreen';
import AboutScreen from './screens/AboutScreen';
import ProfileScreen from './screens/ProfileScreen';
import TemplatesScreen from './screens/TemplatesScreen';
import EditTemplate1 from './templates/EditTemplate1';
import EditTemplate2 from './templates/EditTemplate2';
import EditTemplate3 from './templates/EditTemplate3';
import CreateTemplate1 from './templates/CreateTemplate1';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setIsAuth(false);
        window.location.pathname = '/';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Check localStorage for authentication status on app start
    const storedAuth = localStorage.getItem('isAuth');
    if (storedAuth) {
      setIsAuth(true);
    }
  }, []);

  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          SkillFlex CV
          </Link>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {!isAuth ? (
            <>
          <Nav className="mr-auto">
            <Nav.Link active>
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Home
              </Link>
              </Nav.Link>
            <Nav.Link active>
              <Link to='about' style={{ textDecoration: 'none', color: 'white' }}>
              About
              </Link>
              </Nav.Link>
            <Nav.Link active>
              <Link to='feedback' style={{ textDecoration: 'none', color: 'white' }}>
              Feedback
              </Link>
              </Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            <Nav.Link active>
              <Link to='login' style={{ textDecoration: 'none', color: 'white' }}>
              Login
              </Link>
              </Nav.Link>
            <Nav.Link active>
              <Link to='signup' style={{ textDecoration: 'none', color: 'white' }}>
              Sign Up
              </Link>
              </Nav.Link>
          </Nav>
          </>
          ) : (
            <>
          <Nav className="mr-auto">
            <Nav.Link active>
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Home
              </Link>
              </Nav.Link>
            <Nav.Link active>
              <Link to='templates' style={{ textDecoration: 'none', color: 'white' }}>
              Templates
              </Link>
              </Nav.Link>
            <Nav.Link active>
              <Link to='about' style={{ textDecoration: 'none', color: 'white' }}>
              About
              </Link>
              </Nav.Link>
            <Nav.Link active>
              <Link to='feedback' style={{ textDecoration: 'none', color: 'white' }}>
              Feedback
              </Link>
              </Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            <NavDropdown active title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to='profile' style={{ textDecoration: 'none', color: 'black' }}>
                Profile
                </Link>
                </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} style={{color: 'red'}}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Routes>
        <Route path='/' element={<HomeScreen isAuth={isAuth} />} />
        <Route path='/login' element={<LoginScreen setIsAuth={setIsAuth} />} />
        <Route path='/signup' element={<SignupScreen setIsAuth={setIsAuth} />} />
        <Route path='/feedback' element={<FeedbackScreen />} />
        <Route path='/about' element={<AboutScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/templates' element={<TemplatesScreen />} />
        <Route path='/edittemplate1' element={<EditTemplate1 />} />
        <Route path='/edittemplate2' element={<EditTemplate2 />} />
        <Route path='/edittemplate3' element={<EditTemplate3 />} />
        <Route path='/template1' element={<CreateTemplate1 />} />
      </Routes>
    </Router>
  )
}

export default App
