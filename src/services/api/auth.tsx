import axios from 'axios';

const API_URL = 'http://eboard.ecews.org/api'; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_URL,
});

export const loginUser = async (credentials:any) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const getUserInfo = async (token:any) => {
  const response = await api.get('/user', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};