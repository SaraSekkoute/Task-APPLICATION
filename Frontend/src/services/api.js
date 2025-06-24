import axios from 'axios';

const API_BASE = "http://localhost:8083/api"; 

export const getUsers = () => axios.get(`${API_BASE}/users`);
export const getUser = (id) => axios.get(`${API_BASE}/users/${id}`);
export const createUser = (data) => axios.post(`${API_BASE}/users`, data);
export const updateUser = (id, data) => axios.put(`${API_BASE}/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API_BASE}/users/${id}`);

