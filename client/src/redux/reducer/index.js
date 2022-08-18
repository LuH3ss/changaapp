import { GET_DETAILS, REGISTER_USER } from "../actions/index.js";

const initialStates = { serviceDetail: [], registerUser: [] };

const reducer = (state = initialStates, action) => {
  switch (action.type) {
    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload,
      };
    case REGISTER_USER:
      return {
        ...state,
        registerUser: [...state, {...action.payload}]
      }
    default:
      return state;
  }
};

export default reducer;
