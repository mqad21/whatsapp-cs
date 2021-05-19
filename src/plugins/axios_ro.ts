import axios from "axios";

const baseURL = 'http://209.145.62.202/api/rajaongkir/';
const token = localStorage.getItem('token');

export default axios.create({
  baseURL,    
  params: {
    token
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    key: token
  }
});