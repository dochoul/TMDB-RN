import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieListScreen from "./src/screens/MovieListScreen";
import MovieDetailScreen from "./src/screens/MovieDetailScreen";

export type RootStackParamList = {
  MovieList: undefined;
  MovieDetail: { movieId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ["/"],
  config: {
    screens: {
      MovieList: "",
      MovieDetail: "movie/:movieId",
    },
  },
};

const App = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="MovieList"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0d253f",
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="MovieList"
          component={MovieListScreen}
          options={{
            title: "인기 영화",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          options={{
            title: "영화 상세",
            headerShown: false,
            //headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
