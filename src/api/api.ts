import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getDataRequest = <T>(url: string) => apiInstance.get<T>(url);

export const deletePostRequest = <T>(url: string) => apiInstance.delete<T>(url);
