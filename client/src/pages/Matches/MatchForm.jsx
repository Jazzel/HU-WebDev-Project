import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios";
import { fixDataForInputField } from "../../App";

const MatchForm = () => {
  const { id, viewOnly } = useParams();

  const [tournaments, setTournaments] = useState([]);
  const [teams, setTeams] = useState([]);

  const getData = async () => {
    const responseTournaments = await axios.get(`/tournaments/`);
    const responseTeams = await axios.get(`/teams/`);
    if (id) {
      const response = await axios.get(`/matches/${id}`);
      setFormData({
        ...response.data,
        tournament: response.data.tournament._id,
        team_A: response.data.team_A._id,
        team_B: response.data.team_B._id,
        winner: response.data.winner && response.data.winner._id,
      });
    }
    setTournaments(responseTournaments.data);
    setTeams(responseTeams.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    timestamp: "",
    venue: "",
    tournament: "",
    team_A: "",
    team_B: "",
    team_A_score: "",
    team_B_score: "",
    winner: "",
    summary: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    let response;
    if (!id) {
      response = await axios.post(`/matches`, formData);
    } else {
      response = await axios.put(`/matches/${formData._id}`, formData);
    }
    if (response.status === 200) {
      alert(id ? "Match updated !" : "Match added !");
      navigate("/matches");
    } else {
      alert("Something went wrong !");
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Layout activeLink={"Matches"}>
      <div className="row">
        <div className="col-9">
          <h1>Matches | {!id ? "Add" : viewOnly ? "Details" : "Edit"}</h1>
        </div>
        <div className="col-3 d-flex justify-content-end align-items-center">
          <Link to="/matches" className="btn btn-outline-dark mr-0">
            <FontAwesomeIcon icon={faChevronLeft} /> Go Back
          </Link>
        </div>
        <hr />
      </div>
      <form onSubmit={(e) => onSubmit(e)} className="p-5">
        <div className="mb-3">
          <label className="form-label">Name</label>
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
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            id="timestamp"
            name="timestamp"
            required
            onChange={(e) => onChange(e)}
            value={fixDataForInputField(formData.timestamp)}
            placeholder="Enter date"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Venue</label>
          <input
            type="text"
            className="form-control"
            id="venue"
            name="venue"
            required
            onChange={(e) => onChange(e)}
            value={formData.venue}
            placeholder="Enter venue"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tournament</label>
          <select
            className="form-control"
            id="tournament"
            name="tournament"
            required
            onChange={(e) => onChange(e)}
            value={formData.tournament}
          >
            <option value={""}>Select tournament</option>
            {tournaments.map((tournament) => (
              <option key={tournament._id} value={tournament._id}>
                {tournament.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Team A</label>
          <select
            className="form-control"
            id="team_A"
            name="team_A"
            required
            onChange={(e) => onChange(e)}
            value={formData.team_A}
          >
            <option value={""}>Select team A</option>
            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Team B</label>
          <select
            className="form-control"
            id="team_B"
            name="team_B"
            required
            onChange={(e) => onChange(e)}
            value={formData.team_B}
          >
            <option value={""}>Select team B</option>
            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Team A score</label>
          <input
            type="number"
            className="form-control"
            id="team_A_score"
            name="team_A_score"
            onChange={(e) => onChange(e)}
            value={formData.team_A_score}
            placeholder="Enter team A score"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Team B score</label>
          <input
            type="number"
            className="form-control"
            id="team_B_score"
            name="team_B_score"
            onChange={(e) => onChange(e)}
            value={formData.team_B_score}
            placeholder="Enter team B score"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Winner</label>
          <select
            className="form-control"
            id="winner"
            name="winner"
            onChange={(e) => onChange(e)}
            value={formData.winner}
          >
            <option value={""}>Select winner team</option>
            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Summary</label>
          <textarea
            type="text"
            className="form-control"
            id="summary"
            name="summary"
            onChange={(e) => onChange(e)}
            value={formData.summary}
            placeholder="Enter summary"
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

export default MatchForm;
