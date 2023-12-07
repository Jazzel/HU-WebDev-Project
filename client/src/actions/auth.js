import { HOST } from "../App";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import {
  AUTH_ERROR,
  CLEAR_PROFILE,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "./types";

// Load User
export const loadUser = (token) => async (dispatch) => {
  setAuthToken(token);
  try {
    const res = await axios.get(`${HOST}/users/load`);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    return res;
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
    return error;
  }
};

// Register User
export const register =
  ({ name, email, password, role }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, email, password, role });

    try {
      const res = await axios.post(`${HOST}/users/register`, body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser(res.data.token));
      return res;
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
      return error;
    }
  };

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${HOST}/users/login`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser(res.data.token));

    return res;
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });

    return error;
  }
};

// Logout User / Clear profile
export const logout = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
};
