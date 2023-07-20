import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import HomeScreen from './screens/HomeScreen'
import ContactScreen from './screens/ContactScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import AboutScreen from './screens/AboutScreen';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/signup' element={<SignupScreen />} />
        <Route exact path='/' element={<HomeScreen />} />
        <Route path='/contact' element={<ContactScreen />} />
        <Route path='/feedback' element={<FeedbackScreen />} />
        <Route path='/about' element={<AboutScreen />} />
      </Routes>
    </Router>
  )
}

export default App