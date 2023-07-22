import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { firestore } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import '../styles/FeedbackScreen.css';

const FeedbackScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackType, setFeedbackType] = useState('general');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedbackRef = doc(firestore, 'feedback', email);
    setDoc(feedbackRef, {
      name,
      email,
      feedbackType,
      message,
    })
      .then(() => {
        alert('Feedback submitted successfully!');
        setName('');
        setEmail('');
        setFeedbackType('general');
        setMessage('');
      }
      )
  };

  return (
    <Container fluid>
      <div className='bg-new-image'></div>
      <Row className="justify-content-md-center feedback-section">
        <Col xs={12} md={8}>
          <div className="feedback-form">
            <h2>Provide Your Feedback</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="feedbackType">
                <Form.Label>Feedback Type</Form.Label>
                <Form.Control
                  as="select"
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value)}
                >
                  <option value="general">General Feedback</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="other">Other</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="submit-btn">
                Submit Feedback
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FeedbackScreen;
