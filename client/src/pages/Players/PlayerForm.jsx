import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios";

const PlayerForm = () => {
  const { id, viewOnly } = useParams();

  const [cities, setCities] = useState([]);
  const [teams, setTeams] = useState([]);

  const getData = async () => {
    const responseCity = await axios.get(`/cities/`);
    const responseTeams = await axios.get(`/teams/`);
    if (id) {
      const response = await axios.get(`/players/${id}`);
      setFormData({
        ...response.data,
        city: response.data.city._id,
        team: response.data.team._id,
      });
    }
    setCities(responseCity.data);
    setTeams(responseTeams.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    team: "",
    age: "",
    city: "",
    description: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    let response;
    if (!id) {
      response = await axios.post(`/players`, formData);
    } else {
      response = await axios.put(`/players/${formData._id}`, formData);
    }
    if (response.status === 200) {
      alert(id ? "Player updated !" : "Player added !");
      navigate("/players");
    } else {
      alert("Something went wrong !");
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Layout activeLink={"Players"}>
      <div className="row">
        <div className="col-9">
          <h1>Players | {!id ? "Add" : viewOnly ? "Details" : "Edit"}</h1>
        </div>
        <div className="col-3 d-flex justify-content-end align-items-center">
          <Link to="/players" className="btn btn-outline-dark mr-0">
            <FontAwesomeIcon icon={faChevronLeft} /> Go Back
          </Link>
        </div>
        <hr />
      </div>
      <form onSubmit={(e) => onSubmit(e)} className="p-5">
        <div className="mb-3">
          <label className="form-label">First name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            required
            onChange={(e) => onChange(e)}
            value={formData.first_name}
            placeholder="Enter first name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            required
            onChange={(e) => onChange(e)}
            value={formData.last_name}
            placeholder="Enter last name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Team</label>
          <select
            className="form-control"
            id="team"
            name="team"
            required
            onChange={(e) => onChange(e)}
            value={formData.team}
          >
            <option value={""}>Select team</option>
            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            required
            onChange={(e) => onChange(e)}
            value={formData.age}
            placeholder="Enter age"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City</label>
          <select
            className="form-control"
            id="city"
            name="city"
            required
            onChange={(e) => onChange(e)}
            value={formData.city}
          >
            <option value={""}>Select city</option>
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>
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

export default PlayerForm;
