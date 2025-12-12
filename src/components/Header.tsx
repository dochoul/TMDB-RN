import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      {/* 왼쪽 로고 */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>🎬 TMDB</Text>
      </View>

      {/* 오른쪽 프로필 사진 */}
      <TouchableOpacity style={styles.profileContainer}>
        <Image
          source={{
            uri: "https://ui-avatars.com/api/?name=User&background=01b4e4&color=fff&size=128",
          }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#0d253f",
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a2e",
  },
  logoContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#01b4e4",
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#01b4e4",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default Header;
