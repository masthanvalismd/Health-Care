import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./components/Home";
import { CoachRegister } from "./components/Coach/CoachRegister";
import { CoachLogin } from "./components/Coach/CoachLogin";
import { UserRegister } from "./components/User/UserRegister";
import { UserLogin } from "./components/User/UserLogin";
import { CoachHome } from "./components/Coach/CoachHome";
import { CoachNav } from "./components/LoginNav/CoachNav";
import { UserNav } from "./components/LoginNav/UserNav";
import { Navigation } from "./components/Navigation";
import { CoachProfile } from "./components/Coach/CoachProfile";
import { UserHome } from "./components/User/UserHome";
import { UserProfile } from "./components/User/UserProfile";
import { UserAppointment } from "./components/User/UserAppointment";
import { NotFound } from "./components/NotFound";

function App() {
  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  // console.log(loggedIn);
  return (
    <Router>
      <React.Fragment>
        <div className="navigation">
          {loggedIn ? (
            loggedIn.name === "coach" ? (
              <CoachNav />
            ) : (
              <UserNav />
            )
          ) : (
            <Navigation />
          )}
        </div>
        <div className="router-container">
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="coachsignup" element={<CoachRegister />} />
            <Route path="coachlogin" element={<CoachLogin />} />
            <Route path="usersignup" element={<UserRegister />} />
            <Route path="userlogin" element={<UserLogin />} />
            <Route path="coachhome" element={<CoachHome />} />
            <Route path="userhome" element={<UserHome />} />
            <Route path="coachviewprofile" element={<CoachProfile />} />
            <Route path="userviewprofile" element={<UserProfile />} />
            <Route path="coachschedules" element={<CoachHome />} />
            <Route path="userappointments" element={<UserAppointment />} />
            <Route path="" element={<Navigate to={"/home"} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <footer className="nav-footer text-center bg-dark">
          <span className="text-white-50">
            Copyright &copy; 2022 Civil Finloan All Rights Reserved
          </span>
        </footer>
      </React.Fragment>
    </Router>
  );
}

export default App;