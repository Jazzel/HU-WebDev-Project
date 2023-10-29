import React, { useState } from "react";
import axios from "../../axios";
import { useNavigate, useParams } from "react-router-dom";

const EmailCode = () => {
  const { email, code } = useParams();

  const [formData, setFormData] = useState({
    code,
    email,
  });

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("/verify-code/", formData);

    if (response.status === 200) {
      navigate(`/change-password/${response.data.user}`);
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
        <h4>Code Verification</h4>

        <form className="p-5 w-75" onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              id="code"
              name="code"
              required
              onChange={(e) => onChange(e)}
              value={formData.code}
              placeholder="Enter code"
            />
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailCode;
