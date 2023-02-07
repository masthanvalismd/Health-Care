import React, { useState } from "react";

export const UserRegister = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    mobileNumber: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });
  const [errName, setErrName] = useState();
  const [errPass, setErrPass] = useState();
  const [errNum, setErrNum] = useState();
  const [errPin, setErrPin] = useState();
  const [errState, setErrState] = useState();
  const [errCity, setErrCity] = useState();
  const [errCountry, setErrCountry] = useState();
  const [succMsg, setSuccMsg] = useState();
  const [errMsg, setErrMsg] = useState();
  const [validName, setValidName] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [validNum, setValidNum] = useState(false);
  const [validPin, setValidPin] = useState(false);
  const [validState, setValidState] = useState(false);
  const [validCity, setValidCity] = useState(false);
  const [validCountry, setValidCountry] = useState(false);
  const [validBtn, setValidBtn] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const tempUser = Object.assign({}, user, {
      [name]: value,
    });
    setUser(tempUser);
    validateField(name, value);
    buttonActive();
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
      case "city":
        if (value === "") {
          setErrCity("Field is required");
          setValidCity(false);
        } else if (value.length < 6 || value.length > 20) {
          setErrCity("City should have 6 to 20 characters");
          setValidCity(false);
        } else {
          setErrCity("");
          setValidCity(true);
        }
        break;
      case "state":
        if (value === "") {
          setErrState("Field is required");
          setValidState(false);
        } else if (value.length < 6 || value.length > 20) {
          setErrState("State should have 6 to 20 characters");
          setValidState(false);
        } else {
          setErrState("");
          setValidState(true);
        }
        break;
      case "country":
        if (value === "") {
          setErrCountry("Field is required");
          setValidCountry(false);
        } else if (value.length < 6 || value.length > 20) {
          setErrCountry("Country should have 6 to 20 characters");
          setValidCountry(false);
        } else {
          setErrCountry("");
          setValidCountry(true);
        }
        break;
      default:
        break;
    }
  };
  const handleNumberChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let number = parseInt(event.target.value);
    let tempNum = Object.assign({}, user, { [name]: number });
    setUser(tempNum);
    validateNum(name, value);
    buttonActive();
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
      case "pincode":
        if (value === "") {
          setErrPin("Field is required");
          setValidPin(false);
        } else if (value.length !== 6) {
          setErrPin("Mobile Number should have 10 digits");
          setValidPin(false);
        } else {
          setErrPin("");
          setValidPin(true);
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
      validNum === true &&
      validPin === true &&
      validState === true &&
      validCity === true &&
      validCountry === true
    ) {
      setValidBtn(true);
    } else {
      setValidBtn(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = user;
    fetch("http://localhost:1050/users", {
      method: "POST",
      body: JSON.stringify(newUser),
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
  return (
    <React.Fragment>
      <div
        className="card bg-dark mx-auto my-5 user-register-card"
        style={{ width: "30rem", borderRadius: "10px" }}
      >
        <span className="text-white text-center mt-5 fs-3">
          <img
            src="images/UserLogin.jpg"
            alt="coach-logo"
            className="p-2"
            style={{ width: "60px" }}
          />
          User Profile
        </span>
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-row justify-content-around">
            <div>
              <div className="mb-3">
                <label className="form-label text-white" htmlFor="user-name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="user-name"
                  onChange={handleChange}
                />
                <span className="text-danger fs-6">{errName}</span>
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
                />
                <span className="text-danger fs-6">{errNum}</span>
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
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-white" htmlFor="pincode">
                  Pincode
                </label>
                <input
                  type="number"
                  name="pincode"
                  className="form-control"
                  id="pincode"
                  onChange={handleNumberChange}
                />
                <span className="text-danger fs-6">{errPin}</span>
              </div>
              <div className="mb-3">
                <label className="form-label text-white" htmlFor="state">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  className="form-control"
                  id="state"
                  onChange={handleChange}
                />
                <span className="text-danger fs-6">{errState}</span>
              </div>
            </div>
            <div>
              <div className="mb-3">
                <label className="form-label text-white" htmlFor="user-pass">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="user-pass"
                  onChange={handleChange}
                />
                <span className="text-danger fs-6">{errPass}</span>
              </div>
              <div className="mb-3">
                <label className="form-label text-white" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4" name="gender" onChange={handleChange}>
                <label className="form-label text-white" htmlFor="gender-radio">
                  Gender
                </label>
                <br />
                <input
                  type="radio"
                  className="form-check-input"
                  name="gender"
                  id="genderm"
                  value="M"
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
                <label className="form-label text-white" htmlFor="city">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  id="city"
                  onChange={handleChange}
                />
                <span className="text-danger fs-6">{errCity}</span>
              </div>
              <div className="mb-3">
                <label className="form-label text-white" htmlFor="country">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  className="form-control"
                  id="country"
                  onChange={handleChange}
                />
                <span className="text-danger fs-6">{errCountry}</span>
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
      <br />
      <br />
    </React.Fragment>
  );
};
