import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios";
const CityForm = () => {
  const { id, viewOnly } = useParams();

  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
  });

  const getData = async () => {
    try {
      const responseCountry = await axios.get(`/countries`);
      if (id) {
        const response = await axios.get(`/cities/${id}`);
        setFormData({ ...response.data, country: response.data.country });
      }

      setCountries(responseCountry.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (!id) {
        response = await axios.post(`/cities`, formData);
      } else {
        response = await axios.put(`/cities/${formData.id}`, formData);
      }
      if (response.status === 200) {
        alert(id ? "City updated !" : "City added !");
        navigate("/countries");
      } else {
        alert("Something went wrong !");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Layout activeLink={"Countries"}>
      <div className="row">
        <div className="col-9">
          <h1>Cities | {!id ? "Add" : viewOnly ? "Details" : "Edit"}</h1>
        </div>
        <div className="col-3 d-flex justify-content-end align-items-center">
          <Link to="/countries" className="btn btn-outline-light mr-0">
            <FontAwesomeIcon icon={faChevronLeft} /> Go Back
          </Link>
        </div>
        <hr />
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label className="form-label">City</label>
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
          <label className="form-label">Country</label>
          <select
            className="form-control"
            required
            name="country"
            value={formData.country}
            onChange={(e) => onChange(e)}
          >
            <option value={""}>Select Country</option>
            {countries.map((country) => (
              <option
                key={country.id}
                selected={formData.country === country.id}
                value={country.id}
              >
                {country.name}
              </option>
            ))}
          </select>
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

export default CityForm;
