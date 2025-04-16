import axios from 'axios';

export const fetchInf = async () => {
  try {
    const response = axios.get(`${process.env.REACT_APP_API_URL}UserInformation/`);
    return response;
  } catch (error) {
    return error;
  }
};
