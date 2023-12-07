import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ activeLink }) => {
  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 ps bg-default "
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <i
          className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i>
        <Link className="navbar-brand m-0" to="/" target="_blank">
          <span className="ms-1 font-weight-bold styled-font h3">
            Sports Pulse
          </span>
        </Link>
      </div>
      <hr className="horizontal dark mt-0" />
      <div
        className="collapse navbar-collapse  w-auto "
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className={`nav-link ${activeLink === "Dashboard" && "active"}`}
              to="/dashboard"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${activeLink === "Countries" && "active"}`}
              to="/countries"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-calendar-grid-58 text-danger text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Countries</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${activeLink === "Sports" && "active"}`}
              to="/sports"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-calendar-grid-58 text-danger text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Sports</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${activeLink === "Tournaments" && "active"}`}
              to="/tournaments"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-calendar-grid-58 text-danger text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Tournaments</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${activeLink === "Teams" && "active"}`}
              to="/teams"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-calendar-grid-58 text-danger text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Teams</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${activeLink === "Players" && "active"}`}
              to="/players"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-calendar-grid-58 text-danger text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Players</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${activeLink === "Matches" && "active"}`}
              to="/matches"
            >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-calendar-grid-58 text-danger text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Matches</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
