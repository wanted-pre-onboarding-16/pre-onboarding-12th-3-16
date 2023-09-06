import { AxiosResponse } from 'axios';
import { THttpClient, httpClient } from './HttpClinet';

class QueryCore {
  getHttpRequest: THttpClient;
  #baseQuery: string;
  #deleteCacheTime: number;
  #staleCacheTime: number;
  #millisecond: number;
  #cacheTime: string;
  #diseaseCache: string;
  #staleTime: string;
  constructor() {
    this.getHttpRequest = httpClient;
    this.#baseQuery = '/sick?q=';
    this.#deleteCacheTime = 60;
    this.#staleCacheTime = 10;
    this.#millisecond = 60 * 1000;
    this.#cacheTime = 'Cache Time';
    this.#diseaseCache = 'Disease Cache';
    this.#staleTime = 'Stale Time';
  }
  deleteCacheTimer(inputText: string, deleteCacheTime: number) {
    const currentTime = Date.now();
    setTimeout(async () => {
      await caches.open(this.#cacheTime).then(cache => cache.delete(this.#baseQuery + inputText));
      await caches
        .open(this.#diseaseCache)
        .then(cache => cache.delete(this.#baseQuery + inputText));
      await caches.open(this.#staleTime).then(cache => cache.delete(this.#baseQuery + inputText));
    }, deleteCacheTime - currentTime);
  }
  // 유효기간 스테일이 만료되었을 때 재 요청
  async reRequest(inputText: string) {
    const result = await this.getHttpRequest.get(inputText);
    await this.addCache(inputText, result);
    await this.addStale(inputText, result);
    return result.data;
  }
  // caching 값 확인
  async cacheHit(inputText: string) {
    const result = await caches
      .open(this.#diseaseCache)
      .then(async cache => await cache.match(this.#baseQuery + inputText))
      .then(result => {
        if (result) {
          return result.json();
        }
      });
    return result;
  }
  // stale 값 확인
  async cacheStale(inputText: string) {
    const result = await caches
      .open(this.#staleTime)
      .then(async cache => await cache.match(this.#baseQuery + inputText))
      .then(result => {
        if (result) {
          return result.json();
        }
      });
    return result;
  }
  // 첫 캐치 등록
  async addCache(inputText: string, response: AxiosResponse) {
    const convertAxiosResponseToFatch = new Response(JSON.stringify(response.data), {
      status: response.status,
      statusText: response.statusText,
    });

    await caches
      .open(this.#diseaseCache)
      .then(cache => cache.put(this.#baseQuery + inputText, convertAxiosResponseToFatch));
  }
  // 삭제할 스테일 등록
  async addCacheTime(inputText: string, response: AxiosResponse) {
    const deleteCacheTime = Date.now() + this.#deleteCacheTime * this.#millisecond;
    const cacheTime = new Response(JSON.stringify(deleteCacheTime), {
      status: response.status,
      statusText: response.statusText,
    });

    await caches
      .open(this.#cacheTime)
      .then(cache => cache.put(this.#baseQuery + inputText, cacheTime));
    return this.deleteCacheTimer(inputText, deleteCacheTime);
  }
  // 유효성 스테일 등록
  async addStale(inputText: string, response: AxiosResponse) {
    const staleTime = Date.now() + this.#staleCacheTime * this.#millisecond;

    const cacheStaleTime = new Response(JSON.stringify(staleTime), {
      status: response.status,
      statusText: response.statusText,
    });

    await caches
      .open(this.#staleTime)
      .then(cache => cache.put(this.#baseQuery + inputText, cacheStaleTime));
  }
}

export const query = new QueryCore();
