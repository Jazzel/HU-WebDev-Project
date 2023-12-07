import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { fixDate } from "../../App";
import { Link } from "react-router-dom";
import { getTournaments, deleteTournament } from "../../actions/tournaments";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Tournaments = ({ getTournaments, deleteTournament, setAlert }) => {
  const [tournamentsData, setTournamentsData] = useState([]);

  const getData = async () => {
    try {
      const response = await getTournaments();
      setTournamentsData(response.data);
    } catch (error) {
      console.log(error);
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
      const filteredData = tournamentsData.filter(
        (match) =>
          match?.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          match?.sport.toLowerCase().includes(e.target.value.toLowerCase())
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
        const response = await deleteTournament(id);

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
    <Layout activeLink={"Tournaments"}>
      <div className="row">
        <div className="col-12 col-md-7">
          <h3>Tournaments</h3>
        </div>
        <div
          className="col-12 col-md-5 d-flex"
          style={{ justifyContent: "flex-end" }}
        >
          <Link to="/tournaments/add" className="btn btn-dark m-1">
            <FontAwesomeIcon icon={faAdd} style={{ marginRight: 5 }} />
            Add more tournaments
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
            <th>Sport</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!filter
            ? tournamentsData &&
              tournamentsData.length > 0 &&
              tournamentsData.map((tournament, index) => {
                return (
                  <tr key={tournament.id}>
                    <td>{index + 1}</td>
                    <td>{tournament.name}</td>
                    <td>{tournament.sport}</td>
                    <td>{fixDate(tournament.start_date)}</td>
                    <td>{fixDate(tournament.end_date)}</td>
                    <td>
                      <Link
                        to={`/tournaments/${tournament.id}/true`}
                        className="btn btn-dark btn-sm"
                      >
                        View
                      </Link>{" "}
                      |{" "}
                      <Link
                        to={`/tournaments/edit/${tournament.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </Link>{" "}
                      |{" "}
                      <button
                        onClick={() => handleDelete(tournament.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : filteredData.length > 0 &&
              filteredData.map((tournament, index) => {
                return (
                  <tr key={tournament.id}>
                    <td>{index + 1}</td>
                    <td>{tournament.name}</td>
                    <td>{tournament.sport}</td>
                    <td>{fixDate(tournament.start_date)}</td>
                    <td>{fixDate(tournament.end_date)}</td>
                    <td>
                      <Link
                        to={`/tournaments/${tournament.id}/true`}
                        className="btn btn-dark btn-sm"
                      >
                        View
                      </Link>{" "}
                      |{" "}
                      <Link
                        to={`/tournaments/edit/${tournament.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </Link>{" "}
                      |{" "}
                      <button
                        onClick={() => handleDelete(tournament.id)}
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

Tournaments.propTypes = {
  deleteSport: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  deleteTournament: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tournaments: state.tournaments,
});

export default connect(mapStateToProps, {
  getTournaments,
  deleteTournament,
  setAlert,
})(Tournaments);
