
import {
  GET_DETAILS,
  GET_ALL_SERVICES,
  SORT_SERVICES,
  GET_ALL_CATEGORIES,
  SERVICE_NAME,
  REGISTER_USER
} from "../actions/index.js";

const initialStates = {
  serviceDetail: [],
  services: [],
  servicesAux: [],
  categories: [],
  registerUser: []
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
        servicesAux: action.payload,
      };
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SERVICE_NAME:
      return {
        ...state,
        services: action.payload,
        servicesAux: action.payload,
      };
    case SORT_SERVICES:
      let sorted;
      if (action.payload.includes('Price')) {
        sorted = state.services.sort(function (a, b) {
          return a.price - b.price;
        });
        if(action.payload === 'PriceDes'){
          sorted = sorted.reverse();
        }
      } else {
        sorted = state.services.sort(function (a, b) {
          if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
          if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
          return 0;
        });
        if(action.payload === 'AlphabeticalDes'){
          sorted = sorted.reverse();
        }
      }
      return {
        ...state,
        services: sorted,
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
