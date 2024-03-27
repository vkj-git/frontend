import React, { useState, useContext } from "react";

import { LoginContext } from "../../common/components/context";

import "./Login.css";

const Register = () => {
  const loggedin = useContext(LoginContext);
  const [error, setError] = useState(null);
  const [newlogin, setNewlogin] = useState({
    name:"",
    email: "",
    password: "",
  });
  const submitHandler = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await fetch(
        "https://backend-nine-liard-28.vercel.app/api/users/register",
        {
          //const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name:newlogin.name,
            email: newlogin.email,
            password: newlogin.password,
          }),
        }
      );
      const responseData = await response.json();
      console.log("register page :", responseData);
      if (!response.ok) {
        // console.log(responseData);
        throw new Error(responseData.message);
      }
      loggedin.login(responseData.message._id);
    } catch (err) {
      alert(err.message, () => {
        setError(null);
      });
      setError(err.message);
    }
  };
  const changeHandler = (event) => {
    const inputname = event.target.name;
    const newValue = event.target.value;

    setNewlogin((previousValue) => {
      if (inputname === "newloginemail") {
        return {
          name :previousValue.name,
          email: newValue,
          password: previousValue.password,
        };
      } else if (inputname === "newloginpassword") {
        return {
          email: previousValue.email,
          name :previousValue.name,
          password: newValue,
        };
      }else if (inputname === "newloginname") {
        return {
          email: previousValue.email,
          name:newValue,
          password: previousValue.password,
        };
      }

    });
  };
  return (
    <form className="login-form" onSubmit={submitHandler}>
      <div className="form-control">
        <label>
          Enter Name
          <input
            name="newloginname"
            type="text"
            required
            onChange={changeHandler}
          />
        </label>
      </div>
      <div className="form-control">
        <label>
          Enter Email
          <input
            name="newloginemail"
            type="email"
            required
            onChange={changeHandler}
          />
        </label>
      </div>

      <div className="form-control">
        <label>
          Password
          <input
            name="newloginpassword"
            type="password"
            required
            onChange={changeHandler}
          />
        </label>
      </div>
      <div className="form-control">
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default Register;
