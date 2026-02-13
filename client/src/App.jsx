import { useEffect, useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import axios from 'axios';
import CreateProblem from './pages/CreateProblem';
import ProblemSolvePage from './pages/ProblemSolvePage';

function App() {

  // const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Make an API call to validate the token and get user info
          const response = await axios.get('http://localhost:3000/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setIsLoggedIn(true);
        } catch (error) {
          // Invalid token, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          // alert('yo')
          window.location.href = '/login';
        }
      }
      else {
        if (window.location.pathname != '/login') {
          window.location.href = '/login';
          // console.log(window.location.pathname);
        }
      }
    };

    loadUserFromStorage();
  }, []);

  return (
    <>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        {/*Implementing Routes for respective Path */}

        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/home" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route index path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/create-problem" element={<CreateProblem />} />
          <Route path="/problems/:slug" element={<ProblemSolvePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
