import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios";
import { Link } from "react-router-dom";

const Players = () => {
  const [players, setPlayers] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(`/players`);
      setPlayers(response.data);
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
      const filteredData = players.filter(
        (data) =>
          data?.first_name
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          data?.last_name
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          data?.team.toLowerCase().includes(e.target.value.toLowerCase()) ||
          data?.age === Number(e.target.value) ||
          data?.city.toLowerCase().includes(e.target.value.toLowerCase())
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
      const response = await axios.delete(`/players/${id}`);

      if (response.status === 200) {
        alert("Sport Deleted !");
        getData();
      }
    }
  };
  return (
    <Layout activeLink={"Players"}>
      <div className="row">
        <div className="col-12 col-md-7">
          <h3>Players</h3>
        </div>
        <div
          className="col-12 col-md-5 d-flex"
          style={{ justifyContent: "flex-end" }}
        >
          <Link to="/players/add" className="btn btn-dark m-1">
            <FontAwesomeIcon icon={faAdd} style={{ marginRight: 5 }} />
            Add more players
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
            <th>Team</th>
            <th>Age</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!filter
            ? players.length > 0 &&
              players.map((player, index) => (
                <tr key={player.id}>
                  <td>{index + 1}</td>
                  <td>{player.first_name + " " + player.last_name}</td>
                  <td>{player.team}</td>
                  <td>{player.age}</td>
                  <td>{player.city}</td>
                  <td>
                    <Link
                      to={`/players/${player.id}/true`}
                      className="btn btn-dark btn-sm"
                    >
                      View
                    </Link>{" "}
                    |{" "}
                    <Link
                      to={`/players/edit/${player.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>{" "}
                    |{" "}
                    <button
                      onClick={() => handleDelete(player.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : filteredData.length > 0 &&
              filteredData.map((player, index) => (
                <tr key={player.id}>
                  <td>{index + 1}</td>
                  <td>{player.first_name + " " + player.last_name}</td>
                  <td>{player.team}</td>
                  <td>{player.age}</td>
                  <td>{player.city}</td>
                  <td>
                    <Link
                      to={`/players/${player.id}/true`}
                      className="btn btn-dark btn-sm"
                    >
                      View
                    </Link>{" "}
                    |{" "}
                    <Link
                      to={`/players/edit/${player.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>{" "}
                    |{" "}
                    <button
                      onClick={() => handleDelete(player.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Players;
