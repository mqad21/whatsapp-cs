import axios from "axios";

const baseURL = 'http://209.145.62.202/api/';
const token = '66650bb33e295bc5d621351e6ed53d3a';

export default axios.create({
  baseURL,
  params: {
    token
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
});