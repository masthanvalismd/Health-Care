import React, { useEffect, useState } from "react";

export const CoachHome = () => {
  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  const id = loggedIn.id;
  const [coach, setCoach] = useState(null);
  const [errMsg, setErrMsg] = useState();

  const getCoach = () => {
    fetch("http://localhost:1050/bookings", {
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
    <Coach coach={coach} id={id} />
  ) : (
    <p className="text-danger text-center">{errMsg}</p>
  );
};

function Coach({ coach, id }) {
  const coachData = coach.filter((coach) => coach.coachId === id);
  // console.log(coachData);
  return (
    <div>
      {coachData.length > 0 ? (
        <div>
          {coachData.map((coach) => (
            <div
              className="card bg-dark mx-auto my-5 "
              style={{ width: "18rem" }}
              key={coach.id}
            >
              <div className="card-body text-center text-white">
                <h4>Appointment Date: {coach.appointmentDate}</h4>
                <h5>Slot :{coach.slot}</h5>
                <br />
                <p>Booking Id: {coach.id}</p>
                <p>User Id :{coach.userId}</p>
              </div>
            </div>
          ))}
          <br/>
        </div>
      ) : (
        <div className="text-center my-5">
          <img
            src="/images/Notepad.png"
            alt="Notepad"
            style={{ width: "130px" }}
          />
          <h3 className="my-3">No Planned</h3>
          <h3>Scheduled yet</h3>
        </div>
      )}
    </div>
  );
}
