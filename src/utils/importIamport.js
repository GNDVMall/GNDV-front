export function loadIamportScript() {
    return new Promise((resolve, reject) => {
      if (document.getElementById('iamport-script')) {
        resolve();
        return;
      }
  
      const script = document.createElement('script');
      script.id = 'iamport-script';
      script.src = 'https://cdn.iamport.kr/v1/iamport.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  