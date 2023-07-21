import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
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
      });
  };

  const handleAlertDismiss = () => {
    setError(null);
  };

  return (
    <Container fluid className="login-screen">
      <div className='bg-image'></div>
      <Row>
        <Col xs={12} md={6}>
          <Card className="login-card">
            <Card.Body>
              <Card.Title>Log In</Card.Title>
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
