import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native-web";
import { auth, db } from "../../firebase";

const SignUpForm = () => {
  const navigation = useNavigation();
  const signUpFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    username: Yup.string()
      .required("An Username is required")
      .min(5, "Username has to have at least 6 characters"),
    password: Yup.string()
      .required()
      .min(6, "Your password has to have at least 6 characters"),
  });

  const getRandomProfilePicture = async () => {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    return data.results[0].picture.large;
  };

  const onSignUp = async (email, password, username) => {
    try {
      const authUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      db.collection("users")
        .doc(authUser.user.email)
        .set({
          owner_uid: authUser.user.uid,
          username: username,
          email: authUser.user.email,
          profile_picture: await getRandomProfilePicture(),
        });

      console.log("🔥 Firebase User Created Successfully 🔥", email, password);
    } catch (error) {
      Alert.alert("🔥 My Lord ... ", error.message);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "", username: "" }}
        onSubmit={(values) => {
          onSignUp(values.email, values.password, values.username);
        }}
        validationSchema={signUpFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? "#c7c7c7"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor={"#C7C7C7"}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                style={{ color: "#C7C7C7" }}
              />
            </View>

            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.username.length < 1 || values.username.length >= 5
                      ? "#c7c7c7"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor={"#C7C7C7"}
                placeholder="Username"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                autoCorrect={false}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                style={{ color: "#C7C7C7" }}
              />
            </View>

            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.password.length < 1 || values.password.length >= 6
                      ? "#c7c7c7"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor={"#C7C7C7"}
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                style={{ color: "#C7C7C7" }}
              />
            </View>

            <Pressable
              titleSize={20}
              style={styles.btn(isValid)}
              onPress={handleSubmit}
            >
              <Text style={styles.textBtn}>Sign Up</Text>
            </Pressable>

            <View style={styles.signUpContainer}>
              <Text style={{ color: "#C7C7C7" }}>
                Already have an account?{"  "}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("LogInScreen")}
              >
                <Text style={{ color: "#4295F6" }}>Log In</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  inputField: {
    borderRadius: 4,
    backgroundColor: "#121212",
    borderWidth: 0.17,
    marginBottom: 10,
    justifyContent: "center",
    padding: 20,
    borderColor: "#C7C7C7",
  },
  wrapper: {
    marginTop: 40,
  },
  btn: (isValid) => ({
    backgroundColor: isValid ? "#4295F6" : "#004B7B",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 5,
    marginTop: 15,
  }),
  textBtn: {
    color: "white",
    fontWeight: "700",
  },
  signUpContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});
