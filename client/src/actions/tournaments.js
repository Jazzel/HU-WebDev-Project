import { HOST } from "../App";
import {
  ADD_TOURNAMENT,
  DELETE_TOURNAMENT,
  GET_TOURNAMENT,
  GET_TOURNAMENTS,
  TOURNAMENT_ERROR,
  UPDATE_TOURNAMENT,
} from "../actions/types";
import { setAlert } from "./alert";
import axios from "axios";

// Get all posts
export const getTournaments = () => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/tournaments`);
    dispatch({
      type: GET_TOURNAMENTS,
      payload: res.data,
    });
    return res;
  } catch (error) {
    dispatch({
      type: TOURNAMENT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    return error;
  }
};

// Delete post
export const deleteTournament = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`${HOST}/tournaments/${postId}`);
    dispatch({
      type: DELETE_TOURNAMENT,
      payload: postId,
    });

    dispatch(setAlert("Tournament removed", "success"));
    console.log(res);

    return res;
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: TOURNAMENT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    return error;
  }
};

// Add post
export const addTournament = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(`${HOST}/tournaments`, formData, config);
    dispatch({
      type: ADD_TOURNAMENT,
      payload: res.data,
    });

    dispatch(setAlert("Tournament created", "success"));

    return res;
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: TOURNAMENT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    return error;
  }
};

// Get Post
export const getTournament = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${HOST}/tournaments/${id}`);
    dispatch({
      type: GET_TOURNAMENT,
      payload: res.data,
    });

    return res;
  } catch (error) {
    dispatch({
      type: TOURNAMENT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });

    return error;
  }
};

// Update Tournament
export const updateTournament = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(`${HOST}/tournaments/${id}`, formData, config);

    dispatch({
      type: UPDATE_TOURNAMENT,
      payload: res.data,
    });

    dispatch(setAlert("Tournament updated", "success"));
    return res;
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: TOURNAMENT_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });

    return error;
  }
};
