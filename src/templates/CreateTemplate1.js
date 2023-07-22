import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Image } from "react-bootstrap";
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
import '../styles/CreateTemplate1.css'

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

  if (!user) {
    return <div>Loading...</div>; // You can show a loading indicator while checking the authentication state
  }

  if (error == "Firebase Storage: Object 'users/Cs0Gqw0xS9Q8XJPik07HZa0OZPF3/profile-image' does not exist. (storage/object-not-found)") {
    setError(null);
  }

    return (
        // create a resume template in which on the left side there will be user's image, below that there will be contact info like phone, email, address and below that there will be education and languages and on the right side there will be name, profession, profile information, experience and skills
        <Container fluid style={{marginTop: '70px'}}>
            <Row className="justify-content-center">
                <Col md={4}>
                    {/* User's Image */}
                    <Card>
                        <Card.Body>
                            <Image src={userImage} roundedCircle width="150" height="150" />
                        </Card.Body>
                    </Card>
                    {/* Contact Info */}
                    <Card>
                        <Card.Body>
                            <Card.Title>Contact</Card.Title>
                            <Card.Text>
                                <p><strong>Email:</strong></p>
                                <p>{email}</p>
                                <p><strong>Phone:</strong></p>
                                <p>{phone}</p>
                                <p><strong>Address:</strong></p>
                                <p>{address}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    {/* Education */}
                    <Card>
                        <Card.Body>
                            <Card.Title>Education</Card.Title>
                            <Card.Text>
                                {education.map((item, index) => {
                                    return (
                                        <>
                                        <p key={index}>{item.startyear} - {item.endyear}</p>
                                        <p>{item.degree}</p>
                                        <p>{item.school}</p>
                                        </>
                                    )
                                })}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    {/* Languages */}
                    <Card>
                        <Card.Body>
                            <Card.Title>Language</Card.Title>
                            <Card.Text>
                                {languages.map((item, index) => {
                                    return (
                                        <p key={index}>{item.language} {item.proficiency}</p>
                                    )
                                })}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                </Col>
                <Col md={4}></Col>
            </Row>
        </Container>
    );
    }

export default CreateTemplate1;