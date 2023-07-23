import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const ComingSoon = () => {
  return (
    <div className="coming-soon">
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col className="text-center">
            <h1 className="mb-4">Coming Soon</h1>
            <p className="lead">
              We are working hard to bring you new features and templates. Please check back later.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ComingSoon;
