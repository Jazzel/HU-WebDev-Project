import React from "react";
import Footer from "./Footer";
import Sidebar from "./SideBar";
import { Link } from "react-router-dom";
import { logOut } from "../App";

const Layout = ({ children, activeLink }) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Sidebar activeLink={activeLink} />
        <div className="w-100 m-0 p-0">
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
              <div className="navbar-nav">
                <Link className="nav-link active" aria-current="page" to="/">
                  {activeLink}
                </Link>
              </div>
              <button onClick={() => logOut()}>Logout</button>
            </div>
          </nav>
          <section className="container p-4">
            {children}
            {/* <Footer /> */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Layout;
