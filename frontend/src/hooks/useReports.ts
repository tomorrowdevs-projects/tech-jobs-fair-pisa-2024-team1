import { atom } from 'nanostores';
import { Report } from '../types';
import { useStore } from '@nanostores/react';
import { createReport, deleteReport, getReports, updateReport } from '../api';
import { useState } from 'react';

export const $allReports = atom<Report[]>([]);

export const useReports = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const allReports = useStore($allReports);

  const findReports = async () => {
    try {
      setLoading(true);
      const { data } = await getReports();
      $allReports.set(data);
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const addReport = async (report: Report) => {
    try {
      setLoading(true);
      const { data } = await createReport(report);
      setLoading(false);
      findReports();
      return data;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const editReport = async (report: Report) => {
    try {
      setLoading(true);
      const { data } = await updateReport(report);
      setLoading(false);
      findReports();
      return data;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const removeReport = async (reportId: number) => {
    await deleteReport(reportId);
  };

  return {
    loading,
    allReports,
    findReports,
    addReport,
    editReport,
    removeReport,
  };
};
