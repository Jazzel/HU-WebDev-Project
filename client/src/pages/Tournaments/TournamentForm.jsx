import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios";
import { fixDataForInputField } from "../../App";

const TournamentForm = () => {
  const { id, viewOnly } = useParams();
  const [sports, setSports] = useState([]);

  const getData = async () => {
    const responseSports = await axios.get(`/sports`);
    if (id) {
      const response = await axios.get(`/tournaments/${id}`);
      setFormData({ ...response.data, sport: response.data.sport._id });
    }
    setSports(responseSports.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    let response;
    if (!id) {
      response = await axios.post(`/tournaments`, formData);
    } else {
      response = await axios.put(`/tournaments/${formData._id}`, formData);
    }
    if (response.status === 200) {
      alert(id ? "Tournament updated !" : "Tournament added !");
      navigate("/tournaments");
    } else {
      alert("Something went wrong !");
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
          <Link to="/tournaments" className="btn btn-outline-dark mr-0">
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
            <option value={""}>Select Country</option>
            {sports.map((sport) => (
              <option key={sport._id} value={sport._id}>
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

export default TournamentForm;
