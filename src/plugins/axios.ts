import router from "@/router";
import axios from "axios";

const baseURL = 'http://209.145.62.202/api/';
const params = new URLSearchParams(window.location.search);
const token = params.get('token') || localStorage.getItem('token');


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