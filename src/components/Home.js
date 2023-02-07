import React from "react";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container my-4 ">
      <h1 className="text-center font-monospace">
        We are at the Heart of Appropriate Care
      </h1>
      <div className="my-5 d-flex justify-content-evenly">
        <div
          className="card bg-dark "
          style={{ width: "20rem", borderRadius: "10px" }}
        >
          <img
            src="images/LifeCoachLogIn.jpg"
            className="card-img-top p-4 mx-auto"
            alt="Images"
            style={{ width: "200px" }}
          />
          <button
            className="btn btn-info mx-3 mb-4"
            onClick={() => navigate("/coachlogin")}
          >
            Login as a Coach
          </button>
          <button
            className="btn btn-info mx-3 mb-5"
            onClick={() => navigate("/coachsignup")}
          >
            Join as a Coach
          </button>
        </div>
        <div
          className="card bg-dark"
          style={{ width: "20rem", borderRadius: "10px" }}
        >
          <img
            src="images/UserLogin.jpg"
            className="card-img-top p-4 mx-auto"
            alt="Images"
            style={{ width: "200px" }}
          />
          <button
            className="btn btn-info mx-3 mb-4"
            onClick={() => navigate("/userlogin")}
          >
            Login as a user
          </button>
          <button
            className="btn btn-info mx-3 mb-5"
            onClick={() => navigate("/usersignup")}
          >
            Join as a user
          </button>
        </div>
      </div>
    </div>
  );
};