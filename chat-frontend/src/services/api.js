import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

export const fetchMessages = () => axios.get(`${API}/messages`);
export const sendMsg = (content) => axios.post(`${API}/send`, { content });
export const deleteMsg = (id) => axios.put(`${API}/delete/${id}`);
export const pinMsg = (id) => axios.put(`${API}/pin/${id}`);