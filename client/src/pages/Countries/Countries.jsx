import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axios";

import { Link } from "react-router-dom";

const Countries = () => {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);

  const getData = async () => {
    const responseCity = await axios.get(`/cities`);
    const responseCountry = await axios.get(`/countries`);
    setCities(responseCity.data);
    setCountries(responseCountry.data);
  };

  const handleDelete = async (id, type) => {
    console.log(id);
    const answer = window.confirm("Are you sure you want to delete ? ");
    if (answer) {
      const response = await axios.delete(`/${type}/${id}`);

      if (response.status === 200) {
        alert("Object Deleted !");
        getData();
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout activeLink={"Countries"}>
      <div className="row">
        <div className="col-12 col-md-7">
          <h3>Cities</h3>
        </div>
        <div
          className="col-12 col-md-5 d-flex"
          style={{ justifyContent: "flex-end" }}
        >
          <Link className="btn btn-dark m-1" to="/cities/add">
            <FontAwesomeIcon icon={faAdd} style={{ marginRight: 5 }} />
            Add more cities
          </Link>
        </div>
        <hr />
      </div>
      <table className="table  table-responsive table-striped dataTables">
        <thead className="table-dark ">
          <tr>
            <th>Id</th>
            <th>City</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cities.length > 0 &&
            cities.map((city, index) => (
              <tr key={city.id}>
                <td>{index + 1}</td>
                <td>{city.name}</td>
                <td>{city.country.name}</td>
                <td>
                  <Link
                    to={`/cities/edit/${city._id}`}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Link>{" "}
                  |{" "}
                  <button
                    onClick={() => handleDelete(city._id, "cities")}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="row">
        <div className="col-12 col-md-7">
          <h3>Countries</h3>
        </div>
        <div
          className="col-12 col-md-5 d-flex"
          style={{ justifyContent: "flex-end" }}
        >
          <Link className="btn btn-dark m-1" to="/countries/add">
            <FontAwesomeIcon icon={faAdd} style={{ marginRight: 5 }} />
            Add more countries
          </Link>
        </div>
        <hr />
      </div>
      <table className="table  table-responsive table-striped dataTables">
        <thead className="table-dark ">
          <tr>
            <th>Id</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {countries.length > 0 &&
            countries.map((country, index) => (
              <tr key={country._id}>
                <td>{index + 1}</td>
                <td>{country.name}</td>
                <td>
                  <Link
                    to={`/countries/edit/${country._id}`}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Link>{" "}
                  |{" "}
                  <button
                    onClick={() => handleDelete(country._id, "countries")}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Countries;
