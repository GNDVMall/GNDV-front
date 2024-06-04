import axios from 'axios';
import { ref, isRef, unref, watchEffect } from 'vue';

// Axios Config
const instance = axios.create({
  baseURL: 'http://localhost:8080/', // 후에 URL 변경
  timeout: 1000,
});

// useAxios
export function useAxios(method, url, input, headers) {
  const data = ref(null);
  const error = ref(null);
  headers = headers || {};
  headers['X-Requested-With'] = 'XMLHttpRequest';
  headers['Content-Type'] = 'application/json';
  headers['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyMTA2ODQxMiwiZW1haWwiOiIxMTExQG5hdmVyLmNvbSJ9.R0GysD-ISeKktJZhzXnPMwrGbm8dRROO1QBiGGgZHTvYeNUcahbMorMRM-3GhKYeASdzFlu0Cuf2Biim3F0qFw';
  // 인증 토큰 추가 (로컬 스토리지에서 토큰을 가져오는 방법 사용)
  const token = localStorage.getItem('authToken'); // 또는 다른 방식으로 토큰을 가져옵니다.
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  input = JSON.stringify(input);

  async function doAxios() {
    data.value = null;
    error.value = null;

    // watchEffect()에 의해 종속성으로 추적되도록
    // URL 값을 동기식으로 resolve합니다.
    const urlValue = unref(url);

    try {
      const methods = {
        get: () => instance.get(urlValue, { headers }),
        post: () => instance.post(urlValue, input, { headers }),
        put: () => instance.put(urlValue, input, { headers }),
        delete: () => instance.delete(urlValue, { headers }),
      };

      const res = await (methods[method.toLowerCase()] || (() => { throw new Error(`Unsupported method: ${method}`) }))();
      data.value = res.data;
    } catch (e) {
      error.value = e;
    }
  }

  if (isRef(url)) {
    // 설정하기: 입력 URL이 ref인 경우 반응적 다시 가져오기
    watchEffect(doAxios);
  } else {
    // 그렇지 않으면 한 번만 가져오기
    doAxios();
  }

  return { data, error, retry: doAxios };
}
