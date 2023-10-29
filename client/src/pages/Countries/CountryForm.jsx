import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios";

const CountryForm = () => {
  const { id, viewOnly } = useParams();

  const getData = async () => {
    if (id) {
      const response = await axios.get(`/countries/${id}`);
      setFormData(response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    let response;
    if (!id) {
      response = await axios.post(`/countries`, formData);
    } else {
      response = await axios.put(`/countries/${formData._id}`, formData);
    }
    if (response.status === 200) {
      alert(id ? "Country updated !" : "Country added !");
      navigate("/countries");
    } else {
      alert("Something went wrong !");
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Layout activeLink={"Countries"}>
      <div className="row">
        <div className="col-9">
          <h1>Countries | {!id ? "Add" : viewOnly ? "Details" : "Edit"}</h1>
        </div>
        <div className="col-3 d-flex justify-content-end align-items-center">
          <Link to="/countries" className="btn btn-outline-dark mr-0">
            <FontAwesomeIcon icon={faChevronLeft} /> Go Back
          </Link>
        </div>
        <hr />
      </div>
      <form onSubmit={(e) => onSubmit(e)} className="p-5">
        <div className="mb-3">
          <label className="form-label">Country</label>
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
        {!viewOnly && (
          <button type="submit" className="btn btn-dark w-100">
            {!id ? "Add" : "Edit"}
          </button>
        )}
      </form>
    </Layout>
  );
};

export default CountryForm;
