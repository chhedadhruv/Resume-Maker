import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
  Dropdown,
} from "react-bootstrap";
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
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../styles/CreateTemplate1.css";
import ImageUser from "../assets/bg.png";

const CreateTemplate1 = () => {
  const [user, setUser] = useState(null);
  const [userImage, setUserImage] = useState(null); // Store user image
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
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
  const [uploadedImage, setUploadedImage] = useState(null);

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

  const getUserImage = (uid) => {
    return new Promise((resolve, reject) => {
      // Check if the userImage is already available
      if (userImage) {
        resolve(userImage);
        return;
      }
  
      // Get the user's image URL from Firebase Storage
      const storageRef = ref(storage, `users/${uid}/profile-image`);
      getDownloadURL(storageRef)
        .then((url) => {
          // Save the image URL in the state to avoid fetching it again next time
          setUserImage(url);
          resolve(url);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  };
  
  const generateLightCircles = (proficiency) => {
    const filledCirclesCount = Math.min(proficiency, 4); // Limit the number of filled circles to 4
    const circles = [];
    for (let i = 0; i < 4; i++) {
      circles.push(
        <span
          key={i}
          className={`circle ${i < filledCirclesCount ? "filled-light" : "outline-light"}`}
        ></span>
      );
    }
    return circles;
  };

  const generateDarkCircles = (proficiency) => {
    const filledCirclesCount = Math.min(proficiency, 4); // Limit the number of filled circles to 4
    const circles = [];
    for (let i = 0; i < 4; i++) {
      circles.push(
        <span
          key={i}
          className={`circle ${i < filledCirclesCount ? "filled-dark" : "outline-dark"}`}
        ></span>
      );
    }
    return circles;
  };

  const handleDownloadOption = (option) => {
    if (option === "pdf") {
      const element = document.getElementById("resume");
      const opt = {
        margin: 0.5,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      html2pdf().set(opt).from(element).save();
    } else if (option === "txt") {
      const element = document.getElementById("resume");
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "JPEG", 0, 0, width, height);
        pdf.save("resume.pdf");
      });
    } else if (option === "png") {
      const element = document.getElementById("resume");
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        
        pdf.addImage(imgData, "JPEG", 0, 0);
        pdf.save("resume.pdf");
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
      const storageRef = ref(storage, `users/${user.uid}/profile-image`);
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");
          getUserImage(user.uid);
        }
        )
    }
  };  
  
  if (!user) {
    return <div>Loading...</div>; // You can show a loading indicator while checking the authentication state
  }

  if (
    error ==
    "Firebase Storage: Object 'users/Cs0Gqw0xS9Q8XJPik07HZa0OZPF3/profile-image' does not exist. (storage/object-not-found)"
  ) {
    setError(null);
  }

  return (
    // create a resume template in which on the left side there will be user's image, below that there will be contact info like phone, email, address and below that there will be education and languages and on the right side there will be name, profession, profile information, experience and skills
    <Container fluid style={{ marginTop: "70px" }}>
      <Row className="justify-content-center">
        {/* <Card className="main-card" id="resume"> */}
        <div className="main-card" id="resume">
          <Col md={4} className="d-flex">
            <Card className="left-card">
              {/* User's Image */}
              {uploadedImage ? (
                <Image
                  src={URL.createObjectURL(uploadedImage)}
                  className="user-img-color"
                  roundedCircle
                  width="150px"
                  height="150px"
                />
              ) : (
                // <Image
                //   src={uploadedImage}
                //   className="user-image"
                //   roundedCircle
                //   width="150px"
                //   height="150px"
                // />
              <Form.Group className="mb-3" controlId="formFile">
                <Form.Control
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </Form.Group>
              )}
              
              {/* Contact Info */}
              <Card className="transparent-card font">
                <Card.Body>
                  <Card.Title className="card-text-color semibold contact-title">Contact</Card.Title>
                  <Card.Text className="card-text-color">
                    <p>Phone:</p>
                    <p>{phone}</p>
                    <p>Email:</p>
                    <p>{email}</p>
                    <p>Address:</p>
                    <p>{address}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
              {/* Education */}
              <Card className="transparent-card font">
                <Card.Body>
                  <Card.Title className="card-text-color semibold">Education</Card.Title>
                  <Card.Text className="card-text-color">
                    {education.map((item, index) => {
                      return (
                        <>
                          <p key={index}>
                            {item.startyear} - {item.endyear}
                          </p>
                          <p>{item.degree}</p>
                          <p>{item.school}</p>
                        </>
                      );
                    })}
                  </Card.Text>
                </Card.Body>
              </Card>
              {/* Languages */}
              <Card className="transparent-card font">
                <Card.Body>
                  <Card.Title className="card-text-color semibold">Language</Card.Title>
                  <Card.Text className="card-text-color">
                    {languages.map((item, index) => (
                      <div key={index} className="language-item">
                        <p>{item.language}</p>
                        <div className="circles-container">
                          {generateLightCircles(item.proficiency)}
                        </div>
                      </div>
                    ))}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Card>
          </Col>
          <Col className="d-flex justify-content-center">
            <Card className="right-card transparent-card">
              {/* Name */}
              <Card className="transparent-card name-card">
                <Card.Body>
                  <Card.Title className="semibold name-font">
                  <div>
    {name.split(' ')[0]}
  </div>
  <div>
    {name.split(' ')[1]}
  </div>
                  </Card.Title>
                  <Card.Text>
                    <p>{profession}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
              {/* Profile Information */}
              <Card className="transparent-card profile-info font">
                <Card.Body>
                  <Card.Title className="semibold">Profile</Card.Title>
                  <Card.Text>
                    <p>{profileInformation}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
              {/* Experience */}
              <Card className="transparent-card experience">
                <Card.Body>
                  <Card.Title className="experience-card">Experience</Card.Title>
                  <Row>
                    <Col md={3}>
                      <Card.Text>
                        {experience.map((item, index) => {
                          return (
                            <>
                              <p key={index} className="regular">
                                {item.startyear} - {item.endyear}
                              </p>
                              <p className="regular">{item.company}</p>
                            </>
                          );
                        })}
                      </Card.Text>
                    </Col>
                    <Col md={8}>
                      <Card.Text>
                        {experience.map((item, index) => {
                          return (
                            <>
                              <p key={index} className="medium">{item.position}</p>
                              <p className="light">{item.details}</p>
                            </>
                          );
                        })}
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              {/* Skills */}
              <Card className="transparent-card font">
  <Card.Body>
    <Card.Title className="semibold">Skills</Card.Title>
    <Card.Text>
      <div className="skills-row">
        {skills.map((item, index) => (
          <div key={index} className="skill-item">
            <p>{item.skill}</p>
            <div className="circles-container">{generateDarkCircles(item.proficiency)}</div>
          </div>
        ))}
      </div>
    </Card.Text>
  </Card.Body>
</Card>
            </Card>
          </Col>
        </div>
        {/* </Card> */}
        {/* Buttons */}
        <Row className="justify-content-center mt-3">
            <Col xs="auto">
              <Button variant="primary" onClick={() => navigate("/edittemplate1")}>
                Edit Resume
              </Button>
            </Col>
            <Col xs="auto">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Download Resume
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleDownloadOption("pdf")}>
                    Download as PDF
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDownloadOption("txt")}>
                    Download as TXT
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDownloadOption("png")}>
                    Download as PNG
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            </Row>
      </Row>
    </Container>
  );
};

export default CreateTemplate1;
