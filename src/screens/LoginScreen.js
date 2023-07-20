import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/LoginScreen.css';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here without Firebase for now
    console.log('Login functionality will be implemented later.');
  };

  const handleGoogleSignIn = () => {
    // Add your Google sign-in logic here without Firebase for now
    console.log('Google sign-in functionality will be implemented later.');
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
