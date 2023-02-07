import React from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

  const goHome = () => {
    if (loggedIn) {
      if (loggedIn.name === "coach") {
        navigate("/coachhome");
      } else if (loggedIn.name === "user") {
        navigate("/userhome");
      }
    } else {
      navigate("/home");
    }
  };
  return (
    <div className="text-center">
      <div className="notFound">
        {/* <h2>404 Not Found</h2> */}
        <img
          className="notFoundImg"
          src="https://cdn-images-1.medium.com/max/800/1*qdFdhbR00beEaIKDI_WDCw.gif"
          alt="404 Gif"
        />
      </div>
      <div>
        <button className="btn btn-primary" onClick={goHome}>
          Go to Home
        </button>
      </div>
      <br />
    </div>
  );
};