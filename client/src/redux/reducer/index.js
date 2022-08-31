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
  FILTER,
  UPDATE,
  POST_REQUEST,
  UPDATE_SERVICE,
  GET_SERVICE_ID,
  UPDATE_REQUEST,
  DELETE_REQUEST,
  ALL_REQUEST,
  DELETE_SERVICES,
  USER_LOCATION,
} from "../actions/index.js";

const initialStates = {
  serviceDetail: [],
  services: [],
  servicesAux: [],
  categories: [],
  registerUser: [],
  registerService: [],
  postCategory: [],
  update: [],
  filter: [],
  userLocation: [],
  updateService: [],
  filterId: [],
  updateRequest: [],
  deleteRequest: [],
  allRequest: [],
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
        services:
          action.payload === "All"
            ? state.servicesAux
            : state.servicesAux.filter(
                (el) => el.category.name === action.payload
              ),
      };
    case REGISTER_USER:
      return {
        ...state,
        registerUser: [...state.registerUser, { ...action.payload }],
      };
    case REGISTER_SERVICE:
      return {
        ...state,
        registerService: [...state.registerService, { ...action.payload }],
      };
    case POST_CATEGORY:
      return {
        ...state,
        postCategory: [...state, { ...action.payload }],
      };
    case FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case USER_LOCATION:
      return {
        ...state,
        userLocation: action.payload,
      };
    case UPDATE:
      return {
        ...state,
        update: [...state.update, { ...action.payload }],
      };

    case POST_REQUEST:
      return {
        ...state,
      };
    case UPDATE_SERVICE:
      return {
        ...state,
        updateService: [...state.updateService, { ...action.payload }],
      };
    case GET_SERVICE_ID:
      return {
        ...state,
        filterId: action.payload,
      };
    case UPDATE_REQUEST:
      return {
        ...state,
        updateRequest: [...state.updateRequest, { ...action.payload }],
      };
    case DELETE_REQUEST:
      return {
        ...state,
        deleteRequest: action.payload,
      };
    case ALL_REQUEST:
      return {
        ...state,
        allRequest: action.payload,
      };
    case DELETE_SERVICES:
      return {
        ...state,
        services: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
