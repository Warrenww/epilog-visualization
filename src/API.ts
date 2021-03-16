import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  // baseURL: 'http://140.113.214.177:8080',
  timeout: 600000,
});

/**
 * catch error from server's response
 * if we dont do this, we have to get server message from
 * error.response.data.error.message every time
 */
instance.interceptors.response.use(
  (response: any) => response,
  (error: any) => Promise.reject(error?.response?.data?.error),
);

export default instance;
