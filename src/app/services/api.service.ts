import {Injectable} from '@angular/core';
import {API} from 'aws-amplify';
import {environment} from '../../environments/environment';
import {AxiosResponse} from 'axios';
import {HttpError} from '../errors/http.error';
import * as Case from 'case';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private auth: AuthenticationService) {
  }

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
        const hasDash = key.search('-') >= 0;
        converted[!hasDash ? Case.camel(key) : key] = this.toCamelCase(value);
      });
      return converted;
    } else {
      return object;
    }
  }
  normalizeEndpoint(endpoint: string): string {
    if (endpoint.length > 0  && endpoint[endpoint.length - 1] !== '/') {
      endpoint += '/';
    }
    return this.auth.isLoggedIn ? endpoint : `${endpoint}public`;
  }

  async get<T>(endpoint: string, queryParams?: object): Promise<T> {
    endpoint = this.normalizeEndpoint(endpoint);

    let response: AxiosResponse<T>;
    try {
      response = await API.get(ApiService.apiName, endpoint, {
        response: true,
        queryStringParameters: queryParams,
      });
    } catch (err) {
      const r: AxiosResponse | null = err.response ?? null;
      throw HttpError.factory(endpoint, r?.status ?? 502, undefined, r?.data);
    }
    return ApiService.toCamelCase(response.data) as T;
  }

  async post<T>(endpoint: string, body: object): Promise<T> {
    endpoint = this.normalizeEndpoint(endpoint);

    let response: AxiosResponse<T>;
    try {
      response = await API.post(ApiService.apiName, endpoint, {
        response: true,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body
      });
    } catch (err) {
      const r: AxiosResponse | null = err.response ?? null;
      throw HttpError.factory(endpoint, r?.status ?? 502, undefined, r?.data);
    }
    return response.data;
  }
}
