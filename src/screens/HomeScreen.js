import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/HomeScreen.css'; // Import the CSS file
import NavbarComponent from '../components/Navbar';

const HomeScreen = ({ isAuth }) => {
  return (
    <div className='home-screen'>
      {/* Hero Section */}
      <Container fluid className="hero-section">
        <Row>
          <Col>
            <h1>Create Your Perfect Resume</h1>
            <p>Build a professional resume effortlessly with our user-friendly tools.</p>
            <Button variant="primary" size="lg">
              {!isAuth ? (
              <Link to='/signup' className='link'>Get Started</Link>
              ) : (
              <Link to='/templates' className='link'>Get Started</Link>
              )}
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
      <Container className="features-section">
        <Row>
          <Col md={4}>
            <h3>Easy-to-use Resume Builder</h3>
            <p>Create a resume with just a few clicks using our intuitive interface.</p>
          </Col>
          <Col md={4}>
            <h3>Stylish Templates</h3>
            <p>Choose from a variety of stylish and professional resume templates.</p>
          </Col>
          <Col md={4}>
            <h3>Customizable Sections</h3>
            <p>Customize your resume sections to showcase your skills effectively.</p>
          </Col>
        </Row>
      </Container>

      {/* How It Works Section */}
      <Container className="how-it-works-section">
        <h2>How It Works</h2>
        <Row>
          <Col md={3}>
            <div className="step-box">
              <h4>Sign Up or Log In</h4>
              <p>Create an account or log in to access the resume builder.</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="step-box">
              <h4>Choose a Template</h4>
              <p>Select a template that matches your profession and style.</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="step-box">
              <h4>Customize Your Resume</h4>
              <p>Personalize each section of your resume with your details.</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="step-box">
              <h4>Download or Share</h4>
              <p>Download your resume in different formats or share it with others.</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Testimonials Section */}
      <Container className="testimonials-section">
        <h2>Testimonials</h2>
        <Row>
          <Col md={6}>
            <div className="testimonial">
              <p>"Resume making just got easy thanks to this amazing resume builder! Highly recommended!"</p>
              <p>- Mahek Pandya, Web Developer</p>
            </div>
          </Col>
          <Col md={6}>
            <div className="testimonial">
              <p>"Creating a resume has never been this easy. The templates are fantastic!"</p>
              <p>- Arya Madan, Web Developer</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Why Choose Us Section */}
      <Container className="why-choose-us-section">
        <h2>Why Choose Us</h2>
        <Row>
          <Col md={4}>
            <h3>User-Friendly Interface</h3>
            <p>Our resume builder is designed to be easy-to-use for all users.</p>
          </Col>
          <Col md={4}>
            <h3>Professional Templates</h3>
            <p>Choose from a collection of stylish and professional resume templates.</p>
          </Col>
          <Col md={4}>
            <h3>Secure & Private</h3>
            <p>We prioritize the security and privacy of your data.</p>
          </Col>
        </Row>
      </Container>

      {/* FAQ Section */}
      <Container className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <Row>
          <Col md={6}>
            <div className="faq">
              <h4>How do I sign up for an account?</h4>
              <p>Click on the "Get Started" button and follow the sign-up process.</p>
            </div>
            <div className="faq">
              <h4>Can I download my resume in multiple formats?</h4>
              <p>Yes, you can download your resume as a PDF or PNG.</p>
            </div>
          </Col>
          <Col md={6}>
            <div className="faq">
              <h4>Is my personal information secure?</h4>
              <p>Yes, we take data security seriously and ensure your information is protected.</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Contact Information */}
      <Container fluid className="contact-section">
        <h2>Contact Us</h2>
        <Row>
          <Col>
            <p>If you have any questions or need support, feel free to contact our team:</p>
            <p>Email: 
              <a href='mailto: chhedadhruv1234@gmail.com' style={{textDecoration: 'none', color: '#fff'}}> chhedadhruv1234@gmail.com</a>
              </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeScreen;
