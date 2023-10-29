import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios";
import { Link } from "react-router-dom";

const Players = () => {
  const [players, setPlayers] = useState([]);

  const getData = async () => {
    const response = await axios.get(`/players`);
    setPlayers(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

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
            Add more plauers
          </Link>
        </div>
        <hr />
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
          {players.length > 0 &&
            players.map((player, index) => (
              <tr key={player._id}>
                <td>{index + 1}</td>
                <td>{player.first_name + " " + player.last_name}</td>
                <td>{player.team.name}</td>
                <td>{player.age}</td>
                <td>{player.city.name}</td>
                <td>
                  <button className="btn btn-dark btn-sm">View</button> |{" "}
                  <Link
                    to={`/players/edit/${player._id}`}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Link>{" "}
                  |{" "}
                  <button
                    onClick={() => handleDelete(player._id)}
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
