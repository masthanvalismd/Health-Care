import React, { useEffect, useState } from "react";

export const UserHome = () => {
  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  const id = loggedIn.id;
  const [coach, setCoach] = useState(null);
  const [date, setDate] = useState();
  const [slot, setSlot] = useState();
  const [errMsg, setErrMsg] = useState();
  const [coachChosen, setCoachChosen] = useState(false);
  const [coachId, setCoachId] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const getCoaches = () => {
    fetch("http://localhost:1050/coaches", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((sam) => setCoach(sam))
      .catch((err) => {
        if (err.response === undefined) {
          setErrMsg("Please start your JSON server");
        } else if (err.response === 404) {
          setErrMsg("Could not fetch the data");
        }
      });
  };

  useEffect(getCoaches, []);

  const chooseCoach = (id) => {
    setCoachChosen(true);
    setCoachId(id);
  };
  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };
  const handleChangeSlot = (event) => {
    setSlot(event.target.value);
  };
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = coach.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(coach);
    }
  };
  // console.log(date, slot);
  const handleSubmit = (event) => {
    event.preventDefault();
    const newBooking = {
      appointmentDate: date,
      slot: slot,
      userId: id,
      coachId: coachId,
    };
    fetch("http://localhost:1050/bookings", {
      method: "POST",
      body: JSON.stringify(newBooking),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then(() => setIsSuccess(true))
      .then(() => setCoachChosen(false))
      .catch((error) => {
        if (error.response === undefined) {
          setErrMsg("Please Start Server");
        } else if (error.response.status === 404) {
          setErrMsg("Registration Failed");
        }
      });
  };
  const goBack = () => {
    setIsSuccess(false);
  };
  if (isSuccess) {
    return (
      <div
        className="card bg-dark mx-auto my-5 text-white text-center"
        style={{ width: "30rem", borderRadius: "10px" }}
      >
        <p className="mt-5">Your Appointment is scheduled Successfully</p>
        <div className="my-4">
          <button onClick={goBack} className="btn btn-info text-white">
            <i className="bi bi-arrow-left "></i>Go Back
          </button>
        </div>
      </div>
    );
  }
  if (coachChosen) {
    return (
      <div>
        <div
          className="card bg-dark mx-auto my-5 text-white"
          style={{ width: "38rem", borderRadius: "10px" }}
        >
          <div className="text-center mt-3">
            <p className="fs-3">
              <img
                src="/images/Notepad.png"
                alt="notepad-img"
                style={{ width: "40px", padding: "3px" }}
              />{" "}
              Proceed with your Appointment
            </p>
          </div>
          <div className="mx-3">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  className="form-label text-white"
                  htmlFor="appointmentDate"
                >
                  Date of Appointment
                </label>
                <input
                  type="date"
                  name="appointmentDate"
                  className="form-control"
                  id="appointmentDate"
                  onChange={handleChangeDate}
                  required
                />
              </div>
              <div className="mb-3 " name="slot" onClick={handleChangeSlot}>
                <label className="form-label text-white" htmlFor="slot-radio">
                  Preferred Slot
                </label>
                <br />
                <input
                  type="radio"
                  className="form-check-input"
                  name="slot"
                  value="9 AM to 10 AM"
                  id="1"
                  required
                />
                <label className="form-check-label text-white mx-2" htmlFor="1">
                  9 AM to 10 AM
                </label>
                <input
                  type="radio"
                  className="form-check-input"
                  name="slot"
                  id="2"
                  value="10 AM to 11 AM"
                />
                <label className="form-check-label text-white mx-2" htmlFor="2">
                  10 AM to 11 AM
                </label>
                <input
                  type="radio"
                  className="form-check-input"
                  name="slot"
                  id="3"
                  value="11 AM to 12 PM"
                />
                <label className="form-check-label text-white mx-2" htmlFor="3">
                  11 AM to 12 PM
                </label>
                <input
                  type="radio"
                  className="form-check-input"
                  name="slot"
                  id="4"
                  value="2 PM to 3 PM"
                />
                <label className="form-check-label text-white mx-2" htmlFor="4">
                  2 PM to 3 PM
                </label>
                <input
                  type="radio"
                  className="form-check-input"
                  name="slot"
                  id="5"
                  value="3 PM to 4 PM"
                />
                <label className="form-check-label text-white mx-2" htmlFor="5">
                  3 PM to 4 PM
                </label>
                <input
                  type="radio"
                  className="form-check-input"
                  name="slot"
                  id="6"
                  value="4 PM to 5 PM"
                />
                <label className="form-check-label text-white mx-2" htmlFor="6">
                  4 PM to 5 PM
                </label>
              </div>
              <div className="d-grid gap-2 my-5 mx-2">
                <input
                  type="submit"
                  className="btn btn-success"
                  value="Confirm Your Appointment"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="input-search">
        <input
          type="text"
          placeholder="Search by speciality"
          onChange={(e) => searchItems(e.target.value)}
        />
      </div>

      {coach && coach.length > 0 ? (
        <div className="coach-container">
          {searchInput.length > 1
            ? filteredResults.map((cch) => {
                return (
                  <div
                    className="card bg-white mx-auto my-5 d-flex flex-row"
                    style={{ width: "30rem", borderRadius: "10px" }}
                    key={cch.id}
                  >
                    <div>
                      <img
                        className="p-2 my-5 mx-2"
                        src={
                          cch.gender === "F"
                            ? "/images/female.png"
                            : "/images/male.png"
                        }
                        alt="gender-logo"
                        style={{ width: "150px", borderRadius: "50%" }}
                      />
                    </div>
                    <div className="my-3 mx-2">
                      <h3 className="">{cch.name}</h3>
                      <h5>Coach Id: {cch.id}</h5>
                      <span>Mobile No: {cch.mobileNumber}</span>
                      <br />
                      <span>Speciality: {cch.speciality}</span>
                      <div className="mt-4">
                        <button
                          className="btn btn-primary px-5"
                          onClick={() => chooseCoach(cch.id)}
                        >
                          Book an Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            : coach.map((cch) => (
                <div
                  className="card bg-white mx-auto my-5 d-flex flex-row"
                  style={{ width: "30rem", borderRadius: "10px" }}
                  key={cch.id}
                >
                  <div>
                    <img
                      className="p-2 my-5 mx-2"
                      src={
                        cch.gender === "F"
                          ? "/images/female.png"
                          : "/images/male.png"
                      }
                      alt="gender-logo"
                      style={{ width: "150px", borderRadius: "50%" }}
                    />
                  </div>
                  <div className="my-3 mx-2">
                    <h3 className="">{cch.name}</h3>
                    <h5>Coach Id: {cch.id}</h5>
                    <span>Mobile No: {cch.mobileNumber}</span>
                    <br />
                    <span>Speciality: {cch.speciality}</span>
                    <div className="mt-4">
                      <button
                        className="btn btn-primary px-5"
                        onClick={() => chooseCoach(cch.id)}
                      >
                        Book an Appointment
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          <br />
        </div>
      ) : (
        <div>
          <p className="text-danger text-center">{errMsg}</p>
        </div>
      )}
    </div>
  );
};
