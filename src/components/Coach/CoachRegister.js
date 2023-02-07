import React, { useState } from "react";

export const CoachRegister = () => {
  const [coach, setCoach] = useState({
    name: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
    speciality: "",
  });
  const [errName, setErrName] = useState();
  const [errPass, setErrPass] = useState();
  const [errNum, setErrNum] = useState();
  const [errSpec, setErrSpec] = useState();
  const [succMsg, setSuccMsg] = useState();
  const [errMsg, setErrMsg] = useState();
  const [validName, setValidName] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [validNum, setValidNum] = useState(false);
  const [validSpec, setValidSpec] = useState(false);
  const [validBtn, setValidBtn] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const tempCoach = Object.assign({}, coach, {
      [name]: value,
    });
    setCoach(tempCoach);
    validateField(name, value);
    buttonActive();
  };
  // console.log(coach);
  const handleNumberChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let number = parseInt(event.target.value);
    let tempNum = Object.assign({}, coach, { [name]: number });
    setCoach(tempNum);
    validateNum(name, value);
    buttonActive();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCoach = coach;
    fetch("http://localhost:1050/coaches", {
      method: "POST",
      body: JSON.stringify(newCoach),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then(() => setErrMsg(""))
      .then(() => setSuccMsg("Registered Successful"))
      .catch((error) => {
        if (error.response === undefined) {
          setErrMsg("Please Start Server");
        } else if (error.response.status === 404) {
          setErrMsg("Registration Failed");
        }
      });
  };

  var validateField = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        if (value === "") {
          setErrName("Field is required");
          setValidName(false);
        } else if (value.length < 3 || value.length > 50) {
          setErrName("	Name should have 3 to 50 characters");
          setValidName(false);
        } else {
          setErrName("");
          setValidName(true);
        }
        break;
      case "password":
        if (value === "") {
          setErrPass("Field is required");
          setValidPass(false);
        } else if (value.length < 5 || value.length > 10) {
          setErrPass("Password should have 5 to 10 characters");
          setValidPass(false);
        } else {
          setErrPass("");
          setValidPass(true);
        }
        break;
      case "speciality":
        if (value === "") {
          setErrSpec("Field is required");
          setValidSpec(false);
        } else if (value.length < 10 || value.length > 50) {
          setErrSpec("Speciality should have 10 to 50 characters");
          setValidSpec(false);
        } else {
          setErrSpec("");
          setValidSpec(true);
        }
        break;
      default:
        break;
    }
  };

  var validateNum = (fieldName, value) => {
    switch (fieldName) {
      case "mobileNumber":
        if (value === "") {
          setErrNum("Field is required");
          setValidNum(false);
        } else if (value.length !== 10) {
          setErrNum("Mobile Number should have 10 digits");
          setValidNum(false);
        } else {
          setErrNum("");
          setValidNum(true);
        }
        break;
      default:
        break;
    }
  };

  var buttonActive = () => {
    if (
      validName === true &&
      validPass === true &&
      validSpec === true &&
      validNum === true
    ) {
      setValidBtn(true);
    }else{
      setValidBtn(false);
    }
  };

  return (
    <React.Fragment>
      <div
        className="card bg-dark mx-auto my-5"
        style={{ width: "40rem", borderRadius: "10px" }}
      >
        <span className="text-white text-center mt-5 fs-2">
          <img
            src="images/life.jpg"
            alt="coach-logo"
            className="p-2"
            style={{ width: "60px" }}
          />
          Life Coach Profile
        </span>
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-row justify-content-around">
            <div>
              <div className="mb-3">
                <label className="form-label text-white" htmlFor="coach-name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="coach-name"
                  onChange={handleChange}
                />
                <span className="text-danger fs-6">{errName}</span>
              </div>
              <div className="mb-3">
                <label className="form-label text-white" htmlFor="dob">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="form-control"
                  id="dob"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-white" htmlFor="mob-no">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  className="form-control"
                  id="mob-no"
                  onChange={handleNumberChange}
                  required
                />
                <span className="text-danger fs-6">{errNum}</span>
              </div>
            </div>
            <div>
              <div className="mb-3">
                <label className="form-label text-white" htmlFor="coach-pass">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="coach-pass"
                  onChange={handleChange}
                  required
                />
                <span className="text-danger fs-6">{errPass}</span>
              </div>
              <div className="mb-3" name="gender" onChange={handleChange}>
                <label className="form-label text-white" htmlFor="gender-radio">
                  Gender
                </label>
                <br />
                <input
                  type="radio"
                  className="form-check-input"
                  name="gender"
                  value="M"
                  id="genderm"
                  required
                />
                <label
                  className="form-check-label text-white mx-2"
                  htmlFor="genderm"
                >
                  Male
                </label>
                <input
                  type="radio"
                  className="form-check-input"
                  name="gender"
                  id="genderf"
                  value="F"
                />
                <label
                  className="form-check-label text-white mx-2"
                  htmlFor="genderf"
                >
                  Female
                </label>
              </div>
              <div className="my-4">
                <label
                  className="form-label text-white"
                  htmlFor="coach-speciality"
                >
                  Speciality
                </label>
                <input
                  type="text"
                  name="speciality"
                  className="form-control"
                  id="coach-speciality"
                  onChange={handleChange}
                  required
                />
                <span className="text-danger fs-6">{errSpec}</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <input
              type="submit"
              disabled={!validBtn}
              className="btn btn-success px-5 my-4"
              value="Register"
            />
          </div>
        </form>
        <div className="text-center">
          <span
            name="successMessage"
            id="successMessage"
            className=" text-success"
          >
            {succMsg}
          </span>
          <span name="errorMessage" id="errorMessage" className=" text-danger">
            {errMsg}
          </span>
        </div>
      </div>
      <br/>
    </React.Fragment>
  );
};

