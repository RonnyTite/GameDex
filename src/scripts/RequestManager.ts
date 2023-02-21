import axios from 'axios';

const BASE_URL = ''; // RasberryPI or server

export default axios.create({
  baseURL: BASE_URL,
});
