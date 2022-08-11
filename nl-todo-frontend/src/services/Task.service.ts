import { AxiosResponse } from 'axios';
import axiosInstance from '../middleware/axios.interceptors';
import { Task } from '../models/Task';
import { responseStatus } from '../utils/constants';

let showReponsesInConsole = process.env.REACT_APP_SHOW_RESPONSES_IN_CONSOLE;

const baseUrl = '/todos';

export const TasksService = {
  getTasks: async () => {
    let response: AxiosResponse | undefined;
    try {
      response = await axiosInstance.get(`${baseUrl}/`);
      if (response && responseStatus.SUCCESS.includes(response.status)) {
        return response;
      }
    } catch (err) {
      console.log('Error in TasksService.getTasks', err);
    } finally {
      if (showReponsesInConsole) {
        console.log('TasksService.getTasks', response);
      }
    }
  },

  getTask: async (id: number) => {
    let response: AxiosResponse | undefined;
    try {
      response = await axiosInstance.get(`${baseUrl}/${id}/`);
      if (response && responseStatus.SUCCESS.includes(response.status)) {
        return response;
      }
    } catch (err) {
      console.log('Error in TasksService.getTask', err);
    } finally {
      if (showReponsesInConsole) {
        console.log('TasksService.getTask', response);
      }
    }
  },

  createTask: async (data: Task) => {
    let response: AxiosResponse | undefined;
    try {
      response = await axiosInstance.post(`${baseUrl}/`, data);
      if (response && responseStatus.SUCCESS.includes(response.status)) {
        return response;
      }
    } catch (err) {
      console.log('Error in TasksService.createTask', err);
    } finally {
      if (showReponsesInConsole) {
        console.log('TasksService.createTask', response);
      }
    }
  },

  updateTask: async (data: Task) => {
    let response: AxiosResponse | undefined;
    try {
      response = await axiosInstance.patch(`${baseUrl}/${data.id}/`, data);
      if (response && responseStatus.SUCCESS.includes(response.status)) {
        return response;
      }
    } catch (err) {
      console.log('Error in TasksService.updateTask', err);
    } finally {
      if (showReponsesInConsole) {
        console.log('TasksService.updateTask', response);
      }
    }
  },

  deleteTask: async (id: string) => {
    let response: AxiosResponse | undefined;
    try {
      response = await axiosInstance.delete(`${baseUrl}/${id}/`);
      if (response && responseStatus.SUCCESS.includes(response.status)) {
        return response;
      }
    } catch (err) {
      console.log('Error in TasksService.deleteTask', err);
    } finally {
      if (showReponsesInConsole) {
        console.log('TasksService.deleteTask', response);
      }
    }
  },
};
