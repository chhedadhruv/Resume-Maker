import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import { doc, collection, setDoc, updateDoc, arrayRemove, arrayUnion, getDoc } from 'firebase/firestore';
import '../styles/ProfileScreen.css';

const ProfileScreen = () => {
  const [user, setUser] = useState(null); // Store user data
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profession, setProfession] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [education, setEducation] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [profileInformation, setProfileInformation] = useState('');
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  
  let navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in, fetch profile data
        setUser(user);
        fetchProfileData(user.uid);
      } else {
        // User is not logged in, redirect to login page or show a message
        navigate('/login'); // Redirect to the login page
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchProfileData = (uid) => {
    const userDocRef = doc(firestore, 'users', uid);
    getDoc(userDocRef)
      .then((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setName(data.name || '');
          setGender(data.gender || '');
          setDateOfBirth(data.dateOfBirth || '');
          setProfession(data.profession || '');
          setAddress(data.address || '');
          setPhone(data.phone || '');
          setEducation(data.education || []);
          setLanguages(data.languages || []);
          setProfileInformation(data.profileInformation || '');
          setExperience(data.experience || []);
          setSkills(data.skills || []);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const userDocRef = doc(firestore, 'users', user.uid);
    setDoc(userDocRef, {
      name,
      gender,
      dateOfBirth,
      profession,
      address,
      phone,
      education,
      languages,
      profileInformation,
      experience,
      skills,
    }, { merge: true })
      .then(() => {
        setError(null); // Clear any previous error
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleAddExperience = () => {
    setExperience((prevExperience) => [...prevExperience, { year: '', position: '', company: '', details: '' }]);
  };

  const handleRemoveExperience = (index) => {
    setExperience((prevExperience) => prevExperience.filter((exp, i) => i !== index));
  };

  const handleAddSkill = () => {
    setSkills((prevSkills) => [...prevSkills, { skill: '', proficiency: '' }]);
  };

  const handleRemoveSkill = (index) => {
    setSkills((prevSkills) => prevSkills.filter((skill, i) => i !== index));
  };

  const handleAddEducation = () => {
    setEducation((prevEducation) => [...prevEducation, { school: '', degree: '', year: '' }]);
  };

  const handleRemoveEducation = (index) => {
    setEducation((prevEducation) => prevEducation.filter((edu, i) => i !== index));
  };

  const handleAddLanguage = () => {
    setLanguages((prevLanguages) => [...prevLanguages, { language: '', proficiency: '' }]);
  };

  const handleRemoveLanguage = (index) => {
    setLanguages((prevLanguages) => prevLanguages.filter((lang, i) => i !== index));
  };

  if (!user) {
    return <div>Loading...</div>; // You can show a loading indicator while checking the authentication state
  }

  return (
    <Container fluid className="profile-screen">
      <Row>
        <Col xs={12} md={6}>
          <Card className="profile-card">
            <Card.Body>
              <Card.Title>Edit Profile</Card.Title>
              {error && (
                <Alert variant="danger" dismissible onClose={() => setError(null)}>
                  {error}
                </Alert>
              )}
              <Form onSubmit={handleUpdateProfile}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="dateOfBirth">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="profession">
                  <Form.Label>Profession</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your profession"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="education">
                  <Form.Label>Education</Form.Label>
                  {education.map((edu, index) => (
                    <div key={index}>
                      <Form.Control
                        type="text"
                        placeholder="Enter your education"
                        value={edu}
                        onChange={(e) => {
                          setEducation((prevEdu) => {
                            const updatedEducation = [...prevEdu];
                            updatedEducation[index] = e.target.value;
                            return updatedEducation;
                          });
                        }}
                      />
                      <Button variant="danger" onClick={() => handleRemoveEducation(index)}>Remove</Button>
                    </div>
                  ))}
                  <Button variant="primary" onClick={handleAddEducation}>Add Education</Button>
                </Form.Group>

                <Form.Group className="mb-3" controlId="languages">
                  <Form.Label>Languages</Form.Label>
                  {languages.map((lang, index) => (
                    <div key={index}>
                      <Form.Control
                        type="text"
                        placeholder="Enter your languages"
                        value={lang}
                        onChange={(e) => {
                          setLanguages((prevLang) => {
                            const updatedLanguages = [...prevLang];
                            updatedLanguages[index] = e.target.value;
                            return updatedLanguages;
                          });
                        }}
                      />
                      <Button variant="danger" onClick={() => handleRemoveLanguage(index)}>Remove</Button>
                    </div>
                  ))}
                  <Button variant="primary" onClick={handleAddLanguage}>Add Language</Button>
                </Form.Group>

                <Form.Group className="mb-3" controlId="profileInformation">
                  <Form.Label>Profile Information</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter your profile information"
                    value={profileInformation}
                    onChange={(e) => setProfileInformation(e.target.value)}
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="update-btn">
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card className="profile-card">
            <Card.Body>
              <Card.Title>Experience</Card.Title>
              {experience.map((exp, index) => (
                <div key={index}>
                  <Form.Group className="mb-3" controlId="experience">
                  <Form.Label>Experience</Form.Label>
                  {experience.map((exp, index) => (
                    <div key={index}>
                      <Form.Control
                        type="text"
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => {
                          setExperience((prevExp) => {
                            const updatedExperience = [...prevExp];
                            updatedExperience[index].position = e.target.value;
                            return updatedExperience;
                          });
                        }}
                      />
                      <Form.Control
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => {
                          setExperience((prevExp) => {
                            const updatedExperience = [...prevExp];
                            updatedExperience[index].company = e.target.value;
                            return updatedExperience;
                          });
                        }}
                      />
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Details"
                        value={exp.details}
                        onChange={(e) => {
                          setExperience((prevExp) => {
                            const updatedExperience = [...prevExp];
                            updatedExperience[index].details = e.target.value;
                            return updatedExperience;
                          });
                        }}
                      />
                      <Button variant="danger" onClick={() => handleRemoveExperience(index)}>Remove</Button>
                    </div>
                  ))}
                  <Button variant="primary" onClick={handleAddExperience}>Add Experience</Button>
                </Form.Group>

                  {/* Add form fields for position, company, and details */}

                  <Button variant="danger" onClick={() => handleRemoveExperience(index)}>Remove</Button>
                </div>
              ))}
              <Button variant="primary" onClick={handleAddExperience}>Add Experience</Button>
            </Card.Body>
          </Card>

          <Card className="profile-card">
            <Card.Body>
              <Card.Title>Skills</Card.Title>
              {skills.map((skill, index) => (
                <div key={index}>
                  <Form.Group className="mb-3">
                    <Form.Label>Skill</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your skill"
                      value={skill.skill}
                      onChange={(e) => {
                        setSkills((prevSkills) => {
                          const updatedSkills = [...prevSkills];
                          updatedSkills[index].skill = e.target.value;
                          return updatedSkills;
                        });
                      }}
                    />
                  </Form.Group>

                  {/* Add form fields for proficiency */}
                  
                  <Button variant="danger" onClick={() => handleRemoveSkill(index)}>Remove</Button>
                </div>
              ))}
              <Button variant="primary" onClick={handleAddSkill}>Add Skill</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
