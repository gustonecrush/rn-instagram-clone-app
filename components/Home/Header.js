import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { db, auth } from "../../firebase";

const handleSignOut = async () => {
  try {
    await auth.signOut()
    console.log('Signed out successfully!')
  } catch (error) {
    console.log(error)
  }
};

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <TouchableOpacity onPress={handleSignOut}>
        <Image
          style={styles.logo}
          source={require("../../assets/header-logo.png")}
        />
      </TouchableOpacity>

      {/* Icons */}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.push("NewPostScreen")}>
          <Image
            style={styles.icon}
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>

          <Image
            style={styles.icon}
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  // Container
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  // Logo
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  // Icon Container
  iconContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  // Icon
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: "contain",
  },
  // Unread Badge
  unreadBadge: {
    backgroundColor: "#FF3250",
    position: "absolute",
    left: 20,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  unreadBadgeText: {
    color: "white",
    fontWeight: "600",
  },
});
