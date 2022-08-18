import axios from "axios";
export const GET_DETAILS = "GET_DETAILS";
export const REGISTER_USER = 'REGISTER_USER'

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

export function registerUser(user){
  return async function(dispatch){
    await axios.post('http://localhost:3001/user', user)
    .then(detalle => dispatch({
      type: REGISTER_USER,
      payload: detalle.data
    }))
  }
}
