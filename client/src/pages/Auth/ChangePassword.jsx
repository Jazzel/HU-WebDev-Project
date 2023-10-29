import React, { useState } from "react";
import axios from "../../axios";
import { useNavigate, useParams } from "react-router-dom";

const ChangePassword = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id,
    password: "",
    password1: "",
  });

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (formData.password === formData.password1) {
      const response = await axios.post("/change-password/", formData);

      if (response.status === 200) {
        alert("Password changed !");
        navigate(`/login/`);
      } else {
        alert("Invalid credentials !");
      }
    } else {
      alert("Passwords don't match !");
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
        <h4>Change Password</h4>

        <form className="p-5 w-75" onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              required
              onChange={(e) => onChange(e)}
              value={formData.password}
              placeholder="Enter password"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Re-enter password</label>
            <input
              type="text"
              className="form-control"
              id="password1"
              name="password1"
              required
              onChange={(e) => onChange(e)}
              value={formData.password1}
              placeholder="Re-enter password"
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">
            Send email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
