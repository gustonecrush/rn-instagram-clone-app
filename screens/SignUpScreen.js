import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import SignUpForm from "../components/SignUp/SignUpForm";

const INSTAGRAM_LOGO =
  "https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png";

const SignUpScreen = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.logoContainer}>
      <Image
        source={require("../assets/header-logo.png")}
        style={{ width: 220, height: 75, resizeMode: "cover" }}
      />
    </View>

    {/* Login Form */}
    <SignUpForm />
  </View>
);

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 12,
    justifyContent: "center",
    marginTop: -150,
  },
  logoContainer: {
    marginTop: 60,
    alignItems: "center",
  },
});
