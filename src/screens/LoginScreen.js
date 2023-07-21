import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth, createUser, provider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import '../styles/LoginScreen.css';

const LoginScreen = ({ setIsAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem('isAuth', true);
        setIsAuth(true);
        navigate('/');
        console.log(userCredential);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
      }
    );
  };

  const handleAlertDismiss = () => {
    setError(null);
  };

  return (
    <Container className="login-screen">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <div className="login-info">
            <h2>Welcome to Resume Maker</h2>
            <p>
              Create your professional resume with ease using our Resume Maker website. 
              Our platform provides customizable templates and easy-to-use tools, making 
              it simple for you to build your perfect resume.
            </p>
            <p>
              Sign in to access your saved resumes or create a new one to get started.
            </p>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="login-form">
            <h2>Sign In</h2>
            {error && (
              <Alert variant="danger" dismissible onClose={handleAlertDismiss}>
                {error}
              </Alert>
            )}
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="login-btn">
                Sign In
              </Button>
              <Button variant="danger" className="ml-2 google-btn" onClick={handleGoogleSignIn}>
                Sign In with Google
              </Button>
            </Form>
            <div className="login-link">
              New Customer? <Link to="/signup">Register</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
