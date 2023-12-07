import { REMOVE_ALERT, SET_ALERT } from "../actions/types";

const initialState = [
  //   {
  //     id: 1,
  //     msg: "Please login",
  //     alertType: "success",
  //   },
];

export default function alert(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}