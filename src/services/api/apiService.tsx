import { BASE_URL } from '../../utils/constants';
import axios, { AxiosResponse } from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: `${BASE_URL}`, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the token to the headers
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch {

      return Promise.reject("");
    }
  },
  (error) => {

    //window.location.href = '/login';
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code === "ERR_NETWORK" || error.code === "ERR_BAD_REQUEST") {
      alert("Please check your internet")
   //   window.location.href = '/login';
    }
    // Handle token expiration or other errors here
    if (error.response?.status === 200) {
    
      // Optionally, redirect to login page
     window.location.href = '/login';
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

export const postTrementTrendData = async (data: any): Promise<AxiosResponse> => {
  try {
    const response = await api.post('/data/dhis', data);
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

export const getReportDates = async (data: any): Promise<AxiosResponse> => {
  try {
    const response = await api.get('/data/get-vl-report-date');
    return response;
  } catch (error) {
    console.error('Error posting retention data:', error);
    throw error;
  }
};

export const postViralloadAgeData = async (data: any): Promise<AxiosResponse> => {
  try {
    const response = await api.post('/data/get-pvls-age-band',data);
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



