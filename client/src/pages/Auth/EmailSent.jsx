import React from "react";

const EmailSent = () => {
  return (
    <div className="row" style={{ height: "100vh", overflow: "hidden" }}>
      <div className="col-12 col-md-6 bg-dark"></div>
      <div
        className="col-12 col-md-6 d-flex justify-content-center align-items-center"
        style={{ flexDirection: "column" }}
      >
        <h1 className="styled-font">Sports Pulse</h1>
        <br />
        <h4>Email Sent</h4>
        <br />
        <p className="w-50 text-center">
          A verification code has been sent to your registered email with a link
          to change your password.
        </p>
      </div>
    </div>
  );
};

export default EmailSent;
