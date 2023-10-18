import { useState, useEffect } from "react";
import axios from "axios";
import "./assets/styles/global.css";
import NavBar from "./components/Navbar/NavBar";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Profile from "./pages/UserProfile/Profile";
import AddBeer from "./pages/AddBeer/AddBeer";
import BeerItem from "./pages/BeerItem/BeerItem";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext";
import { API_BASE_URL } from "./config";

function App() {
  const [isLoadingBackend, setIsLoadingBackend] = useState(true);

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/health`);
        if (response.status === 200) {
          setIsLoadingBackend(false);
        }
      } catch (error) {
        console.error("Error checking backend health:", error);
        setTimeout(checkBackendHealth, 5000); // Retry after 5 seconds if there's an error
      }
    };

    checkBackendHealth();
  }, []);

  if (isLoadingBackend) {
    return (
      <div className="loading-screen">
        <div
          style={{
            width: "100%",
            height: "0",
            paddingBottom: "53%",
            position: "relative",
          }}
        >
          <iframe
            src="https://giphy.com/embed/H1zMkFE3eY31Rg2XTn"
            width="100%"
            height="100%"
            style={{ position: "absolute" }}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <p>Just a minute while the server warms up...</p>
      </div>
    );
  }

  return (
    <Router>
      <UserProvider>
        <div className="grid">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="signup" element={<SignUp />}></Route>
            <Route path="signin" element={<SignIn />}></Route>
            <Route path="addbeer" element={<AddBeer />}></Route>
            <Route path="beer/:id" element={<BeerItem />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
