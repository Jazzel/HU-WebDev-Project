import React, { useState } from "react";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("/auth/", formData);

    if (response.status === 200) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
          token: response.data.token,
          isAuthenticated: true,
        })
      );

      navigate("/dashboard");
    } else {
      alert("Invalid credentials !");
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="row" style={{ height: "100vh", overflow: "hidden" }}>
      <div className="col-12 col-md-6 bg-dark"></div>
      <div
        className="col-12 col-md-6 d-flex justify-content-center align-items-center"
        style={{ flexDirection: "column" }}
      >
        <h1 className="styled-font">Sports Pulse</h1>
        <br />
        <h4>Login</h4>

        <form className="p-5 w-75" onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              required
              onChange={(e) => onChange(e)}
              value={formData.email}
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              required
              onChange={(e) => onChange(e)}
              value={formData.password}
              placeholder="Enter password"
            />
          </div>
          <div className="mt-2">
            <Link className="text-dark" to="/register">
              New here? Register here.
            </Link>
          </div>
          <br />
          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>
          <center>
            <small>
              <Link className="text-dark" to="/forgot-password">
                Forgot password? Click here.
              </Link>
            </small>
          </center>
        </form>
      </div>
    </div>
  );
};

export default Login;
