import {Injectable} from '@angular/core';
import {API} from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiName = 'PPSAPI';
  private readonly prefix = '/api/';

  private getEndpoint(path: string): string {
    if (path.length > 0 && path[0] === '/') {
      path = path.substring(1);
    }
    return this.prefix + path;
  }

  async get<T>(path: string, queryParams?: object): Promise<T> {
    const endpoint = this.getEndpoint(path);

    const response: any = await API.get(this.apiName, endpoint, {
      response: true,
      queryStringParameters: queryParams,
    });
    return response as T;
  }

  async post<T>(path: string, body: object): Promise<T> {
    const endpoint = this.getEndpoint(path);

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
