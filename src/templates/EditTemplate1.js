import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { auth, firestore, storage } from "../firebase";
import {
  doc,
  collection,
  setDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "../styles/Template1.css";

const EditTemplate1 = () => {
  const [user, setUser] = useState(null); // Store user data
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(""); // Store user email
  const [userImage, setUserImage] = useState(null); // Store user image
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profession, setProfession] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [profileInformation, setProfileInformation] = useState("");
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchData(user.uid);
        getUserImage(user.uid); // Move this function call here to ensure user is not null
      } else {
        navigate("/login");
      }
    });
  
    return () => unsubscribe();
  }, [navigate, user]);

  const fetchData = (uid) => {
    const userDocRef = doc(firestore, "users", uid);
    getDoc(userDocRef)
      .then((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setName(data.name || "");
          setEmail(data.email || "");
          setGender(data.gender || "");
          setDateOfBirth(data.dateOfBirth || "");
          setProfession(data.profession || "");
          setAddress(data.address || "");
          setPhone(data.phone || "");
          setEducation(data.education || []);
          setLanguages(data.languages || []);
          setProfileInformation(data.profileInformation || "");
          setExperience(data.experience || []);
          setSkills(data.skills || []);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleUploadImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const storageRef = ref(storage, `users/${user.uid}/profile-image`);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setUserImage(url);
          })
          .catch((error) => {
            setError(error.message);
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const getUserImage = (uid) => {
    if (userImage) {
      // Add this check to avoid fetching the image again if it already exists
      return;
    }
    const storageRef = ref(storage, `users/${uid}/profile-image`);
    getDownloadURL(storageRef)
      .then((url) => {
        setUserImage(url);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleUpdateData = (e) => {
    e.preventDefault();
    if (languages.some((lang) => lang.proficiency > 5)) {
      setError("Proficiency value cannot be greater than 5.");
      return;
    }
    if (skills.some((skill) => skill.proficiency > 5)) {
      setError("Proficiency value cannot be greater than 5.");
      return;
    }
    const userDocRef = doc(firestore, "users", user.uid);
    setDoc(
      userDocRef,
      {
        name,
        email,
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
      },
      { merge: true }
    )
      .then(() => {
        setError(null); // Clear any previous error
        navigate("/template1");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleAddExperience = () => {
    setExperience((prevExperience) => [
      ...prevExperience,
      { startyear: "", endyear: "", position: "", company: "", details: "" },
    ]);
  };

  const handleRemoveExperience = (index) => {
    setExperience((prevExperience) =>
      prevExperience.filter((exp, i) => i !== index)
    );
  };

  const handleAddSkill = () => {
    setSkills((prevSkills) => [...prevSkills, { skill: "", proficiency: "" }]);
  };

  const handleRemoveSkill = (index) => {
    setSkills((prevSkills) => prevSkills.filter((skill, i) => i !== index));
  };

  const handleAddEducation = () => {
    setEducation((prevEducation) => [
      ...prevEducation,
      { school: "", degree: "", startyear: "", endyear: "" },
    ]);
  };

  const handleRemoveEducation = (index) => {
    setEducation((prevEducation) =>
      prevEducation.filter((edu, i) => i !== index)
    );
  };

  const handleAddLanguage = () => {
    setLanguages((prevLanguages) => [
      ...prevLanguages,
      { language: "", proficiency: "" },
    ]);
  };

  const handleRemoveLanguage = (index) => {
    setLanguages((prevLanguages) =>
      prevLanguages.filter((lang, i) => i !== index)
    );
  };

  if (!user) {
    return <div>Loading...</div>; // You can show a loading indicator while checking the authentication state
  }

  if (error == "Firebase Storage: Object 'users/Cs0Gqw0xS9Q8XJPik07HZa0OZPF3/profile-image' does not exist. (storage/object-not-found)") {
    setError(null);
  }

  return (
    <Container fluid style={{ marginTop: "70px" }}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
            Edit your resume
          </h3>
          {error && <p className="text-danger">{error}</p>}
          {/*User Image*/}
          <div className="user-image">
            {/* If the userImage is available, display the image and edit button */}
            {userImage ? (
              <>
                <img src={userImage} alt="User" />
                <label htmlFor="image-upload" className="edit-image-btn">
                  <FontAwesomeIcon icon={faPencilAlt} />
                  <input
                    id="image-upload"
                    type="file"
                    onChange={handleUploadImage}
                  />
                </label>
              </>
            ) : (
              /* If the userImage is not available, display the text label and upload button */
              <>
                <div className="upload-image-circle">
                  <label htmlFor="image-upload" className="upload-image-btn">
                    <FontAwesomeIcon icon={faPencilAlt} />
                    <input
                      id="image-upload"
                      type="file"
                      onChange={handleUploadImage}
                    />
                  </label>
                </div>
                <p className="upload-text">Upload Photo</p>
              </>
            )}
          </div>

          {/*Contact Information*/}
          <Card className="contact mb-3">
            <Card.Body>
              <Card.Title>Contact Information</Card.Title>
              <Form onSubmit={handleUpdateData}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          {/*Education*/}
          <Card className="education mb-3">
            <Card.Body>
              <h3>Education</h3>
              {education.map((edu, index) => (
                <div key={index}>
                  <Form.Group className="mb-3" controlId={`education${index}`}>
                    <Form.Label>Start Year</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter start year"
                      value={edu.startyear}
                      onChange={(e) => {
                        const newEducation = [...education];
                        newEducation[index].startyear = e.target.value;
                        setEducation(newEducation);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId={`education${index}`}>
                    <Form.Label>End Year</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter end year"
                      value={edu.endyear}
                      onChange={(e) => {
                        const newEducation = [...education];
                        newEducation[index].endyear = e.target.value;
                        setEducation(newEducation);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId={`education${index}`}>
                    <Form.Label>Degree</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter degree"
                      value={edu.degree}
                      onChange={(e) => {
                        const newEducation = [...education];
                        newEducation[index].degree = e.target.value;
                        setEducation(newEducation);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId={`education${index}`}>
                    <Form.Label>School</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter school"
                      value={edu.school}
                      onChange={(e) => {
                        const newEducation = [...education];
                        newEducation[index].school = e.target.value;
                        setEducation(newEducation);
                      }}
                    />
                  </Form.Group>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveEducation(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="primary" onClick={handleAddEducation}>
                Add Education
              </Button>
            </Card.Body>
          </Card>
          {/*Languages*/}
          <Card className="languages mb-3">
            <Card.Body>
              <h3>Languages</h3>
              {languages.map((lang, index) => (
                <div key={index}>
                  <Form.Group className="mb-3" controlId={`language${index}`}>
                    <Form.Label>Language</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter language"
                      value={lang.language}
                      onChange={(e) => {
                        const newLanguages = [...languages];
                        newLanguages[index].language = e.target.value;
                        setLanguages(newLanguages);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId={`language${index}`}>
                    <Form.Label>Proficiency</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter proficiency"
                      value={lang.proficiency}
                      onChange={(e) => {
                        const newLanguages = [...languages];
                        newLanguages[index].proficiency = e.target.value;
                        setLanguages(newLanguages);
                      }}
                    />
                  </Form.Group>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveLanguage(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="primary" onClick={handleAddLanguage}>
                Add Language
              </Button>
            </Card.Body>
          </Card>
          {/*Name and profession*/}
          <Card className="name-profession mb-3">
            <Card.Body>
              <Card.Title>Name and Profession</Card.Title>
              <Form onSubmit={handleUpdateData}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formProfession">
                  <Form.Label>Profession</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter profession"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                  />
                </Form.Group>
                {/*Profile information*/}
                <Card className="profile mb-3">
                  <Card.Body>
                    <Card.Title>Profile Information</Card.Title>
                    <Form.Group className="mb-3" controlId="formProfile">
                      <Form.Label>Profile Information</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter profile information"
                        value={profileInformation}
                        onChange={(e) => setProfileInformation(e.target.value)}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
                {/*Experience*/}
                <Card className="experience mb-3">
                  <Card.Body>
                    <h3>Experience</h3>
                    {experience.map((exp, index) => (
                      <div key={index}>
                        <Form.Group
                          className="mb-3"
                          controlId={`experience${index}`}
                        >
                          <Form.Label>Start Year</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter start year"
                            value={exp.startyear}
                            onChange={(e) => {
                              const newExperience = [...experience];
                              newExperience[index].startyear = e.target.value;
                              setExperience(newExperience);
                            }}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId={`experience${index}`}
                        >
                          <Form.Label>End Year</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter end year"
                            value={exp.endyear}
                            onChange={(e) => {
                              const newExperience = [...experience];
                              newExperience[index].endyear = e.target.value;
                              setExperience(newExperience);
                            }}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId={`experience${index}`}
                        >
                          <Form.Label>Position</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter position"
                            value={exp.position}
                            onChange={(e) => {
                              const newExperience = [...experience];
                              newExperience[index].position = e.target.value;
                              setExperience(newExperience);
                            }}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId={`experience${index}`}
                        >
                          <Form.Label>Company</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter company"
                            value={exp.company}
                            onChange={(e) => {
                              const newExperience = [...experience];
                              newExperience[index].company = e.target.value;
                              setExperience(newExperience);
                            }}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId={`experience${index}`}
                        >
                          <Form.Label>Details</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter details"
                            value={exp.details}
                            onChange={(e) => {
                              const newExperience = [...experience];
                              newExperience[index].details = e.target.value;
                              setExperience(newExperience);
                            }}
                          />
                        </Form.Group>
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveExperience(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button variant="primary" onClick={handleAddExperience}>
                      Add Experience
                    </Button>
                  </Card.Body>
                </Card>
                {/*Skills*/}
                <Card className="skills mb-3">
                  <Card.Body>
                    <h3>Skills</h3>
                    {skills.map((skill, index) => (
                      <div key={index}>
                        <Form.Group
                          className="mb-3"
                          controlId={`skill${index}`}
                        >
                          <Form.Label>Skill</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter skill"
                            value={skill.skill}
                            onChange={(e) => {
                              const newSkills = [...skills];
                              newSkills[index].skill = e.target.value;
                              setSkills(newSkills);
                            }}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId={`skill${index}`}
                        >
                          <Form.Label>Proficiency</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter proficiency"
                            value={skill.proficiency}
                            onChange={(e) => {
                              const newSkills = [...skills];
                              newSkills[index].proficiency = e.target.value;
                              setSkills(newSkills);
                            }}
                          />
                        </Form.Group>
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveSkill(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button variant="primary" onClick={handleAddSkill}>
                      Add Skill
                    </Button>
                  </Card.Body>
                </Card>
                <Button variant="primary" type="submit">
                  Create Resume
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditTemplate1;
