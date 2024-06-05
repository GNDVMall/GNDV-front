import axios from 'axios'
import { ref, isRef, unref, watchEffect, onErrorCaptured } from 'vue'

// Axios Config
export const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v2/', // 후에 URL 변경
  timeout: 1000,
  headers:{
    "X-Requested-With":"XMLHttpRequest",
    "Content-Type":"application/json",
    "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyMTAwNTUwMiwiZW1haWwiOiIxMTExQG5hdmVyLmNvbSJ9.VrTUeSIizwLqiAfhKTOWb10mdAPgDoshSYgJYOd0wXF9Vig785ddRNvkICdBjKeAGj9Pjuysa31Z1K_OYmaFBQ"
  }
});

export function useAxios(method, url, input, headers){
  const data = ref(null)
  const error = ref(null)

  headers = headers || {}

  input = JSON.stringify(input)

  function getAxios() {
    data.value = null
    error.value = null

    // watchEffect()에 의해 종속성으로 추적되도록
    // URL 값을 동기식으로 resolve합니다.
    const urlValue = unref(url)

    const methods = {
      get: () => instance.get(urlValue, {
        headers,
      }),
      post: () => instance.post(urlValue, input, {
        headers
      }),
      put: () => instance.put(urlValue, input, {
        headers
      }),
      delete: () => instance.delete(urlValue,{
        headers
      }),
    }

    return methods[method.toLowerCase()];
  }

  if (isRef(url)) {
    // 설정하기: 입력 URL이 ref인 경우 반응적 다시 가져오기
    watchEffect(getAxios)
  }

  return getAxios();
}


// useAxios
export async function useAxios2(method, url, input, headers) {
  const data = ref(null)
  const error = ref(null)

  headers = headers || {}
  headers["X-Requested-With"] = "XMLHttpRequest"
  headers["Content-Type"] = "application/json"
  headers["Authorization"] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyMTAwNTUwMiwiZW1haWwiOiIxMTExQG5hdmVyLmNvbSJ9.VrTUeSIizwLqiAfhKTOWb10mdAPgDoshSYgJYOd0wXF9Vig785ddRNvkICdBjKeAGj9Pjuysa31Z1K_OYmaFBQ"

  input = JSON.stringify(input);

  async function doAxios() {
    data.value = null
    // error.value = null
    error.value = null

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

      const res = 
        await (methods[method.toLowerCase()] || (() => { throw new Error(`Unsupported method: ${method}`) }))();

      data.value = res.data.data;
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
