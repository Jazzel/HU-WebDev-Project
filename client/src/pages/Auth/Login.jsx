import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import image from "../../assets/img/annie-spratt-jY9mXvA15W0-unsplash.jpg";

import { login } from "../../actions/auth";
import PropTypes from "prop-types";

import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import Alert from "../../components/Alert";

const Login = ({ login, setAlert, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await login(formData.email, formData.password);

    console.log(response);
    if (response.status === 200) {
      navigate("/dashboard");
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="row" style={{ height: "100vh", overflow: "hidden" }}>
      <div
        className="col-12 col-md-6 "
        style={{
          background: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        className="col-12 col-md-6 d-flex justify-content-center align-items-center"
        style={{ flexDirection: "column" }}
      >
        <h1 className="styled-font">Sports Pulse</h1>
        <br />
        <h4>Login</h4>

        <form className="p-5 w-75" onSubmit={(e) => onSubmit(e)}>
          <Alert />

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
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, setAlert })(Login);
