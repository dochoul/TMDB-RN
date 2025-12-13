import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { getMovieDetails, MovieDetails, getPosterUrl, getBackdropUrl } from "../api/tmdbApi";
import Header from "../components/Header";

type RootStackParamList = {
  MovieList: undefined;
  MovieDetail: { movieId: number };
};

type MovieDetailScreenRouteProp = RouteProp<RootStackParamList, "MovieDetail">;

const POSTER_WIDTH = 120;
const POSTER_HEIGHT = 180;

const MovieDetailScreen = () => {
  const route = useRoute<MovieDetailScreenRouteProp>();
  const { movieId } = route.params;
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovieDetails();
  }, [movieId]);

  const loadMovieDetails = async () => {
    try {
      setLoading(true);
      const data = await getMovieDetails(movieId);
      setMovie(data);
    } catch (error) {
      console.error("영화 상세 정보 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number): string => {
    if (amount === 0) return "정보 없음";
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#01b4e4" />
        <Text style={styles.loadingText}>영화 정보를 불러오는 중...</Text>
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>영화 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 배경 이미지 */}
        <Image
          source={{ uri: getBackdropUrl(movie.backdrop_path) }}
          style={styles.backdrop}
          resizeMode="cover"
        />
        <View style={styles.backdropOverlay} />

        {/* 메인 콘텐츠 */}
        <View style={styles.content}>
          <View style={styles.headerSection}>
            <Image
              source={{ uri: getPosterUrl(movie.poster_path) }}
              style={styles.poster}
              resizeMode="cover"
            />
            <View style={styles.headerInfo}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.releaseDate}>{movie.release_date}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</Text>
                <Text style={styles.voteCount}>({movie.vote_count.toLocaleString()}명)</Text>
              </View>
              {movie.runtime > 0 && (
                <Text style={styles.runtime}>{formatRuntime(movie.runtime)}</Text>
              )}
            </View>
          </View>

          {/* 장르 */}
          {movie.genres && movie.genres.length > 0 && (
            <View style={styles.genresContainer}>
              {movie.genres.map((genre) => (
                <View key={genre.id} style={styles.genreTag}>
                  <Text style={styles.genreText}>{genre.name}</Text>
                </View>
              ))}
            </View>
          )}

          {/* 줄거리 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>줄거리</Text>
            <Text style={styles.overview}>{movie.overview || "줄거리 정보가 없습니다."}</Text>
          </View>

          {/* 통계 정보 */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>인기도</Text>
              <Text style={styles.statValue}>{movie.popularity.toFixed(0)}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>평점</Text>
              <Text style={styles.statValue}>{movie.vote_average.toFixed(1)}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>평가 수</Text>
              <Text style={styles.statValue}>{movie.vote_count.toLocaleString()}</Text>
            </View>
          </View>

          {/* 제작 정보 */}
          {movie.budget > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>제작 정보</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>제작비:</Text>
                <Text style={styles.infoValue}>{formatCurrency(movie.budget)}</Text>
              </View>
              {movie.revenue > 0 && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>흥행 수익:</Text>
                  <Text style={styles.infoValue}>{formatCurrency(movie.revenue)}</Text>
                </View>
              )}
            </View>
          )}

          {/* 제작사 */}
          {movie.production_companies && movie.production_companies.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>제작사</Text>
              {movie.production_companies.map((company) => (
                <Text key={company.id} style={styles.companyName}>
                  • {company.name}
                </Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d253f",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d253f",
  },
  backdrop: {
    width: "100%",
    height: 250,
    position: "absolute",
    top: 60,
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(13, 37, 63, 0.85)",
    height: 250,
  },
  content: {
    marginTop: 200,
    backgroundColor: "#0d253f",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingTop: 24,
  },
  headerSection: {
    flexDirection: "row",
    marginBottom: 20,
  },
  poster: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: 12,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  releaseDate: {
    fontSize: 16,
    color: "#90cea1",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    fontSize: 18,
    color: "#ffd700",
    fontWeight: "600",
    marginRight: 8,
  },
  voteCount: {
    fontSize: 14,
    color: "#8b9dc3",
  },
  runtime: {
    fontSize: 14,
    color: "#8b9dc3",
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 24,
  },
  genreTag: {
    backgroundColor: "#01b4e4",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 12,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    color: "#cbd5e0",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#8b9dc3",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#01b4e4",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: "#8b9dc3",
    marginRight: 8,
  },
  infoValue: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
  },
  companyName: {
    fontSize: 16,
    color: "#cbd5e0",
    marginBottom: 8,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#ffffff",
  },
  errorText: {
    fontSize: 16,
    color: "#ff6b6b",
  },
});

export default MovieDetailScreen;
