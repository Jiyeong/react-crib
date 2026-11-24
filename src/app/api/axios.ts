import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});
// jadooApiV1/previewInfo
// 요청 인터셉터
api.interceptors.request.use(
    config => {
      // 요청 전에 수행할 작업
      // 예: 토큰 추가
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);

// 응답 인터셉터
api.interceptors.response.use(
    response => response,
    error => {
      // 에러 처리
      if (error.response?.status === 401) {
        // 인증 에러 처리
      }
      return Promise.reject(error);
    }
);

export default api;