import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { addSport, updateSport, getSport } from "../../actions/sports";
import { connect } from "react-redux";

import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

const SportForm = ({ addSport, updateSport, getSport, setAlert }) => {
  const { id, viewOnly } = useParams();

  const getData = async () => {
    try {
      if (id) {
        const response = await getSport(id);
        setFormData({ ...response.data });
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    let response;
    if (!id) {
      response = await addSport(formData);
    } else {
      response = await updateSport(formData.id, formData);
    }
    if (response.status === 200) {
      navigate("/sports");
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Layout activeLink={"Sports"}>
      <div className="row">
        <div className="col-9">
          <h1>Sports | {!id ? "Add" : viewOnly ? "Details" : "Edit"}</h1>
        </div>
        <div className="col-3 d-flex justify-content-end align-items-center">
          <Link to="/sports" className="btn btn-outline-light mr-0">
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

SportForm.propTypes = {
  addSport: PropTypes.func.isRequired,
  updateSport: PropTypes.func.isRequired,
  getSport: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sport: state.sport,
});

export default connect(mapStateToProps, {
  addSport,
  updateSport,
  getSport,
  setAlert,
})(SportForm);
