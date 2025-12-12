import axios, { AxiosError, AxiosInstance } from "axios";
import Constants from "expo-constants";

const API_KEY = Constants.expoConfig?.extra?.tmdbApiKey;
const BASE_URL = "https://api.themoviedb.org/3";

if (!API_KEY) {
  console.warn("TMDB_API_KEY가 설정되지 않았습니다. .env 파일을 확인해주세요.");
}

const COMMON_CONFIG = {
  params: {
    api_key: API_KEY,
    language: "ko-KR",
  },
  timeout: 10000, // 10초 타임아웃
};

const createApiInstance = (baseURL: string | undefined): AxiosInstance => {
  if (baseURL === undefined) baseURL = BASE_URL;

  const instance = axios.create({
    baseURL,
    ...COMMON_CONFIG,
  });

  // 요청 인터셉터 (선택사항)
  instance.interceptors.request.use(
    (config) => {
      // 요청 전 로깅 등 필요한 작업 수행 가능
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터 (에러 처리)
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        // 서버가 응답했지만 에러 상태 코드
        console.error("API 에러:", error.response.status, error.response.data);
      } else if (error.request) {
        // 요청이 전송되었지만 응답을 받지 못함
        console.error("네트워크 에러:", error.request);
      } else {
        // 요청 설정 중 에러 발생
        console.error("에러:", error.message);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const tmdbApiInstance: AxiosInstance = createApiInstance(BASE_URL);
