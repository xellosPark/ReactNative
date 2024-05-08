
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { jwtDecode } from "jwt-decode";
import { decode as base64decode } from 'base-64';


// Decoding function that replaces jwt-decode for React Native
function decodeJWT(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid token: The JWT must have three parts');
        }

        const header = JSON.parse(base64decode(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
        const payload = JSON.parse(base64decode(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

        console.log("Decoded Header:", header);
        console.log("Decoded Payload:", payload);

        return { header, payload };
    } catch (error) {
        console.error("Failed to decode JWT:", error);
        return null;
    }
}


// API 사용을 위한 Axios 인스턴스 생성
const api = axios.create({
  //baseURL: 'http://localhost:3000', // 실제 API 서버 URL로 조정하세요
  //baseURL: 'http://192.168.0.136:8877', // 실제 API 서버 URL로 조정하세요
  //baseURL: 'http://192.168.0.140:8877', // 실제 API 서버 URL로 조정하세요
  baseURL:  `http://14.58.108.70:8877`,
});

// 요청 인터셉터
api.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        const decoded = decodeJWT(token);
        if (!decoded) {
          console.error("토큰 디코드 에러");
          return config;
        }
  
        const currentTime = Date.now() / 1000;
        const isTokenExpired = decoded.payload.exp < currentTime;
  
        if (!isTokenExpired) {
          config.headers['Authorization'] = `Bearer ${token}`;
          console.log("헤더에 토큰 첨부됨");
        } else {
          console.log("토큰이 만료됨");
          const newToken = await refreshTokenAndRetryRequest(config);
          if (newToken) {
              config.headers['Authorization'] = `Bearer ${newToken}`;
              console.log("Header updated with new token");
          } else {
              console.log("Token update failed");
              // Processing logic if token renewal fails
              // Example: Redirect to login screen
          }
        }
      }
      return config;
    },
    error => Promise.reject(error)
  );
  

// 토큰 만료로 인해 403 에러가 발생했을 때 자동으로 토큰을 새로 고치고 요청을 재시도하기 위한 응답 인터셉터 추가
api.interceptors.response.use( response => response, // 에러가 없는 모든 응답을 통과시킴
  async (error) => {
    console.log("오류 발생 74");
    const originalRequest = error.config;
    //console.log("오류 발생 76",originalRequest);
    console.log("오류 발생 77");
    console.log("오류 발생 79 status =  ",  error.response.status, originalRequest._retry);
    if (error.response.status === 403 && !originalRequest._retry) { // 에러가 만료된 토큰 때문이고 요청이 재시도되지 않았다면
        console.log("오류 발생 81");
      originalRequest._retry = true; // 이 요청을 재시도된 것으로 표시
      console.log("api.interceptors.response.use 28 403 오류");
      return refreshTokenAndRetryRequest(originalRequest); // 토큰을 새로 고치고 원래 요청을 다시 시도하는 함수를 호출
    }
    console.log("오류 발생 84");
    return Promise.reject(error); // 403 에러가 아닌 경우, 프로미스를 거부함
  }
);

// 토큰을 새로 고치고 원래 요청을 다시 시도하는 함수
async function refreshTokenAndRetryRequest(originalRequest) {
  try {
    console.log("refreshTokenAndRetryRequest 92 재발급");
    const refreshToken = await AsyncStorage.getItem('refreshToken'); // 저장소에서 리프레시 토큰을 검색
    console.log("refreshToken 94",refreshToken);
    console.log("refreshToken 95",api.defaults.baseURL);
    const { data } = await axios.post(`${api.defaults.baseURL}/refresh`, { refreshToken }); // 리프레시 토큰을 사용해 액세스 토큰을 새로 고침
    console.log("refreshToken 96",data);
    const { accessToken } = data; // 응답에서 새 액세스 토큰 추출
    await AsyncStorage.setItem('accessToken', accessToken); // 새 액세스 토큰을 AsyncStorage에 저장
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`; // Axios 기본 Authorization 헤더를 업데이트
    return api(originalRequest); // 새 토큰으로 원래 요청을 재시도
  } catch (refreshError) {
    console.log('토큰 새로 고침 실패:'); // 토큰 새로 고침 과정에서 발생한 오류 로그
    console.error('토큰 새로 고침 실패:', refreshError); // 토큰 새로 고침 과정에서 발생한 오류 로그
    return Promise.reject(refreshError); // 토큰 새로 고침 실패 시, 프로미스를 거부함
  }
}

export default api;