import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getPopularMovies, Movie, getPosterUrl } from "../api/tmdbApi";
import Header from "../components/Header";

type RootStackParamList = {
  MovieList: undefined;
  MovieDetail: { movieId: number };
};

type MovieListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "MovieList">;

const MovieListScreen = () => {
  const navigation = useNavigation<MovieListScreenNavigationProp>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async (pageNum: number = 1) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await getPopularMovies(pageNum);
      if (pageNum === 1) {
        setMovies(response.results);
      } else {
        setMovies((prev) => [...prev, ...response.results]);
      }
      setPage(pageNum);
    } catch (error) {
      console.error("영화 목록 로드 실패:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!loadingMore) {
      loadMovies(page + 1);
    }
  };

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => navigation.navigate("MovieDetail", { movieId: item.id })}
    >
      <Image
        source={{ uri: getPosterUrl(item.poster_path) }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.movieDate}>{item.release_date}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {item.vote_average.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading && movies.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#01b4e4" />
        <Text style={styles.loadingText}>영화 목록을 불러오는 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.header}>🎬인기 영화🍿🍿🍿🍿🍿🍿🍿</Text>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color="#01b4e4" />
            </View>
          ) : null
        }
      />
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
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  listContainer: {
    padding: 16,
  },
  row: {
    justifyContent: "space-between",
  },
  movieCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: "48%",
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    backgroundColor: "#2c2c54",
  },
  movieInfo: {
    padding: 12,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
    minHeight: 44,
  },
  movieDate: {
    fontSize: 12,
    color: "#90cea1",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    color: "#ffd700",
    fontWeight: "500",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#ffffff",
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },
});

export default MovieListScreen;
