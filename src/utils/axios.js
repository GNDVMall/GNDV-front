import axios from 'axios';
import { ref, isRef, unref, watchEffect } from 'vue';

// Axios Config
const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v2/', // 후에 URL 변경
  timeout: 1000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
});

export function useAxios(method, url, input = {}, headers = {}, token = '') {
  const data = ref(null);
  const error = ref(null);

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  input = JSON.stringify(input);

  async function doAxios() {
    data.value = null;
    error.value = null;

    const urlValue = unref(url);

    try {
      console.log(`Request: ${method.toUpperCase()} ${urlValue}`, input, headers);
      const methods = {
        get: () => instance.get(urlValue, { headers }),
        post: () => instance.post(urlValue, input, { headers }),
        put: () => instance.put(urlValue, input, { headers }),
        delete: () => instance.delete(urlValue, { headers }),
      };

      const res = await (methods[method.toLowerCase()] || (() => { throw new Error(`Unsupported method: ${method}`) }))();
      console.log('Response:', res);
      data.value = res.data;
    } catch (e) {
      console.error('Error:', e);
      error.value = e;
    }
  }

  if (isRef(url)) {
    watchEffect(doAxios);
  } else {
    doAxios();
  }

  return { data, error, retry: doAxios };
}
