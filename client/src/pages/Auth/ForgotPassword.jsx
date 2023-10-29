import React, { useState } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("/reset-password/", formData);

    if (response.status === 200) {
      navigate("/email-sent");
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
        <h4>Forgot Password</h4>

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

          <button type="submit" className="btn btn-dark w-100">
            Send email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
