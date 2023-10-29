import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios";
import { Link } from "react-router-dom";

const Teams = () => {
  const [teams, getTeams] = useState([]);
  const getData = async () => {
    const response = await axios.get(`/teams`);
    getTeams(response.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    const answer = window.confirm("Are you sure you want to delete ? ");
    if (answer) {
      const response = await axios.delete(`/teams/${id}`);

      if (response.status === 200) {
        alert("Team Deleted !");
        getData();
      }
    }
  };
  return (
    <Layout activeLink={"Teams"}>
      <div className="row">
        <div className="col-12 col-md-7">
          <h3>Teams</h3>
        </div>
        <div
          className="col-12 col-md-5 d-flex"
          style={{ justifyContent: "flex-end" }}
        >
          <Link to="/teams/add" className="btn btn-dark m-1">
            <FontAwesomeIcon icon={faAdd} style={{ marginRight: 5 }} />
            Add more teams
          </Link>
        </div>
        <hr />
      </div>
      <table className="table  table-responsive table-striped dataTables">
        <thead className="table-dark ">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Coach</th>
            <th>Country</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.length > 0 &&
            teams.map((team, index) => {
              return (
                <tr key={team._id}>
                  <td>{index + 1}</td>
                  <td>{team.name}</td>
                  <td>{team.coach}</td>
                  <td>{team.country.name}</td>
                  <td>{team.state}</td>
                  <td>
                    <button className="btn btn-dark btn-sm">View</button> |{" "}
                    <Link
                      to={`/teams/edit/${team._id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>{" "}
                    |{" "}
                    <button
                      onClick={() => handleDelete(team._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
};

export default Teams;
