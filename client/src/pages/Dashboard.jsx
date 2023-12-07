import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "../axios";
import { fixDate } from "../App";

const Dashboard = () => {
  const [counter, setCounter] = useState([0, 0, 0, 0]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const tournamentCount = await axios.get("/tournaments");
      const teamsCount = await axios.get("/teams");
      const playersCount = await axios.get("/players");
      const matchesCount = await axios.get("/matches");

      setCounter([
        tournamentCount.data?.length,
        matchesCount.data?.length,
        teamsCount.data?.length,
        playersCount.data?.length,
      ]);

      try {
        const response = await axios.get(`/fetch-special`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const [filter, setFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const onChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value !== "") {
      setFilter(true);
      const filteredData = data.filter(
        (match) =>
          match?.first_name
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          match?.Match.toLowerCase().includes(e.target.value.toLowerCase()) ||
          match?.Team_A_name.toLowerCase().includes(
            e.target.value.toLowerCase()
          ) ||
          match?.Team_A_coach.toLowerCase().includes(
            e.target.value.toLowerCase()
          ) ||
          match?.Team_B_name.toLowerCase().includes(
            e.target.value.toLowerCase()
          ) ||
          match?.Team_B_coach.toLowerCase().includes(
            e.target.value.toLowerCase()
          ) ||
          match?.Tournament.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredData(filteredData);
    } else {
      setFilter(false);
    }
  };

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const Submit = (e) => {
    if (to > from && from !== null && to !== null) {
      setFilter(true);
      const filteredData = data.filter(
        (match) =>
          new Date(match?.date) >= new Date(from) &&
          new Date(match?.date) <= new Date(to)
      );
      setFilteredData(filteredData);
    } else {
      setFilter(false);
    }
  };

  return (
    <Layout activeLink="Dashboard">
      <div className="row">
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                      Tournaments Registered
                    </p>
                    <h5 className="font-weight-bolder">{counter[0]}</h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                    <i
                      className="ni ni-money-coins text-lg opacity-10"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                      Total <br /> Matches
                    </p>
                    <h5 className="font-weight-bolder">{counter[1]}</h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                    <i
                      className="ni ni-world text-lg opacity-10"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                      Teams <br />
                      Registered
                    </p>
                    <h5 className="font-weight-bolder">{counter[2]}</h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                    <i
                      className="ni ni-paper-diploma text-lg opacity-10"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                      Players <br />
                      Registered
                    </p>
                    <h5 className="font-weight-bolder">{counter[3]}</h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                    <i
                      className="ni ni-cart text-lg opacity-10"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-12 mb-lg-0 mb-4">
          <div className="card ">
            <div className="card-header pb-0 p-3">
              <div className="d-flex justify-content-between">
                <h6 className="mb-2">Combined Data</h6>
              </div>
            </div>
            <div className="d-flex justify-content-end mx-2 mb-3">
              <input
                className="form-control w-50"
                placeholder="Search"
                value={search}
                type="text"
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="row">
              <div className="col">
                <div className="d-flex justify-content-end mx-2 mb-3">
                  <label className="mt-3">From</label>
                  <input
                    className="form-control w-100 ms-3"
                    placeholder="Search"
                    value={from}
                    type="date"
                    name="from"
                    id="from"
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </div>
              </div>
              <div className="col">
                <div className="d-flex justify-content-end mx-2 mb-3">
                  <label className="mt-3">To</label>

                  <input
                    className="form-control w-100 ms-3"
                    placeholder="Search"
                    value={to}
                    type="date"
                    name="to"
                    id="to"
                    onChange={(e) => setTo(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end mx-2 mb-3">
              <button className="btn btn-dark" onClick={() => setFilter(false)}>
                Reset
              </button>
              <button className="btn btn-dark ms-3" onClick={Submit}>
                Get Data
              </button>
            </div>

            <div className="table-responsive">
              <table className="table table-striped table-responsive align-items-center ">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Player Name</th>
                    <th>Score</th>
                    <th>Match</th>
                    <th>Date</th>
                    <th>Venue</th>
                    <th>Team A Name</th>
                    <th>Team A Coach</th>
                    <th>Team A Score</th>
                    <th>Team B Name</th>
                    <th>Team B Coach</th>
                    <th>Team B Score</th>
                    <th>Tournament</th>
                    <th>Sport</th>
                  </tr>
                </thead>
                <tbody>
                  {!filter
                    ? data.map((match) => (
                        <tr>
                          <td>{match?.id}</td>
                          <td>{match?.first_name}</td>
                          <td>{match?.score}</td>
                          <td>{match?.Match}</td>
                          <td>{fixDate(match?.date)}</td>
                          <td>{match?.venue}</td>
                          <td>{match?.Team_A_name}</td>
                          <td>{match?.Team_A_coach}</td>
                          <td>{match?.team_A_score}</td>
                          <td>{match?.Team_B_name}</td>
                          <td>{match?.Team_B_coach}</td>
                          <td>{match?.team_B_score}</td>
                          <td>{match?.Tournament}</td>
                          <td>{match?.Sport}</td>
                        </tr>
                      ))
                    : filteredData.map((match) => (
                        <tr>
                          <td>{match?.id}</td>
                          <td>{match?.first_name}</td>
                          <td>{match?.score}</td>
                          <td>{match?.Match}</td>
                          <td>{fixDate(match?.date)}</td>
                          <td>{match?.venue}</td>
                          <td>{match?.Team_A_name}</td>
                          <td>{match?.Team_A_coach}</td>
                          <td>{match?.team_A_score}</td>
                          <td>{match?.Team_B_name}</td>
                          <td>{match?.Team_B_coach}</td>
                          <td>{match?.team_B_score}</td>
                          <td>{match?.Tournament}</td>
                          <td>{match?.Sport}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
