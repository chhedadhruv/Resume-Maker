import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import { doc, collection, setDoc, updateDoc, arrayRemove, arrayUnion, getDoc } from 'firebase/firestore';
import '../styles/ProfileScreen.css';

const ProfileScreen = () => {
  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(true); // Handle loading state
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
        setUser(user);
        setLoading(true); // Set loading to true when the user is logged in
        fetchProfileData(user.uid);
      } else {
        setUser(null); // Reset the user state when the user logs out
        setLoading(false); // Set loading to false when the user logs out
        navigate('/login');
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
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (languages.some((lang) => lang.proficiency > 4)) {
      setError('Proficiency value cannot be greater than 4.');
      return;
    }
    if (skills.some((skill) => skill.proficiency > 4)) {
      setError('Proficiency value cannot be greater than 4.');
      return;
    }
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
    setExperience((prevExperience) => [...prevExperience, { startyear: '',endyear: '' , position: '', company: '', details: '' }]);
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
    setEducation((prevEducation) => [...prevEducation, { school: '', degree: '', startyear: '', endyear: '' }]);
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

  if (loading) {
    return <div>Loading...</div>; // You can show a loading indicator while checking the authentication state
  }
  
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
                    type="number"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="education">
                <Form.Label>Education</Form.Label>
                {education.map((edu, index) => (
                  <div key={index}>
                    <Form.Group controlId={`degree-${index}`}>
                      <Form.Label>Degree</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your degree"
                        value={edu.degree}
                        onChange={(e) =>
                          setEducation((prevEducation) => {
                            const updatedEducation = [...prevEducation];
                            updatedEducation[index].degree = e.target.value;
                            return updatedEducation;
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group controlId={`school-${index}`}>
                      <Form.Label>School</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your school"
                        value={edu.school}
                        onChange={(e) =>
                          setEducation((prevEducation) => {
                            const updatedEducation = [...prevEducation];
                            updatedEducation[index].school = e.target.value;
                            return updatedEducation;
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group controlId={`year-${index}`}>
                      <Form.Label>Year</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your year of completion"
                        value={edu.year}
                        onChange={(e) =>
                          setEducation((prevEducation) => {
                            const updatedEducation = [...prevEducation];
                            updatedEducation[index].year = e.target.value;
                            return updatedEducation;
                          })
                        }
                      />
                    </Form.Group>

                    {index > 0 && (
                      <Button variant="danger" onClick={() => handleRemoveEducation(index)}>
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="primary" onClick={handleAddEducation}>
                  Add Education
                </Button>
              </Form.Group> */}

                {/* <Form.Group className="mb-3" controlId="languages">
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
                </Form.Group> */}

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
              <Card.Title>Education</Card.Title>
              {education.map((edu, index) => (
                <div key={index}>
                  <Form.Group className="mb-3" controlId="education">
                    <Form.Label>Degree</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your degree"
                      value={edu.degree}
                      onChange={(e) =>
                        setEducation((prevEducation) => {
                          const updatedEducation = [...prevEducation];
                          updatedEducation[index].degree = e.target.value;
                          return updatedEducation;
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="education">
                    <Form.Label>School</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your school/college/university"
                      value={edu.school}
                      onChange={(e) =>
                        setEducation((prevEducation) => {
                          const updatedEducation = [...prevEducation];
                          updatedEducation[index].school = e.target.value;
                          return updatedEducation;
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="education">
                    <Form.Label>Start Year</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter your year of completion"
                      value={edu.startyear}
                      onChange={(e) =>
                        setEducation((prevEducation) => {
                          const updatedEducation = [...prevEducation];
                          updatedEducation[index].startyear = e.target.value;
                          return updatedEducation;
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="education">
                    <Form.Label>End Year</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your year of completion"
                      value={edu.endyear}
                      onChange={(e) =>
                        setEducation((prevEducation) => {
                          const updatedEducation = [...prevEducation];
                          updatedEducation[index].endyear = e.target.value;
                          return updatedEducation;
                        })
                      }
                    />
                  </Form.Group>

                  {/* {index > 0 && ( */}
                    <Button variant="danger" onClick={() => handleRemoveEducation(index)} style={{marginBottom: '10px'}}>
                      Remove
                    </Button>
                  {/* )} */}
                </div>
              ))}
              <Button variant="primary" onClick={handleAddEducation}>
                Add Education
              </Button>
            </Card.Body>
          </Card>

          <Card className="profile-card">
            <Card.Body>
              <Card.Title>Languages</Card.Title>
              {languages.map((lang, index) => (
                <div key={index}>
                  <Form.Group className="mb-3" controlId="languages">
                    <Form.Label>Language</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your languages (e.g., English, Hindi, etc.)"
                      value={lang.language}
                      onChange={(e) => {
                        setLanguages((prevLang) => {
                          const updatedLanguages = [...prevLang];
                          updatedLanguages[index].language = e.target.value;
                          return updatedLanguages;
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="languages">
                    <Form.Label>Proficiency</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter your proficiency (Rating out of 4)"
                      value={lang.proficiency}
                      onChange={(e) => {
                        setLanguages((prevLang) => {
                          const updatedLanguages = [...prevLang];
                          updatedLanguages[index].proficiency = e.target.value;
                          return updatedLanguages;
                        });
                      }}
                    />
                  </Form.Group>
                  <Button variant="danger" onClick={() => handleRemoveLanguage(index)} style={{marginBottom: '10px'}}>Remove</Button>
                </div>
              ))}
              <Button variant="primary" onClick={handleAddLanguage}>Add Language</Button>
            </Card.Body>
          </Card>

          <Card className="profile-card">
            <Card.Body>
              <Card.Title>Experience</Card.Title>
              {experience.map((exp, index) => (
                <div key={index}>
                  <Form.Group className="mb-3" controlId="experience">
                    <Form.Label> Start Year</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter the year you started"
                      value={exp.startyear}
                      onChange={(e) =>
                        setExperience((prevExperience) => {
                          const updatedExperience = [...prevExperience];
                          updatedExperience[index].startyear = e.target.value;
                          return updatedExperience;
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="experience">
                    <Form.Label>End Year</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your year of completion"
                      value={exp.endyear}
                      onChange={(e) =>
                        setExperience((prevExperience) => {
                          const updatedExperience = [...prevExperience];
                          updatedExperience[index].endyear = e.target.value;
                          return updatedExperience;
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="experience">
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your position"
                      value={exp.position}
                      onChange={(e) =>
                        setExperience((prevExperience) => {
                          const updatedExperience = [...prevExperience];
                          updatedExperience[index].position = e.target.value;
                          return updatedExperience;
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="experience">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your company"
                      value={exp.company}
                      onChange={(e) =>
                        setExperience((prevExperience) => {
                          const updatedExperience = [...prevExperience];
                          updatedExperience[index].company = e.target.value;
                          return updatedExperience;
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="experience">
                    <Form.Label>Details</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter your details"
                      value={exp.details}
                      onChange={(e) =>
                        setExperience((prevExperience) => {
                          const updatedExperience = [...prevExperience];
                          updatedExperience[index].details = e.target.value;
                          return updatedExperience;
                        })
                      }
                    />
                  </Form.Group>
   
                    <Button variant="danger" onClick={() => handleRemoveExperience(index)} style={{marginBottom: '10px'}}>
                      Remove
                    </Button>
                </div>
              ))}
              <Button variant="primary" onClick={handleAddExperience}>
                Add Experience
              </Button>
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
                  <Form.Group className="mb-3">
                    <Form.Label>Proficiency</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter your proficiency (Rating out of 4)"
                      value={skill.proficiency}
                      onChange={(e) => {
                        setSkills((prevSkills) => {
                          const updatedSkills = [...prevSkills];
                          updatedSkills[index].proficiency = e.target.value;
                          return updatedSkills;
                        });
                      }}
                    />
                  </Form.Group>

                  {/* Add form fields for proficiency */}
                  
                  <Button variant="danger" onClick={() => handleRemoveSkill(index)} style={{marginBottom: '10px'}}>Remove</Button>
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
