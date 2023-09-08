import axios, { AxiosResponse } from 'axios';

export interface THttpClient {
  get: (query: string) => Promise<AxiosResponse>;
}

class HttpClient implements THttpClient {
  #baseUrl: string;
  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl;
  }

  get(query: string) {
    console.info('calling api');
    return axios.get(`${this.#baseUrl}${query}`);
  }
}

export const httpClient = new HttpClient('https://json-server-vercel-silk.vercel.app/sick?q=');
