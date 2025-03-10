import axios from "./axios-instance";

export const httpClient = {
  get: async <T>(url: string, params?: Record<string, any>): Promise<T> => {
    const response = await axios.get<T>(url, { params });
    return response.data;
  },
  post: async <T>(url: string, data?: any): Promise<T> => {
    const response = await axios.post<T>(url, data);
    return response.data;
  },
  put: async <T>(url: string, data?: any): Promise<T> => {
    const response = await axios.put<T>(url, data);
    return response.data;
  },
  delete: async <T>(url: string): Promise<T> => {
    const response = await axios.delete<T>(url);
    return response.data;
  },
};