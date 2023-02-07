import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserLogin = () => {
  const nav = useNavigate();
  const [users, setUsers] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [data, setData] = useState({
    id: "",
    password: "",
  });
  const [errId, setErrId] = useState();
  const [errPass, setErrPass] = useState();
  const [validID, setValidID] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [validBtn, setValidBtn] = useState(false);

  // console.log(data);

  const getUsers = () => {
    fetch("http://localhost:1050/users", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((usr) => setUsers(usr))
      .catch((err) => {
        if (err.response === undefined) {
          setErrMsg("Please start your JSON server");
        } else if (err.response === 404) {
          setErrMsg("Could not fetch the data");
        }
      });
  };
  useEffect(getUsers, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = users.find((usr) => usr.id === data.id);
    if (userData) {
      if (userData.id === data.id && userData.password === data.password) {
        localStorage.clear();
        var userObj = { name: "user", id: userData.id };
        localStorage.setItem("loggedIn", JSON.stringify(userObj));
        nav("/userhome");
        window.location.reload();
      } else {
        setErrMsg("Invalid Credentials!!");
      }
    }
  };

  const handleId = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let idNum = parseInt(event.target.value);
    let tempId = Object.assign({}, data, { [name]: idNum });
    setData(tempId);
    validateName(name, value);
    buttonActive();
  };

  const handlePass = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let tempPass = Object.assign({}, data, { [name]: value });
    setData(tempPass);
    validatePassword(name, value);
    buttonActive();
  };

  var validateName = (fieldName, value) => {
    switch (fieldName) {
      case "id":
        if (value === "") {
          setErrId("Field is required");
          setValidID(false);
        } else {
          setErrId("");
          setValidID(true);
        }
        break;
      default:
        break;
    }
  };

  var validatePassword = (fieldName, value) => {
    switch (fieldName) {
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
      default:
        break;
    }
  };

  var buttonActive = () => {
    if (validID === true && validPass === true) {
      setValidBtn(true);
    } else {
      setValidBtn(false);
    }
  };

  return (
    <React.Fragment>
      <div
        className="card bg-dark mx-auto my-5"
        style={{ width: "20rem", borderRadius: "10px" }}
      >
        <span className="text-white text-center my-4 fs-4">
          <img
            src="images/UserLogIn.jpg"
            alt="user-logo"
            className="p-2"
            style={{ width: "60px" }}
          />
          Login As User
        </span>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mx-2">
            <input
              type="text"
              name="id"
              className="form-control"
              id="user-id"
              placeholder="User Id"
              onChange={handleId}
            />
            <span className="text-danger fs-6">{errId}</span>
          </div>
          <div className="mb-3 mx-2">
            <input
              type="password"
              name="password"
              className="form-control"
              id="user-pass"
              placeholder="Password"
              onChange={handlePass}
            />
            <span className="text-danger fs-6">{errPass}</span>
          </div>
          <div className="d-grid gap-2 my-5 mx-2">
            <input
              type="submit"
              disabled={!validBtn}
              className="btn btn-primary px-5 "
              value="Login"
            />
          </div>
        </form>
        <div className="text-center">
          <span className="text-danger">{errMsg}</span>
        </div>
      </div>
    </React.Fragment>
  );
};
