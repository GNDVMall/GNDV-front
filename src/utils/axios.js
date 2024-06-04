import axios from 'axios'
import { ref, isRef, unref, watchEffect } from 'vue'

// Axios Config
const instance = axios.create({
  baseURL: 'http://localhost:8080/api/', // 후에 URL 변경
  timeout: 1000,
});


// useAxios
export function useAxios(method, url, input, headers) {
  const data = ref(null)
  const error = ref(null)
  headers = headers || {}
  headers["X-Requested-With"] = "XMLHttpRequest"
  headers["Content-Type"] = "application/json"

  input = JSON.stringify(input)

  async function doAxios() {
    data.value = null
    error.value = null

    // watchEffect()에 의해 종속성으로 추적되도록
    // URL 값을 동기식으로 resolve합니다.
    const urlValue = unref(url)

    try {
      // axios method mapping
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

      const res = await (methods[method.toLowerCase()] || (() => { throw new Error(`Unsupported method: ${method}`) }))();
      data.value = res.data;
    } catch (e) {
      error.value = e
    }
  }

  if (isRef(url)) {
    // 설정하기: 입력 URL이 ref인 경우 반응적 다시 가져오기
    watchEffect(doAxios)
  } else {
    // 그렇지 않으면 한 번만 가져오기
    doAxios()
  }

  return { data, error, retry: doAxios }
}