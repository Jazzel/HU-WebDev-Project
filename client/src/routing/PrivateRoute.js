import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ auth: { isAuthenticated, loading }, children }) => {
  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PrivateRoute);