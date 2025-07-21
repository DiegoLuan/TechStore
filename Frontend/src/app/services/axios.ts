import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { PagedResponse } from '../../Interfaces';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: "http://localhost:3000/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  async getAll<T>(url: string, params?: any): Promise<T[]> {
    const response = await this.axiosClient.get<T>(url, { params });
    return response.data as T[];
  }

  async getById<T>(url: string, id: number, params?: any): Promise<T | null> {
    const response = await this.axiosClient.get<T>(`${url}/${id}`);
    return response.data ? response.data as T : null;
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response = await this.axiosClient.post<T>(url, data);
    return response.data;
  }

  async getAllPaged<T>(url: string, page: number, size: number): Promise<PagedResponse<T>> {
    const response = await this.axiosClient.post<PagedResponse<T>>(`${url}/paged`, { page, size });
    return response.data;
  }
}
