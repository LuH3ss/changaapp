import { GET_DETAILS } from "../actions/index.js";

const initialStates = { serviceDetail: [] };

const reducer = (state = initialStates, action) => {
  switch (action.type) {
    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
