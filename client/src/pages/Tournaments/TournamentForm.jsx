import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { fixDataForInputField } from "../../App";

import {
  getTournament,
  addTournament,
  updateTournament,
} from "../../actions/tournaments";
import { getSports } from "../../actions/sports";
import { connect } from "react-redux";

import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

const TournamentForm = ({
  getSports,
  getTournament,
  addTournament,
  updateTournament,
  setAlert,
}) => {
  const { id, viewOnly } = useParams();
  const [sportsData, setSportsData] = useState([]);

  const getData = async () => {
    try {
      const responseSports = await getSports();
      if (id) {
        const response = await getTournament(id);
        setFormData({ ...response.data, sport: response.data.sport });
      }
      setSportsData(responseSports.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    start_date: "",
    end_date: "",
    description: "",
    managed_by: 1,
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (formData.end_date > formData.start_date) {
      let response;
      if (!id) {
        response = await addTournament(formData);
      } else {
        response = await updateTournament(formData.id, formData);
      }
      if (response.status === 200) {
        navigate("/tournaments");
      }
    } else {
      setAlert(
        "Dates should not be the same or End date cannot be less than start date",
        "danger"
      );
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Layout activeLink={"Tournaments"}>
      <div className="row">
        <div className="col-9">
          <h1>Tournaments | {!id ? "Add" : viewOnly ? "Details" : "Edit"}</h1>
        </div>
        <div className="col-3 d-flex justify-content-end align-items-center">
          <Link to="/tournaments" className="btn btn-outline-light mr-0">
            <FontAwesomeIcon icon={faChevronLeft} /> Go Back
          </Link>
        </div>
        <hr />
      </div>
      <form onSubmit={(e) => onSubmit(e)} className="p-5">
        <div className="mb-3">
          <label className="form-label">Team name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
            onChange={(e) => onChange(e)}
            value={formData.name}
            placeholder="Enter name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Sport</label>
          <select
            className="form-control"
            required
            name="sport"
            value={formData.sport}
            onChange={(e) => onChange(e)}
          >
            <option value={""}>Select sport</option>
            {sportsData.map((sport) => (
              <option
                selected={formData.sport === sport.id}
                key={sport.id}
                value={sport.id}
              >
                {sport.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Start date</label>
          <input
            type="date"
            className="form-control"
            id="start_date"
            name="start_date"
            required
            onChange={(e) => onChange(e)}
            value={fixDataForInputField(formData.start_date)}
            placeholder="Enter start_date"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End date</label>
          <input
            type="date"
            className="form-control"
            id="end_date"
            name="end_date"
            required
            onChange={(e) => onChange(e)}
            value={fixDataForInputField(formData.end_date)}
            placeholder="Enter end_date"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            name="description"
            required
            onChange={(e) => onChange(e)}
            value={formData.description}
            placeholder="Enter description"
          ></textarea>
        </div>
        {!viewOnly && (
          <button type="submit" className="btn btn-dark w-100">
            {!id ? "Add" : "Edit"}
          </button>
        )}
      </form>
    </Layout>
  );
};

TournamentForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  getTournament: PropTypes.func.isRequired,
  getSports: PropTypes.func.isRequired,
  addTournament: PropTypes.func.isRequired,
  updateTournament: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tournament: state.tournament,
});

export default connect(mapStateToProps, {
  setAlert,
  getTournament,
  getSports,
  addTournament,
  updateTournament,
})(TournamentForm);
