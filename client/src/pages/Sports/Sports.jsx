import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

import axios from "./../../axios";
import { Link } from "react-router-dom";

const Sports = () => {
  const [sports, setSports] = useState([]);
  const getData = async () => {
    const response = await axios.get(`/sports`);
    setSports(response.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    const answer = window.confirm("Are you sure you want to delete ? ");
    if (answer) {
      const response = await axios.delete(`/sports/${id}`);

      if (response.status === 200) {
        alert("Sport Deleted !");
        getData();
      }
    }
  };

  return (
    <Layout activeLink={"Sports"}>
      <div className="row">
        <div className="col-12 col-md-7">
          <h3>Sports</h3>
        </div>
        <div
          className="col-12 col-md-5 d-flex"
          style={{ justifyContent: "flex-end" }}
        >
          <Link to="/sports/add" className="btn btn-dark m-1">
            <FontAwesomeIcon icon={faAdd} style={{ marginRight: 5 }} />
            Add more sports
          </Link>
        </div>
        <hr />
      </div>
      <table className="table table-responsive table-striped dataTables">
        <thead className="table-dark ">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sports.length > 0 &&
            sports.map((sport, index) => (
              <tr key={sport._id}>
                <td>{index + 1}</td>
                <td>{sport.name}</td>
                <td>
                  <button className="btn btn-dark btn-sm">View</button> |{" "}
                  <Link
                    to={`/sports/edit/${sport._id}`}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Link>{" "}
                  |{" "}
                  <button
                    onClick={() => handleDelete(sport._id)}
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

export default Sports;
