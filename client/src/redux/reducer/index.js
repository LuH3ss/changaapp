import { GET_DETAILS, GET_ALL_SERVICES } from "../actions/index.js";

const initialStates = { 
  serviceDetail: [],
  services: [],
  servicesAux: []
 };

const reducer = (state = initialStates, action) => {
  switch (action.type) {
    case GET_DETAILS:
      return {
        ...state,
        serviceDetail: action.payload,
      };
      case GET_ALL_SERVICES: 
      return {
        ...state,
        services: action.payload,
        servicesAux: action.payload

      }
    default:
      return state;
  }
};





























export default reducer;
