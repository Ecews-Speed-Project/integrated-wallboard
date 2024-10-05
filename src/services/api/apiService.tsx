import axios, { AxiosResponse } from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://eboard.ecews.org/api', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the token to the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle token expiration or other errors here
    if (error.response?.status === 401) {
      // Optionally, redirect to login page
     // window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  }
);
export default api;


export const postRetentionData = async (data: any): Promise<AxiosResponse> => {
  try {
    const response = await api.post('/data/retention_data', data);
    return response;
  } catch (error) {
    console.error('Error posting retention data:', error);
    throw error;
  }
};

export const postViralloadData = async (data: any): Promise<AxiosResponse> => {
  try {
    const response = await api.post('/data/vl_data', data);
    return response;
  } catch (error) {
    console.error('Error posting retention data:', error);
    throw error;
  }
};

export const postViralloadAgeData = async (data: any): Promise<AxiosResponse> => {
  try {
    const response = await api.post('/data/vl_age_sex_data', data);
    return response;
  } catch (error) {
    console.error('Error posting retention data:', error);
    throw error;
  }
};

export const postSummaryData = async (data: any): Promise<AxiosResponse> => {
  try {
    const response = await api.post('/data/sormas', data);
    return response;
  } catch (error) {
    console.error('Error posting retention data:', error);
    throw error;
  }
};



