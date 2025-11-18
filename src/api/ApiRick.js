import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 10000,
});

export const fetchPersonagens = (page = 1) =>
  api.get(`/character?page=${page}`).then(res => res.data);

export const fetchpersonagemById = (id) =>
  api.get(`/character/${id}`).then(res => res.data);

export default api;