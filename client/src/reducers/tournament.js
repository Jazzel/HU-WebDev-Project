import {
  ADD_TOURNAMENT,
  DELETE_TOURNAMENT,
  GET_TOURNAMENT,
  GET_TOURNAMENTS,
  TOURNAMENT_ERROR,
  UPDATE_TOURNAMENT,
} from "../actions/types";

const initialState = {
  tournaments: null,
  loading: true,
  tournament: null,
};

export default function tournaments(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_TOURNAMENTS:
      return {
        ...state,
        loading: false,
        tournaments: payload,
      };

    case GET_TOURNAMENT:
      return {
        ...state,
        loading: false,
        tournament: payload,
      };
    case DELETE_TOURNAMENT:
      return {
        ...state,
        tournaments: state.tournaments.filter(
          (insurance) => insurance._id !== payload
        ),
        loading: false,
      };
    case ADD_TOURNAMENT: {
      return {
        ...state,
        tournaments: state.tournaments
          ? [payload, ...state.tournaments]
          : [payload],
      };
    }

    case UPDATE_TOURNAMENT:
      return {
        ...state,
        tournaments: state.tournaments.map((insurance) => {
          if (insurance._id === payload._id) {
            return payload;
          } else {
            return insurance;
          }
        }),
      };
    case TOURNAMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
