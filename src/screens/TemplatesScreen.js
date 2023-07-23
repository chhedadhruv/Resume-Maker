import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal, Button, Alert } from 'react-bootstrap';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/TemplatesScreen.css';
import Template1 from '../assets/templates/template1.png';
import Template2 from '../assets/templates/template2.png';
import Template3 from '../assets/templates/template3.png';

const templates = [
    {
      id: 1,
      title: 'Template 1',
      description: 'A simple and elegant resume template.',
      image: Template1,
      buttonText: 'Use This Template',
    },
    {
      id: 2,
      title: 'Template 2',
      description: 'A modern and professional resume template.',
      image: Template2,
      buttonText: 'Coming Soon'
    },
    {
      id: 3,
      title: 'Template 3',
      description: 'A modern and professional resume template.',
      image: Template3,
      buttonText: 'Coming Soon'
    },
  ];
  

  const TemplatesScreen = () => {
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          // User is logged in
          setUser(authUser);
        } else {
          // User is logged out
          setUser(null);
        }
      });

      return unsubscribe;
    }, [user, navigate]);
  
    const handleTemplateClick = (template) => {
      setSelectedTemplate(template);
      setShowModal(true);
    };
  
    const handleUseTemplate = () => {
      // Use the selected template or navigate to the respective EditTemplate page based on the template id
      navigate(`/edittemplate${selectedTemplate.id}`);
      setShowModal(false);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    return (
      <Container fluid>
        <Row className='justify-content-md-center'>
          {templates.map((template) => (
            <Col key={template.id} xs={12} sm={6} md={4} lg={3} className="template-col">
              <Card className="template-card" onClick={() => handleTemplateClick(template)}>
                <Card.Img variant="top" src={template.image} />
                <Card.Body>
                  <Card.Title>{template.title}</Card.Title>
                  <Card.Text>{template.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
  
        {/* Template Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedTemplate?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className="modal-image" src={selectedTemplate?.image} alt={selectedTemplate?.title} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleUseTemplate}>
              {selectedTemplate?.buttonText}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  };

export default TemplatesScreen;
