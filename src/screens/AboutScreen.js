import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/AboutScreen.css";

const AboutScreen = () => {
  return (
    <Container fluid className="box">
      <div className="bg-image"></div>
      <Row className="justify-content-center aboutus-section">
        <Col>
          <div className="about-content">
            <h2>About Us</h2>
            <p>
              Welcome to Resume Maker! We are dedicated to helping you create
              professional resumes with ease. Our platform offers customizable
              templates and user-friendly tools, making it simple for you to
              build the perfect resume tailored to your needs.
            </p>
            <p>
              Whether you're a recent graduate seeking your first job or a
              seasoned professional looking for a career change, Resume Maker
              has the resources you need to showcase your skills and
              accomplishments effectively.
            </p>
            <p>
              Our mission is to empower individuals in their job search journey
              by providing exceptional resume-building solutions. We understand
              the importance of a well-crafted resume in today's competitive job
              market, and our goal is to make the process of creating a standout
              resume hassle-free and enjoyable.
            </p>
            <p>
              Thank you for choosing Resume Maker. We are excited to be part of
              your success story!
            </p>
          </div>
        </Col>
        <Col>
          <Card className="info-card">
            <Card.Body>
              <Image
                src="path_to_your_photo.jpg"
                roundedCircle
                className="profile-image"
              />
              <Card.Title>Your Name</Card.Title>
              <Card.Text>Add your information here.</Card.Text>
              <div className="social-links">
                <a
                  href="your_social_media_link1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  href="your_social_media_link2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                  href="your_social_media_link3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                {/* Add more social media links/icons as needed */}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutScreen;
