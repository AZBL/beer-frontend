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

function App() {
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
