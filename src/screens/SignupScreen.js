import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert, Card, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import '../styles/LoginScreen.css';

const SignUpScreen = ({ setIsAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem('isAuth', true);
        setIsAuth(true);
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGoogleSignUp = () => {
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
              <Card.Title>Sign Up</Card.Title>
              {error && (
                <Alert variant="danger" dismissible onClose={handleAlertDismiss}>
                  {error}
                </Alert>
              )}
              <Form onSubmit={handleSignUp}>
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

                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="login-btn">
                  Sign Up
                </Button>
                <Button variant="danger" className="ml-2 google-btn" onClick={handleGoogleSignUp}>
                  Sign Up with Google
                </Button>
              </Form>
              <div className="login-link">
                Already have an account? <Link to="/login">Sign In</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpScreen;
