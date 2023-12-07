import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

import { getSports, deleteSport } from "../../actions/sports";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../actions/alert";

const Sports = ({ getSports, deleteSport, setAlert }) => {
  const [sports, setSports] = useState([]);
  const getData = async () => {
    try {
      const response = await getSports();
      setSports(response.data);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filter, setFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const onChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value !== "") {
      setFilter(true);
      const filteredData = sports.filter((match) =>
        match?.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredData(filteredData);
    } else {
      setFilter(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const answer = window.confirm("Are you sure you want to delete ? ");
      if (answer) {
        const response = await deleteSport(id);

        if (response.status === 200) {
          getData();
        }
      }
    } catch (error) {
      const errors = error.response.data;
      setAlert(errors.msg, "danger");
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
      <div className="d-flex justify-content-end mx-2 mb-3">
        <input
          className="form-control w-50"
          placeholder="Search"
          value={search}
          onChange={(e) => onChange(e)}
        />
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
          {!filter
            ? sports.length > 0 &&
              sports.map((sport, index) => (
                <tr key={sport.id}>
                  <td>{index + 1}</td>
                  <td>{sport.name}</td>
                  <td>
                    <Link
                      to={`/sports/${sport.id}/true`}
                      className="btn btn-dark btn-sm"
                    >
                      View
                    </Link>{" "}
                    |{" "}
                    <Link
                      to={`/sports/edit/${sport.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>{" "}
                    |{" "}
                    <button
                      onClick={() => handleDelete(sport.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : filteredData.length > 0 &&
              filteredData.map((sport, index) => (
                <tr key={sport.id}>
                  <td>{index + 1}</td>
                  <td>{sport.name}</td>
                  <td>
                    <Link
                      to={`/sports/${sport.id}/true`}
                      className="btn btn-dark btn-sm"
                    >
                      View
                    </Link>{" "}
                    |{" "}
                    <Link
                      to={`/sports/edit/${sport.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>{" "}
                    |{" "}
                    <button
                      onClick={() => handleDelete(sport.id)}
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

Sports.propTypes = {
  getSports: PropTypes.func.isRequired,
  deleteSport: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sports: state.sports,
});

export default connect(mapStateToProps, { getSports, deleteSport, setAlert })(
  Sports
);
