import axios from 'axios'

const API_ROOT = 'http://localhost:3001'

let token = localStorage.getItem('token');

if (!token) {
    token = 'usharma!@#'
    localStorage.setItem('token', token)
}

let client = axios.create({
  baseURL: API_ROOT,
});

client.defaults.headers.common['Authorization']=token;
client.defaults.headers.post['Content-Type'] = 'application/json'

export default client