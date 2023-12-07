import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios";
import { Link } from "react-router-dom";

const Teams = () => {
  const [teams, getTeams] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(`/teams`);
      getTeams(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const [filter, setFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const onChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value !== "") {
      setFilter(true);
      const filteredData = teams.filter(
        (match) =>
          match?.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          match?.coach.toLowerCase().includes(e.target.value.toLowerCase()) ||
          match?.country.toLowerCase().includes(e.target.value.toLowerCase()) ||
          match?.state.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredData(filteredData);
    } else {
      setFilter(false);
    }
  };

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
      <div className="d-flex justify-content-end mx-2 mb-3">
        <input
          className="form-control w-50"
          placeholder="Search"
          value={search}
          onChange={(e) => onChange(e)}
        />
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
          {!filter
            ? teams.length > 0 &&
              teams.map((team, index) => {
                return (
                  <tr key={team.id}>
                    <td>{index + 1}</td>
                    <td>{team.name}</td>
                    <td>{team.coach}</td>
                    <td>{team.country}</td>
                    <td>{team.state}</td>
                    <td>
                      <Link
                        to={`/teams/${team.id}/true`}
                        className="btn btn-dark btn-sm"
                      >
                        View
                      </Link>{" "}
                      |{" "}
                      <Link
                        to={`/teams/edit/${team.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </Link>{" "}
                      |{" "}
                      <button
                        onClick={() => handleDelete(team.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : filteredData.length > 0 &&
              filteredData.map((team, index) => {
                return (
                  <tr key={team.id}>
                    <td>{index + 1}</td>
                    <td>{team.name}</td>
                    <td>{team.coach}</td>
                    <td>{team.country}</td>
                    <td>{team.state}</td>
                    <td>
                      <Link
                        to={`/teams/${team.id}/true`}
                        className="btn btn-dark btn-sm"
                      >
                        View
                      </Link>{" "}
                      |{" "}
                      <Link
                        to={`/teams/edit/${team.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </Link>{" "}
                      |{" "}
                      <button
                        onClick={() => handleDelete(team.id)}
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
