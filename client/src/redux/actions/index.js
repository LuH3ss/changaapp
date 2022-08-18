import axios from "axios";
export const GET_DETAILS = "GET_DETAILS";

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/services/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
