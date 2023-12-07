import { HOST } from "../App";
import {
  ADD_SPORT,
  DELETE_SPORT,
  GET_SPORT,
  GET_SPORTS,
  SPORT_ERROR,
  UPDATE_SPORT,
} from "../actions/types";
import { setAlert } from "./alert";
import axios from "axios";

// Get all posts
export const getSports = () => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/sports`);
    dispatch({
      type: GET_SPORTS,
      payload: res.data,
    });
    return res;
  } catch (error) {
    dispatch({
      type: SPORT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    return error;
  }
};

// Delete post
export const deleteSport = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`${HOST}/sports/${postId}`);
    dispatch({
      type: DELETE_SPORT,
      payload: postId,
    });

    dispatch(setAlert("Sport removed", "success"));
    console.log(res);

    return res;
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: SPORT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    return error;
  }
};

// Add post
export const addSport = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(`${HOST}/sports`, formData, config);
    dispatch({
      type: ADD_SPORT,
      payload: res.data,
    });

    dispatch(setAlert("Sport created", "success"));

    return res;
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: SPORT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    return error;
  }
};

// Get Post
export const getSport = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/sports/${id}`);
    dispatch({
      type: GET_SPORT,
      payload: res.data,
    });

    return res;
  } catch (error) {
    dispatch({
      type: SPORT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });

    return error;
  }
};

// Update SPORT
export const updateSport = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`${HOST}/sports/${id}`, formData, config);

    dispatch({
      type: UPDATE_SPORT,
      payload: res.data,
    });

    dispatch(setAlert("Sport updated", "success"));
    return res;
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: SPORT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });

    return error;
  }
};
