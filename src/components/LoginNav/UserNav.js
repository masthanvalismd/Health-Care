import React from "react";
import { NavLink } from "react-router-dom";

export const UserNav = () => {
  // const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  // const id = loggedIn.id;
  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out");
    window.location.assign("/home");
  };
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand-lg navbar-fixed-top bg-dark justify-content-between">
        <div className="d-flex">
          <NavLink
            to="/userhome"
            className="navbar-brand text-light fw-bold mx-2"
          >
            WeCare
          </NavLink>
        </div>
        <div className="d-flex">
          <NavLink
            to="/userviewprofile"
            className="nav-link text-light "
          >
            <i className="bi bi-person-fill"></i>View Profile
          </NavLink>
          <NavLink
            to="/userappointments"
            className="nav-link text-light "
          >
            <i className="bi bi-list-ul"></i>My Appointments
          </NavLink>

          <span className="text-white my-2 ">
            {" "}
            <i className="bi bi-telephone"></i> Call Us: 080 2233447
          </span>
          <span
            className="text-light mx-2 my-2 logout-btn"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>LogOut
          </span>
        </div>
      </nav>
    </div>
  );
};
