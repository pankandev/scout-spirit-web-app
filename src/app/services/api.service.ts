import {Injectable} from '@angular/core';
import {API} from 'aws-amplify';
import {environment} from '../../environments/environment';
import {AxiosResponse} from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private static get apiName(): string {
    return environment.apiName;
  }

  async get<T>(endpoint: string, queryParams?: object): Promise<T> {
    const response: AxiosResponse<T> = await API.get(ApiService.apiName, endpoint, {
      response: true,
      queryStringParameters: queryParams,
    });
    return response.data as T;
  }

  async post<T>(endpoint: string, body: object): Promise<T> {
    const response: AxiosResponse<T> = await API.post(ApiService.apiName, endpoint, {
      response: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body
    });
    return response.data;
  }
}
