import {Injectable} from '@angular/core';
import {API} from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiName = 'PPSAPI';

  async get<T>(endpoint: string, queryParams?: object): Promise<T> {
    const response: any = await API.get(this.apiName, endpoint, {
      response: true,
      queryStringParameters: queryParams,
    });
    return response as T;
  }

  async post<T>(endpoint: string, body: object): Promise<T> {

    const response: any = await API.post(this.apiName, endpoint, {
      response: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body
    });
    return response as T;
  }
}
