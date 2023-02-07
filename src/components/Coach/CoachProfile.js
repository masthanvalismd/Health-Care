import React, { useEffect, useState } from "react";

export const CoachProfile = () => {
  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  const id = loggedIn.id;
  const [coach, setCoach] = useState(null);
  const [errMsg, setErrMsg] = useState();

  const getCoach = () => {
    fetch("http://localhost:1050/coaches", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((coach) => setCoach(coach))
      .catch((err) => {
        if (err.response === undefined) {
          setErrMsg("Please start your JSON server");
        } else if (err.response === 404) {
          setErrMsg("Could not fetch the data");
        }
      });
  };
  useEffect(getCoach, []);
  // console.log(coach);
  return coach ? (
    <Profile coach={coach} id={id} />
  ) : (
    <p className="text-danger text-center">{errMsg}</p>
  );
};

function Profile({ coach, id }) {
  const coachData = coach.find((coach) => coach.id === id);
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
            coachData.gender === "F" ? "/images/female.png" : "/images/male.png"
          }
          alt="gender-logo"
          style={{ width: "200px", borderRadius: "50%" }}
        />
      </div>
      <div className="text-white my-5 p-4">
        <h3>Coach Id: {coachData.id}</h3>
        <span>Date of Birth: {coachData.dateOfBirth}</span>
        <br />
        <span>Mobile No: {coachData.mobileNumber}</span>
        <br />
        <span>Speciality: {coachData.speciality}</span>
        <br />
      </div>
    </div>
  );
}
