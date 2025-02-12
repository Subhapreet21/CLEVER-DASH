import React, { useState } from "react";
import "./Authentication.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Authentication = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [Mode, setMode] = useState(false);

  function handleLoginSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3547/users")
      .then((res) => {
        if (res.ok) {
          setFormRegisterData({ name: "", username: "", password: "" });
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((users) => {
        const user = users.find(
          (user) =>
            user.username === formData.username &&
            user.password === formData.password
        );
        if (user) {
          toast.success("Login Successful");
          navigate("/dashboard");
          localStorage.setItem("Name", user.username);
          localStorage.setItem("Role", user.role);
          setAuthenticated(true); // Set authentication status to true
        } else {
          toast.error("Invalid Username or Password.");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
        toast.error("Login failed");
      });
  }

  function handleLoginChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const [formRegisterData, setFormRegisterData] = useState({
    role: "",
    username: "",
    password: "",
  });

  function handleRegisterSubmit(e) {
    e.preventDefault();
    if (!formRegisterData.role) {
      toast.error("Please select a role.");
      return;
    }
    fetch("http://localhost:3547/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formRegisterData),
    })
      .then((res) => {
        if (res.ok) {
          setFormData({ username: "", password: "" });
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        toast.success("Registered Successfully.");
        setMode(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Register failed");
      });
  }

  function handleRegisterChange(e) {
    const { name, value } = e.target;
    setFormRegisterData({ ...formRegisterData, [name]: value });
  }

  return (
    <div
      className="container"
      style={{ height: "100vh", width: "200vh", backgroundColor: "#3631B3" }}
    >
      <div className="in">
        <h2 style={{ color: "#FBC903", fontSize: "25px" }}>CLEVER-DASH</h2>
      </div>
      <div className="container">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />
          <div className="login">
            <form className="form" onSubmit={handleLoginSubmit}>
              <label htmlFor="chk" aria-hidden="true">
                Log in
              </label>
              <input
                className="input"
                type="text"
                autoComplete="off"
                name="username"
                value={formData.username}
                onChange={handleLoginChange}
                placeholder="Username"
                required
              />
              <input
                className="input"
                type="password"
                autoComplete="off"
                name="password"
                value={formData.password}
                onChange={handleLoginChange}
                placeholder="Password"
                required
              />
              <button>Log in</button>
            </form>
          </div>
          <div className="register">
            <form className="form" onSubmit={handleRegisterSubmit}>
              <label htmlFor="chk" aria-hidden="true">
                Register
              </label>
              <select
                name="role"
                value={formRegisterData.role}
                onChange={handleRegisterChange}
                placeholder="Select Role"
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
              </select>
              <input
                className="input"
                type="text"
                autoComplete="off"
                name="username"
                value={formRegisterData.username}
                onChange={handleRegisterChange}
                placeholder="Username"
                required
              />
              <input
                className="input"
                type="password"
                autoComplete="off"
                name="password"
                value={formRegisterData.password}
                onChange={handleRegisterChange}
                placeholder="Password"
                required
              />
              <button>Register</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Authentication;
