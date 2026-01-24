import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        {/*Implementing Routes for respective Path */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
