import {Injectable} from '@angular/core';
import {API} from 'aws-amplify';
import {environment} from '../../environments/environment';
import {AxiosResponse} from 'axios';
import {HttpError} from '../errors/http.error';
import * as Case from 'case';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private static get apiName(): string {
    return environment.apiName;
  }

  public static toCamelCase(object: any): any {
    if (!object) {
      return object;
    } else if (Array.isArray(object)) {
      return object.map(o => this.toCamelCase(o));
    } else if (typeof object === 'object') {
      const converted: any = {};
      Object.entries(object).forEach(([key, value]) => {
        converted[Case.camel(key)] = this.toCamelCase(value);
      });
      return converted;
    } else {
      return object;
    }
  }

  async get<T>(endpoint: string, queryParams?: object): Promise<T> {
    let response: AxiosResponse<T>;
    try {
      response = await API.get(ApiService.apiName, endpoint, {
        response: true,
        queryStringParameters: queryParams,
      });
    } catch (err) {
      throw HttpError.factory(err.response?.status ?? 502);
    }
    return ApiService.toCamelCase(response.data) as T;
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
