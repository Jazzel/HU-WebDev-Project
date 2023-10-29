import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ activeLink }) => {
  return (
    <div
      style={{
        height: "100vh",
        overflow: "scroll initial",
        maxWidth: "280px",
        float: "left",
      }}
    >
      <CDBSidebar
        textColor="#fff"
        className="bg-dark"
        backgroundColor={""}
        breakpoint={0}
        toggled={false}
        minWidth={"100px"}
        maxWidth={"250px"}
      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <Link
            to="/"
            className="text-decoration-none styled-font"
            style={{ color: "inherit" }}
          >
            Sports Pulse
          </Link>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              to="/dashboard"
              className={activeLink === "Dashboard" ? "activeClicked" : ""}
            >
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/countries"
              className={activeLink === "Countries" ? "activeClicked" : ""}
            >
              <CDBSidebarMenuItem icon="columns">Countries</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/sports"
              className={activeLink === "Sports" ? "activeClicked" : ""}
            >
              <CDBSidebarMenuItem icon="columns">Sports</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/tournaments"
              className={activeLink === "Tournaments" ? "activeClicked" : ""}
            >
              <CDBSidebarMenuItem icon="columns">
                Tournaments
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/teams"
              className={activeLink === "Teams" ? "activeClicked" : ""}
            >
              <CDBSidebarMenuItem icon="columns">Teams</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/players"
              className={activeLink === "Players" ? "activeClicked" : ""}
            >
              <CDBSidebarMenuItem icon="columns">Players</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/matches"
              className={activeLink === "Matches" ? "activeClicked" : ""}
            >
              <CDBSidebarMenuItem icon="columns">Matches</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
