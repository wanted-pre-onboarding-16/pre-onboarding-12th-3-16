# 👹 원티드 프리온보딩 3주차 과제 👹

## 1. 개요

- 🦁 본 페이지는 원티드 프리온보딩 인턴십 3주차 팀과제를 위한 리드미입니다.
- 🏨 해당 repository는 3주차 작업물을 바탕으로 best practice를 선발하여 refactoring을 거친 작업물입니다.
- 🌤️ 깃헙 이슈 전체 페이지, 상세 페이지로 구성되어 있습니다.

## 2. 팀원 구성 및 역할

- 🙋🏻‍♀️ 김대윤 : 스크럼 마스터 및 팀장 [🔗GitHub](https://github.com/apeachicetea)
- 🙋🏼‍♂️ 유승국 : 최종 코드 리뷰어 [🔗GitHub](https://github.com/SeungGukYoo)
- 🙋🏼‍♂️ 윤새한 : Git 관리 및 성능최적화, 접근성 [🔗GitHub](https://github.com/ovelute53)

## 3. 프로젝트 목표

### 🎇동료학습을 통하여 기업 취업을 위한 온보딩으로 개개인 및 팀의 성장 도모🎇

## 4. 배포 URL 및 사용법

[🔗 배포링크](https://pre-onboarding-12th-3-16.vercel.app/)

1. 검색어를 입력
2. 찾고자 하는 값이 있다면 결과가 나오고 그렇지 않다면 "검색어 없음"이 출력
3. 검색어를 입력한 후에 키보드 "위" 혹은 "아래" 버튼을 눌러 이동

**API서버가 Json-server+Vercel로 이루어져있어 간혹 데이터를 가져오지 못하는 경우가 있습니다.**</br>
**그런 경우에는 새로고침을 한번 해주시면 감사하겠습니다.**

## 5. 프로젝트 구조

<img width="267" alt="스크린샷 2023-09-08 오전 10 24 32" src="https://github.com/wanted-pre-onboarding-16/pre-onboarding-12th-2-16/assets/119836116/de16557c-cbf8-47fe-bb84-6c699f9e6635">

## 6. 기술 스택

<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img height=20 src="https://img.shields.io/badge/postcss-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white"> <img height=20 src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> <img 
 height=20 src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
<img 
 height=20 src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
<img 
 height=20 src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">

## 7. UI

1. 기본 상태

   <img width="692" alt="스크린샷 2023-09-08 오전 10 32 23" src="https://github.com/wanted-pre-onboarding-16/pre-onboarding-12th-2-16/assets/119836116/ab297569-5f3a-4f00-ab2b-6c233a2988fd">

2. 검색어 입력 전

   <img width="692" alt="스크린샷 2023-09-08 오전 10 32 30" src="https://github.com/wanted-pre-onboarding-16/pre-onboarding-12th-2-16/assets/119836116/186688c2-5cfd-4d72-867f-1e43bb362db2">

3. 검색어 입력 후

   <img width="692" alt="스크린샷 2023-09-08 오전 10 32 43" src="https://github.com/wanted-pre-onboarding-16/pre-onboarding-12th-2-16/assets/119836116/94c91b80-2894-4d4a-9776-c2e84b0f36a9">

## 8. 캐싱 및 API 호출 전략

캐싱 라이브러리로 유명한 React-query가 동작하는 방식을 참고하여 제작하였습니다.

### 캐싱에 사용된 기술

- Cache API (브라우저 자체 제공)

### 캐싱 구현 방법

캐싱 기술을 구현할 때 고려해야할 점은 적절한 데이터를 캐싱하며, 적절한 시점에 캐싱된 데이터를 파기하는 과정이 존재해야 한다.
또한 캐싱된 데이터가 신선한(stale)값인지를 구분해야 한다.

그렇기에 캐싱을 위해 필요한 과정은 총 3가지가 있다.

1. 데이터 캐싱
2. 캐싱된 데이터 파기
3. 값의 유효기간 확인(stale)

위 과정은 캐싱 값과 유효기간(stale)값에 따라 유기적으로 동작하기 때문에 캐싱을 위한 동작들을 Class로 관리하여 모듈화 하였습니다.

### 캐싱 과정

요약한 전체적인 과정은 아래와 같습니다.

<img width="600" alt="스크린샷 2023-09-08 오전 2 02 57" src="https://github.com/SeungGukYoo/pre-onboarding-3weeks/assets/119836116/86540939-658b-424d-a531-e0ccc9a7e31b">

### 캐싱 구현 코드

데이터를 관리하기 위한 캐시의 동작방식은 아래와 같습니다.

1. 캐시 스토리지에 저장된 데이터와 stale값을 찾기 위해 사용자로부터 값을 바탕으로 일치하는 주소를 찾아 오게 됩니다.

   ```ts
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
   ```

2. `cacheHit`으로부터 받은 값을 바탕으로 캐싱된 값이 없다면 캐싱을 해주고, 캐싱이 되었다면 stale값을 확인합니다.

   - 캐싱된 값이 있는 경우

     stale 캐시 스토리지에서 해당 캐싱값의 stale 값을 비교하여 캐싱된 값이 stale하지 않는 다고 판단하면 API를 재요청을 하고 받은 값을 바탕으로 데이터와 stale 값을 업데이트 과정을 거치고 리렌더링이 발생하게 됩니다.

     값이 stale하다고 판단하면 그대로 반환하여 리렌더링을 발생시킵니다.

     ```ts
       async reRequest(inputText: string) {
         const result = await this.getHttpRequest.get(inputText);
         await this.addCache(inputText, result);
         await this.addStale(inputText, result);
         return result.data;
       }
     ```

   - 캐싱된 값이 없는 경우

     서버로부터 API 요청을 한 후에 받은 응답을 바탕으로 캐싱하는 과정을 거치게 됩니다.
     API 로부터 응답받은 값을 캐싱하는 `addCache`와 응답받은 값의 stale 시간을 캐싱하는 `addStale`, 마지막으로 캐시 스토리지에서 삭제될 시간을 캐싱하는 `addCacheTime`의 과정을 통해 캐싱되게 됩니다.

     Axios를 사용하고 있었기 때문에 Cache API를 사용하기 위해서 fetch형태의 응답으로 변환해준후에 캐시에 저장되어 집니다.

     캐시 스토리이지에서 캐싱된 데이터를 삭제하는 메소드인 `addCacheTime` 메소드는 실행시키며 종료하게 됩니다.

     ```ts
     async addCache(inputText: string, response: AxiosResponse) {
         const convertAxiosResponseToFatch = new Response(JSON.stringify(response.data), {
           status: response.status,
           statusText: response.statusText,
         });
         await caches
           .open(this.#diseaseCache)
           .then(cache => cache.put(this.#baseQuery + inputText, convertAxiosResponseToFatch));
       }

      async addCacheTime(inputText: string, response: AxiosResponse) {
         ...
         return this.deleteCacheTimer(inputText, deleteCacheTime);
       }

     async addStale(inputText: string, response: AxiosResponse) {
         ...
       }
     ```

3. **2번(캐싱된 값이 없는 경우)** 과정에서 실행된 `deleteCacheTimer` 메소드는 생성된 3개의 캐시 스토리지에서 전달받은 값을 바탕으로 주소를 찾은 후에 일치하는 캐싱 데이터를 없앰으로써 전체적인 캐시 스토리지를 관리하는 역할을 하고 있습니다.

   ```ts
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
   ```

### API 호출 전략

모든 API를 요청하기 전에 캐싱값을 거친 후에 API 호출이 발생하게 됩니다.

#### 캐싱을 통한 API 호출 전략

- **값이 stale하지 않는 경우**
  캐싱된 값이 stale하지 않고 서버에서 바뀌었을 수 있다고 판단하여 설정해 놓은 시간이 지난 후에는 API를 다시 호출한다.
  그로인해 캐싱 값이 stale한 경우에는 API에 요청을 하지 않고 계속해서 재사용하고 있습니다.

- **값이 캐싱되지 않거나, 캐시 스토리지에서 삭제된 경우**
  캐싱되지 않은 값의 경우와 캐시 스토리지에서 삭제가 된 값의 경우에는 API를 호출하여 값을 캐싱하고 있습니다.

#### 디바운싱을 통한 API 호출 전략

- **디바운싱**
  입력 창에 값을 입력할 때 데이터가 호출이 되게 되는데, 디바운싱 기법을 통해서 정해놓은 시간동안 동일한 이벤트가 계속해서 발생한다면 API에 요청을 하지 않고, 이벤트가 일정시간동안 발생하지 않는다면 그떄 API에 요청을 하게됩니다.
  그로인해 입력하는 이벤트가 많이 발생하는 경우애도 글자 혹은 단어가 완성되기 전까지는 API 요청이 발생하지 않습니다.
