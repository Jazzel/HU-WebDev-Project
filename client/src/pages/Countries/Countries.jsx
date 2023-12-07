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
    try {
      const responseCity = await axios.get(`/cities`);
      const responseCountry = await axios.get(`/countries`);
      setCities(responseCity.data);
      setCountries(responseCountry.data);
    } catch (error) {
      console.log(error);
    }
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

  const [filterCity, setFilterCity] = useState(false);
  const [filterCountry, setFilterCountry] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const onCityChange = (e) => {
    setSearchCity(e.target.value);
    if (e.target.value !== "") {
      setFilterCity(true);
      const filteredData = cities.filter(
        (data) =>
          data?.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          data?.country.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredCities(filteredData);
    } else {
      setFilterCity(false);
    }
  };

  const onCountryChange = (e) => {
    setSearchCountry(e.target.value);
    if (e.target.value !== "") {
      setFilterCountry(true);
      const filteredData = countries.filter((data) =>
        data?.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredCountries(filteredData);
    } else {
      setFilterCountry(false);
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
      <div className="d-flex justify-content-end mx-2 mb-3">
        <input
          className="form-control w-50"
          placeholder="Search"
          value={searchCity}
          onChange={(e) => onCityChange(e)}
        />
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
          {!filterCity
            ? cities.length > 0 &&
              cities.map((city, index) => (
                <tr key={city.id}>
                  <td>{index + 1}</td>
                  <td>{city.name}</td>
                  <td>{city.country}</td>
                  <td>
                    <Link
                      to={`/cities/edit/${city.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>{" "}
                    |{" "}
                    <button
                      onClick={() => handleDelete(city.id, "cities")}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : filteredCities.length > 0 &&
              filteredCities.map((city, index) => (
                <tr key={city.id}>
                  <td>{index + 1}</td>
                  <td>{city.name}</td>
                  <td>{city.country}</td>
                  <td>
                    <Link
                      to={`/cities/edit/${city.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>{" "}
                    |{" "}
                    <button
                      onClick={() => handleDelete(city.id, "cities")}
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
      <div className="d-flex justify-content-end mx-2 mb-3">
        <input
          className="form-control w-50"
          placeholder="Search"
          value={searchCountry}
          onChange={(e) => onCountryChange(e)}
        />
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
          {!filterCountry
            ? countries.length > 0 &&
              countries.map((country, index) => (
                <tr key={country.id}>
                  <td>{index + 1}</td>
                  <td>{country.name}</td>
                  <td>
                    <Link
                      to={`/countries/edit/${country.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>{" "}
                    |{" "}
                    <button
                      onClick={() => handleDelete(country.id, "countries")}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : filteredCountries.length > 0 &&
              filteredCountries.map((country, index) => (
                <tr key={country.id}>
                  <td>{index + 1}</td>
                  <td>{country.name}</td>
                  <td>
                    <Link
                      to={`/countries/edit/${country.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>{" "}
                    |{" "}
                    <button
                      onClick={() => handleDelete(country.id, "countries")}
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
