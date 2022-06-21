import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com'
});

export const getProducts = (pageNumber = 0, pageSize = 10) => 
  api.get(`/products?limit=${pageSize}&skip=${pageSize * pageNumber}`)