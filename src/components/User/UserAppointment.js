import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserAppointment = () => {
  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  const id = loggedIn.id;
  const [appointments, setAppointments] = useState(null);
  const [errMsg, setErrMsg] = useState();

  const getAppointments = () => {
    fetch("http://localhost:1050/bookings", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((apts) => setAppointments(apts))
      .catch((err) => {
        if (err.response === undefined) {
          setErrMsg("Please start your JSON server");
        } else if (err.response === 404) {
          setErrMsg("Could not fetch the data");
        }
      });
  };
  useEffect(getAppointments, []);
  // console.log(appointments);
  return appointments ? (
    <Appointments appointments={appointments} id={id} />
  ) : (
    <p className="text-danger text-center">{errMsg}</p>
  );
};

function Appointments({ appointments, id }) {
  const [deleted, setDeleted] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState();
  const [slot, setSlot] = useState();
  const [bookingId, setBookingId] = useState();
  const [userId, setUserId] = useState();
  const [coachId, setCoachId] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const appointmentsData = appointments.filter((apts) => apts.userId === id);
  // console.log(appointmentsData);

  const deleteAppointment = (id) => {
    fetch(`http://localhost:1050/bookings/${id}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then(() => setDeleted(true));
  };
  const goBack = () => {
    window.location.reload();
  };
  const RescheduleAppointment = (bId, uId, cId) => {
    setReschedule(true);
    setBookingId(bId);
    setUserId(uId);
    setCoachId(cId);
  };
  const handleChangeDate = (event) => {
    setAppointmentDate(event.target.value);
  };
  const handleChangeSlot = (event) => {
    setSlot(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedBookings = { appointmentDate, slot, userId, coachId };
    fetch(`http://localhost:1050/bookings/${bookingId}`, {
      method: "PUT",
      body: JSON.stringify(updatedBookings),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then(() => setIsSuccess(true));
  };
  if (deleted) {
    return (
      <div
        className="card bg-dark mx-auto my-5 text-white text-center"
        style={{ width: "30rem", borderRadius: "10px" }}
      >
        <p className="mt-5">Your Appointment is Cancelled Successfully</p>
        <div className="my-4">
          <button onClick={goBack} className="btn btn-info text-white">
            <i className="bi bi-arrow-left "></i>Go Back
          </button>
        </div>
      </div>
    );
  }
  if (isSuccess) {
    return (
      <div
        className="card bg-dark mx-auto my-5 text-white text-center"
        style={{ width: "30rem", borderRadius: "10px" }}
      >
        <p className="mt-5">Your Appointment is Rescheduled Successfully</p>
        <div className="my-4">
          <button onClick={goBack} className="btn btn-info text-white">
            <i className="bi bi-arrow-left "></i>Go Back
          </button>
        </div>
      </div>
    );
  }
  if (reschedule) {
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
              Reschedule your Appointment
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
      {appointmentsData.length > 0 ? (
        <div>
          <div className="coach-container">
            {appointmentsData.map((apts) => (
              <div
                className="card bg-dark mx-auto my-5 "
                style={{ width: "18rem" }}
                key={apts.id}
              >
                <div className="card-body text-center text-white">
                  <h4>Appointment Date: {apts.appointmentDate}</h4>
                  <h5>Slot :{apts.slot}</h5>
                  <br />
                  <span>Booking Id: {apts.id}</span>
                  <br />
                  <span>User Id :{apts.userId}</span>
                  <br />
                  <span>Coach Id :{apts.coachId}</span>
                  <br />

                  <div className="d-grid gap-2 mt-3">
                    <button
                      className="btn btn-info text-white"
                      type="button"
                      onClick={() =>
                        RescheduleAppointment(
                          apts.id,
                          apts.userId,
                          apts.coachId
                        )
                      }
                    >
                      Reschedule Appointment
                    </button>
                    <button
                      className="btn btn-danger"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Cancel Appointment
                    </button>
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-body text-dark">
                            Are you sure you need to cancel the appointment?
                          </div>
                          <div className="text-center my-3">
                            <button
                              type="button"
                              className="btn btn-success mx-2 px-5"
                              onClick={() => deleteAppointment(apts.id)}
                              data-bs-dismiss="modal"
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger mx-2 px-5"
                              data-bs-dismiss="modal"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              className="btn btn-info px-5 text-white"
              onClick={() => navigate("/userhome")}
            >
              <i className="bi bi-arrow-left "></i>Go back
            </button>
            <br />
            <br />
            <br />
          </div>
        </div>
      ) : (
        <div className="text-center my-5">
          <img
            src="/images/Notepad.png"
            alt="Notepad"
            style={{ width: "130px" }}
          />
          <h3 className="my-3">No Appointments</h3>
        </div>
      )}
    </div>
  );
}