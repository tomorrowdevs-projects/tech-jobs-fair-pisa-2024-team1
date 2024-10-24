import axios from 'axios';
import { Report } from '../types';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getReports = async () => {
  return await axios.get(baseUrl);
};

export const getReport = async (id: string) => {
  return await axios.get(baseUrl + id);
};

export const createReport = async (createRequest: Report) => {
  return await axios.post(baseUrl, createRequest);
};

export const updateReport = async (updateRequest: Report) => {
  return await axios.put(
    baseUrl + updateRequest?.id?.toString(),
    updateRequest
  );
};

export const deleteReport = async (reportId: number) => {
  return await axios.delete(baseUrl + reportId.toString());
};
