import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "../../axios";
import { fixDate } from "../../App";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MatchDetails = () => {
  const { id, viewOnly } = useParams();

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
  });

  useEffect(() => {
    const getData = async () => {
      try {
        if (id) {
          const response = await axios.get(`/matches/${id}/special`);
          const responseTeamA = await axios.get(
            `/teams/${response.data.team_A_id}/players`
          );
          const responseTeamB = await axios.get(
            `/teams/${response.data.team_B_id}/players`
          );
          setFormData({
            ...response.data,
            tournament: response.data.tournament,
            team_A: response.data.team_A,
            team_A_id: response.data.team_A_id,
            team_B: response.data.team_B,
            team_B_id: response.data.team_B_id,
            winner: response.data.winner,
            team_A_players: responseTeamA.data,
            team_B_players: responseTeamB.data,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [id]);

  return (
    <Layout activeLink={"Matches"}>
      <div className="row">
        <div className="col-9">
          <h1>Match Details | {!id ? "Add" : viewOnly ? "Details" : "Edit"}</h1>
        </div>
        <div className="col-3 d-flex justify-content-end align-items-center">
          <Link
            to={`/matches/edit/${id}`}
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
          <h4>Players</h4>
          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th>Team</th>
                <th>Players</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Team A</th>
                <td>
                  {formData.team_A_players &&
                    formData.team_A_players.map((player) => (
                      <div
                        key={player.id}
                        className="d-flex justify-content-start align-items-center"
                      >
                        <p>{player.first_name}</p>
                        <Link
                          to={`/matches/${id}/${player.team_id}/${player.id}/playerDetails/true`}
                          className="btn btn-sm btn-dark float-left mx-4"
                        >
                          View details
                        </Link>
                        <Link
                          to={`/matches/${id}/${player.team_id}/${player.id}/playerDetails`}
                          className="btn btn-sm btn-dark float-left mx-4"
                        >
                          Add details
                        </Link>
                      </div>
                    ))}
                </td>
              </tr>
              <tr>
                <th>Team B</th>
                <td>
                  {formData.team_B_players &&
                    formData.team_B_players.map((player) => (
                      <div
                        key={player.id}
                        className="d-flex justify-content-start align-items-center"
                      >
                        <p>{player.first_name}</p>
                        <Link
                          to={`/matches/${id}/${player.team_id}/${player.id}/playerDetails/true`}
                          className="btn btn-sm btn-dark float-left mx-4"
                        >
                          View details
                        </Link>
                        <Link
                          to={`/matches/${id}/${player.team_id}/${player.id}/playerDetails`}
                          className="btn btn-sm btn-dark float-left mx-4"
                        >
                          Add details
                        </Link>
                      </div>
                    ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default MatchDetails;
