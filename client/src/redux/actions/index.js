import axios from "axios";
export const GET_DETAILS = "GET_DETAILS";
export const REGISTER_USER = "REGISTER_USER";
export const REGISTER_SERVICE = "REGISTER_SERVICE";
export const GET_ALL_SERVICES = "GET_ALL_SERVICES";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const SORT_SERVICES = "SORT_SERVICES";
export const FILTER_SERVICES = "FILTER_SERVICES";
export const SERVICE_NAME = "SERVICE_NAME";
export const POST_CATEGORY = "POST_CATEGORY";
export const UPDATE_SERVICE = "UPDATE_SERVICE";
export const GET_USER = "GET_USER";
export const FILTER = "FILTER";
export const UPDATE = "UPDATE";
export const GET_SERVICE_ID = "GET_SERVICE_ID";
export const POST_REQUEST = "POST_REQUEST";

const EP = "http://localhost:3001";

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`${EP}/services/${id}`);

      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function registerUser(user) {
  return async function (dispatch) {
    await axios.post(`${EP}/user`, user).then((detalle) =>
      dispatch({
        type: REGISTER_USER,
        payload: detalle.data,
      })
    );
  };
}

export function getAllServices() {
  return async function (dispatch) {
    const dataDb = await axios(`${EP}/services`);
    return dispatch({
      type: GET_ALL_SERVICES,
      payload: dataDb.data,
    });
  };
}

export function getAllCategories() {
  return async function (dispatch) {
    const dataDb = await axios(`${EP}/category`);
    return dispatch({
      type: GET_ALL_CATEGORIES,
      payload: dataDb.data,
    });
  };
}

export function sortServices(payload) {
  return {
    type: SORT_SERVICES,
    payload: payload,
  };
}

export function filterByCategory(payload) {
  return {
    type: FILTER_SERVICES,
    payload: payload,
  };
}

export function getName(name) {
  return async (dispatch) => {
    const dataDb = await axios(`${EP}/services/search?name=` + name);
    return dispatch({
      type: SERVICE_NAME,
      payload: dataDb.data,
    });
  };
}

export function postService(service) {
  return async function (dispatch) {
    await axios.post(`${EP}/services`, service).then((detalle) =>
      dispatch({
        type: REGISTER_SERVICE,
        payload: detalle.data,
      })
    );
  };
}

export function postCategory(category) {
  return async function (dispatch) {
    await axios.post(`${EP}/category`, category).then((detalle) =>
      dispatch({
        type: POST_CATEGORY,
        payload: detalle.data,
      })
    );
  };
}

//PROBANDO COSAS

export function getUserEmail(email) {
  return async function (dispatch) {
    await axios.get(`${EP}/user/${email}`).then((detalle) =>
      dispatch({
        type: FILTER,
        payload: detalle.data,
      })
    );
  };
}

export function updateUser(email, data) {
  return async function (dispatch) {
    await axios.put(`${EP}/user/${email}`, data).then((detalle) =>
      dispatch({
        type: UPDATE,
        payload: detalle.data,
      })
    );
  };
}

export function postRequest(request) {
  return async function (dispatch) {
    await axios.post(`${EP}/request`, request).then((data) =>
      dispatch({
        type: POST_REQUEST,
        payload: data.data,
      })
    );
  };
}

export function updateService(id, service) {
  return async function (dispatch) {
    await axios.put(`${EP}/services/${id}`, service).then((detalle) =>
      dispatch({
        type: UPDATE_SERVICE,
        payload: detalle.data,
      })
    );
  };
}

export function getServiceById(id) {
  return async function (dispatch) {
    await axios.get(`${EP}/services/${id}`).then((detalle) =>
      dispatch({
        type: GET_SERVICE_ID,
        payload: detalle.data,
      })
    );
  };
}
