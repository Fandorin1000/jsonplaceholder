import axios from "axios";
import { TPost } from "types";

type Body = {
  body: TPost;
};

export const apiInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: { "Content-type": "application/json; charset=UTF-8" },
});

export const getDataRequest = <T>(url: string) => apiInstance.get<T>(url);

export const deletePostRequest = <T>(url: string) => apiInstance.delete<T>(url);

export const editPostRequest = <T>(url: string, body: TPost) =>
  apiInstance.put<T>(url, body);
