import React from "react";
import { NavLink } from "react-router-dom";

export const CoachNav = () => {
  // const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  // const id = loggedIn.id;
  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out");
    window.location.assign("/home");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-fixed-top bg-dark justify-content-between">
        <div className="d-flex">
          <NavLink
            to="/coachhome"
            className="navbar-brand text-light fw-bold mx-2"
          >
            WeCare
          </NavLink>
        </div>
        <div className="d-flex">
          <NavLink
            to="/coachviewprofile"
            className="nav-link text-light "
          >
            <i className="bi bi-person-fill"></i>View Profile
          </NavLink>
          <NavLink
            to="/coachschedules"
            className="nav-link text-light "
          >
            <i className="bi bi-list-ul"></i>My Schedules
          </NavLink>

          <span className="text-white my-2 mx-2">
            {" "}
            <i className="bi bi-telephone"></i> Call Us: 080 2233447
          </span>
          <span
            className="text-light my-2 mx-2 logout-btn"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>LogOut
          </span>
        </div>
      </nav>
    </div>
  );
};
