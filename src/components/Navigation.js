import React from "react";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <React.Fragment>
      <div className="navigation">
        <nav className="navbar navbar-expand-lg navbar-fixed-top bg-dark justify-content-between">
          <div className="d-flex">
            <NavLink to="home" className="navbar-brand text-light fw-bold mx-2">
              WeCare
            </NavLink>
          </div>
          <div>
            <span className="text-white my-2 ">
              {" "}
              <i className="bi bi-telephone"></i> Call Us: 080 2233447
            </span>
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};