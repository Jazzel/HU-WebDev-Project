import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import { fixDate } from "../../App";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlayerDetails = () => {
  const navigate = useNavigate();

  const { id, player_id, viewOnly } = useParams();

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
    date: "",
    match: id,
    player: player_id,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        if (id) {
          const response = await axios.get(`/matches/${id}/special`);
          const responsePlayer = await axios.get(`/players/${player_id}`);
          let responsePlayerDetails;
          try {
            responsePlayerDetails = await axios.get(
              `/match-details/${id}/${player_id}`
            );
          } catch (err) {
            console.log(err);
          }
          setFormData({
            ...response.data,
            tournament: response.data.tournament,
            team_A: response.data.team_A,
            team_A_id: response.data.team_A_id,
            team_B: response.data.team_B,
            team_B_id: response.data.team_B_id,
            winner: response.data.winner,
            playerData: responsePlayer.data,
            score: responsePlayerDetails?.data?.score || 0,
            description: responsePlayerDetails?.data?.description || "",
            match: id,
            player: player_id,
            player_detail_id: responsePlayerDetails?.data?.id,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (!formData.player_detail_id) {
        response = await axios.post(`/match-details`, formData);
      } else {
        response = await axios.put(
          `/match-details/${id}/${player_id}`,
          formData
        );
      }
      if (response.status === 200) {
        alert(
          formData.player_detail_id
            ? "Match Detail updated !"
            : "Match Detail added !"
        );
        navigate(`/matches/${id}/matchDetails`);
      } else {
        alert("Something went wrong !");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout activeLink={"Matches"}>
      <div className="row">
        <div className="col-9">
          <h1>
            Player Details |{" "}
            {!formData.player_detail_id ? "Add" : viewOnly ? "Details" : "Edit"}
          </h1>
        </div>
        <div className="col-3 d-flex justify-content-end align-items-center">
          <Link
            to={`/matches/${id}/matchDetails`}
            className="btn btn-outline-light mr-0"
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Go Back
          </Link>
        </div>
        <hr />
      </div>
      <hr />
      <div className="row">
        <div className="col-12 col-md-6">
          <h5>Match Details</h5>
          <table className="table table-striped table-responsive">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{formData.name}</td>
              </tr>
              <tr>
                <th>Date</th>
                <td>{fixDate(formData.date)}</td>
              </tr>
              <tr>
                <th>Venue</th>
                <td>{formData.venue}</td>
              </tr>
              <tr>
                <th>Tournament</th>
                <td>{formData.tournament}</td>
              </tr>
              <tr>
                <th>Team A</th>
                <td>{formData.team_A}</td>
              </tr>
              <tr>
                <th>Team B</th>
                <td>{formData.team_B}</td>
              </tr>
              <tr>
                <th>Team A Score</th>
                <td>{formData.team_A_score}</td>
              </tr>
              <tr>
                <th>Team B Score</th>
                <td>{formData.team_B_score}</td>
              </tr>
              <tr>
                <th>Winner</th>
                <td>{formData.winner}</td>
              </tr>
              <tr>
                <th>Summary</th>
                <td>{formData.summary}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-12 col-md-6">
          <h4>
            {" "}
            {formData.playerData &&
              formData.playerData.first_name +
                " " +
                formData.playerData.last_name +
                " - " +
                formData.playerData.team_name}
          </h4>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                name="match"
                id="match"
                type="hidden"
                value={formData.match}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                name="player"
                id="player"
                type="hidden"
                value={formData.player}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Score</label>
              <input
                name="score"
                id="score"
                type="number"
                value={formData.score}
                className="form-control"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                className="form-control"
                onChange={(e) => onChange(e)}
              ></textarea>
            </div>
            {!viewOnly && (
              <button type="submit" className="btn btn-dark w-100">
                {!formData.player_detail_id ? "Add" : "Edit"}
              </button>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PlayerDetails;
