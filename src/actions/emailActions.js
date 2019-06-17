import axios from 'axios';
import types, { handleException, showPageLoader } from '.';

const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }
};

const sendEmail = (url, body) => async (dispatch) => {
  dispatch(showPageLoader(true));
  return axios.post(url, body, headers)
    .then((response) => {
      dispatch({ type: types.SEND_EMAIL, payload: response.data });
      dispatch(showPageLoader(false));
    })
    .catch((error) => {
      dispatch(showPageLoader(false));
      handleException(error, dispatch);
    });
};

export default sendEmail;
