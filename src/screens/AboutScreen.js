import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/AboutScreen.css';

const AboutScreen = () => {
  return (
    <Container className="box">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <div className="about-content">
            <h2>About Us</h2>
            <p>
              Welcome to Resume Maker! We are dedicated to helping you create professional resumes
              with ease. Our platform offers customizable templates and user-friendly tools, making
              it simple for you to build the perfect resume tailored to your needs.
            </p>
            <p>
              Whether you're a recent graduate seeking your first job or a seasoned professional
              looking for a career change, Resume Maker has the resources you need to showcase your
              skills and accomplishments effectively.
            </p>
            <p>
              Our mission is to empower individuals in their job search journey by providing
              exceptional resume-building solutions. We understand the importance of a well-crafted
              resume in today's competitive job market, and our goal is to make the process of
              creating a standout resume hassle-free and enjoyable.
            </p>
            <p>
              Thank you for choosing Resume Maker. We are excited to be part of your success story!
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutScreen;
