import {
  GET_DETAILS,
  GET_ALL_SERVICES,
  SORT_SERVICES,
  FILTER_SERVICES,
  GET_ALL_CATEGORIES,
  SERVICE_NAME,
  REGISTER_USER,
  REGISTER_SERVICE,
  POST_CATEGORY,
} from "../actions/index.js";

const initialStates = {
  serviceDetail: [],
  services: [],
  servicesAux: [],
  categories: [],
  registerUser: [],
  registerService: [],
  postCategory: [],
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
      };
    case SORT_SERVICES:
      let sorted;
      if (action.payload.includes("Price")) {
        sorted = state.services.sort(function (a, b) {
          return a.price - b.price;
        });
        if (action.payload === "PriceDes") {
          sorted = sorted.reverse();
        }
      } else {
        sorted = state.services.sort(function (a, b) {
          if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
          if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
          return 0;
        });
        if (action.payload === "AlphabeticalDes") {
          sorted = sorted.reverse();
        }
      }
      return {
        ...state,
        services: sorted,
      };
    case FILTER_SERVICES:
      return {
        ...state,
        services: state.servicesAux.filter(
          (el) => el.categories[0]?.name === action.payload
        ),
      };
    case REGISTER_USER:
      return {
        ...state,
        registerUser: [...state, { ...action.payload }],
      };
    case REGISTER_SERVICE:
      return {
        ...state,
        registerService: [...state, { ...action.payload }],
      };
    case POST_CATEGORY:
      return {
        ...state,
        postCategory: [...state, { ...action.payload }],
      };
    default:
      return state;
  }
};

export default reducer;
