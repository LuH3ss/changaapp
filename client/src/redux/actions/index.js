import axios from "axios";
export const GET_DETAILS = "GET_DETAILS";
export const GET_ALL_SERVICES = "GET_ALL_SERVICES"
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES"
export const SORT_SERVICES = "SORT_SERVICES"
const EP = 'http://localhost:3001'

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
  export function getAllServices () {
    return async function (dispatch) {
      const dataDb = await axios(`${EP}/services`);
      return dispatch ({
        type: GET_ALL_SERVICES,
        payload: dataDb.data
      })
    }
  }

  export function getAllCategories () {
    return async function (dispatch) {
      const dataDb = await axios(`${EP}/category`);
      return dispatch ({
        type: GET_ALL_CATEGORIES,
        payload: dataDb.data
      })
    }
  }

  export function sortServices (payload) {
      return {
        type: SORT_SERVICES,
        payload: payload
      }
  }































