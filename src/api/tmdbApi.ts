import axios from "axios";
import type { Movie, MovieDetails, MoviesResponse } from "../types/movie";
import { tmdbApiInstance } from "./config/instance";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// 타입 re-export (기존 코드와의 호환성을 위해)
export type { Movie, MovieDetails, MoviesResponse };

// 인기 영화 목록 가져오기
export const getPopularMovies = async (page: number = 1): Promise<MoviesResponse> => {
  try {
    const response = await tmdbApiInstance.get<MoviesResponse>("/movie/popular", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`영화 목록을 가져오는데 실패했습니다: ${error.message}`);
    }
    throw new Error("영화 목록을 가져오는데 실패했습니다.");
  }
};

// 영화 상세 정보 가져오기
export const getMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  try {
    const response = await tmdbApiInstance.get<MovieDetails>(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`영화 상세 정보를 가져오는데 실패했습니다: ${error.message}`);
    }
    throw new Error("영화 상세 정보를 가져오는데 실패했습니다.");
  }
};

// 포스터 이미지 URL 생성
export const getPosterUrl = (posterPath: string | null): string => {
  if (!posterPath) {
    return "https://via.placeholder.com/500x750?text=No+Image";
  }
  return `${IMAGE_BASE_URL}${posterPath}`;
};

// 배경 이미지 URL 생성
export const getBackdropUrl = (backdropPath: string | null): string => {
  if (!backdropPath) {
    return "https://via.placeholder.com/1280x720?text=No+Image";
  }
  return `https://image.tmdb.org/t/p/w1280${backdropPath}`;
};
