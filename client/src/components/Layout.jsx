import React from "react";
import Sidebar from "./SideBar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
import Alert from "./Alert";

const Layout = ({ auth: { name }, logout, children, activeLink }) => {
  return (
    <div>
      <Sidebar activeLink={activeLink} />
      <main className="main-content position-relative border-radius-lg ">
        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl "
          id="navbarBlur"
          data-scroll="false"
        >
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm">
                  <span className="opacity-5 text-white">Pages</span>
                </li>
                <li
                  className="breadcrumb-item text-sm text-white active"
                  aria-current="page"
                >
                  {activeLink}
                </li>
              </ol>
              <h6 className="font-weight-bolder text-white mb-0">
                {activeLink}
              </h6>
            </nav>
            <div
              className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
              id="navbar"
            >
              <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
              <ul className="navbar-nav justify-content-end">
                <li
                  className="nav-item d-flex align-items-center"
                  style={{ marginRight: 15 }}
                >
                  <Link
                    to="/"
                    className="nav-link text-white font-weight-bold px-0"
                  >
                    <i className="fa fa-user me-sm-1"></i>
                    <span
                      className="d-sm-inline d-none"
                      style={{ marginLeft: 5 }}
                    >
                      {name}
                    </span>
                  </Link>
                </li>
                <li className="nav-item  d-flex align-items-center">
                  <button
                    onClick={() => logout()}
                    className="nav-link btn btn-transparent pt-4 text-white font-weight-bold px-0"
                  >
                    <span className="d-sm-inline d-none">Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid py-4">
          <Alert />
          {children}
        </div>
      </main>
    </div>
  );
};

Layout.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Layout);
