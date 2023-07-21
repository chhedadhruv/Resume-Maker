import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/ProfileScreen.css';

const ProfileScreen = () => {
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    dob: '1990-01-01',
    gender: 'Male',
    phoneNumber: '1234567890',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the updated user details to the backend or update the state as needed
    console.log(userDetails);
  };

  return (
    <Container fluid className="profile-screen">
      <div className="profile-header">
        <h2>Profile</h2>
        <p>Update your profile information below:</p>
      </div>
      <Form onSubmit={handleSubmit} className='profile-form'>
        <Form.Group controlId="name" style={{marginBottom: 5}}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="dob" style={{marginBottom: 5}}>
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dob"
            value={userDetails.dob}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="gender" style={{marginBottom: 5}}>
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={userDetails.gender}
            onChange={handleChange}
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="phoneNumber" style={{marginBottom: 5}}>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            value={userDetails.phoneNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={{marginTop:10}}>
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default ProfileScreen;
