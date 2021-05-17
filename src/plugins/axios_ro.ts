import axios from "axios";

const env = process.env.NODE_ENV;

const baseURL = env == 'development' ? 'http://209.145.62.202/api/rajaongkir/' : 'http://209.145.62.202/api/rajaongkir/';
const token = env == 'development' ? '66650bb33e295bc5d621351e6ed53d3a' : '66650bb33e295bc5d621351e6ed53d3a';

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