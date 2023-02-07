import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  const id = loggedIn.id;
  const [user, setUser] = useState(null);
  const [errMsg, setErrMsg] = useState();

  const getUser = () => {
    fetch("http://localhost:1050/users", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((usr) => setUser(usr))
      .catch((err) => {
        if (err.response === undefined) {
          setErrMsg("Please start your JSON server");
        } else if (err.response === 404) {
          setErrMsg("Could not fetch the data");
        }
      });
  };
  useEffect(getUser, []);
  // console.log(coach);
  return user ? (
    <Profile user={user} id={id} />
  ) : (
    <p className="text-danger text-center">{errMsg}</p>
  );
};

function Profile({ user, id }) {
  const userData = user.find((usr) => usr.id === id);
  const navigate = useNavigate();

  // console.log(coachData)
  return (
    <div
      className="card bg-dark mx-auto my-5 d-flex flex-row"
      style={{ width: "30rem" }}
    >
      <div>
        <img
          className="p-2 my-5"
          src={
            userData.gender === "F" ? "/images/female.png" : "/images/male.png"
          }
          alt="gender-logo"
          style={{ width: "200px", borderRadius: "50%" }}
        />
      </div>
      <div className="text-white my-3 p-4">
        <h3>{userData.name}</h3>
        <span>Date of Birth: {userData.dateOfBirth}</span>
        <br />
        <span>Email Id: {userData.email}</span>
        <br />
        <span>Mobile No: {userData.mobileNumber}</span>
        <br />
        <span>
          Address: {userData.city}, {userData.state}, {userData.country}
        </span>
        <br />
        <span>Pincode: {userData.pincode}</span>
        <br />
        <div className="float-end mt-3 ">
          <button
            className="btn btn-info px-5 text-white"
            onClick={() => navigate("/userhome")}
          >
            <i className="bi bi-arrow-left "></i>Go back
          </button>
        </div>
      </div>
    </div>
  );
}
