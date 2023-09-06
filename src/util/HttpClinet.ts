import axios from 'axios';

class HttpClient {
  #baseUrl: string;
  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl;
  }

  get(query: string) {
    console.info('calling api');
    return axios.get(`${this.#baseUrl}${query}`);
  }
}

export const httpClient = new HttpClient('http://localhost:4000/sick?q=');
