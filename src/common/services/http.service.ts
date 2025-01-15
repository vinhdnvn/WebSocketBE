import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class HttpService {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await axios.get<T>(url, config);
      return response.data;
    } catch (error) {
      console.error('HTTP GET Error:', error.message);
      throw error;
    }
  }

  async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await axios.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      console.error('HTTP POST Error:', error.message);
      throw error;
    }
  }
  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await axios.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      console.error('HTTP PUT Error:', error.message);
      throw error;
    }
  }
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await axios.delete<T>(url, config);
      return response.data;
    } catch (error) {
      console.error('HTTP DELETE Error:', error.message);
      throw error;
    }
  }
  async patch<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await axios.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      console.error('HTTP PATCH Error:', error.message);
      throw error;
    }
  }
}
