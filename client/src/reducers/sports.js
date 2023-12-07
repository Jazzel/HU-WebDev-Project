import {
  ADD_SPORT,
  DELETE_SPORT,
  GET_SPORT,
  GET_SPORTS,
  SPORT_ERROR,
  UPDATE_SPORT,
} from "../actions/types";

const initialState = {
  sports: null,
  loading: true,
  sport: null,
};

export default function sports(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_SPORTS:
      return {
        ...state,
        loading: false,
        sports: payload,
      };

    case GET_SPORT:
      return {
        ...state,
        loading: false,
        sport: payload,
      };
    case DELETE_SPORT:
      return {
        ...state,
        sports: state.sports.filter((insurance) => insurance._id !== payload),
        loading: false,
      };
    case ADD_SPORT: {
      return {
        ...state,
        sports: state.sports ? [payload, ...state.sports] : [payload],
      };
    }

    case UPDATE_SPORT:
      return {
        ...state,
        sports: state.sports.map((insurance) => {
          if (insurance._id === payload._id) {
            return payload;
          } else {
            return insurance;
          }
        }),
      };
    case SPORT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
