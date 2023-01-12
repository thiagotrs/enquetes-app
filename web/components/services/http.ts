import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API
})
http.defaults.headers.common['Content-Type'] = 'application/json';
http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default http;

export const getErrorMessage = (error: Error) => {
  if (axios.isAxiosError(error) && error.response) {
    if(error.response.status === 401) return error.response.data.message
  }
  return error.message
}