import axios from 'axios';

// export const BASE_URL = 'http://192.168.86.33:1337'; // RasberryPI or server
export const BASE_URL = 'http://localhost:1337'; // Working in localhost

export default axios.create();
