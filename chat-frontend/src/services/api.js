import axios from "axios";

const API = "http://localhost:8081";

export const fetchMessages = () => axios.get(`${API}/messages`);
export const sendMsg = (content) => axios.post(`${API}/send`, { content });
export const deleteMsg = (id) => axios.put(`${API}/delete/${id}`);
export const pinMsg = (id) => axios.put(`${API}/pin/${id}`);