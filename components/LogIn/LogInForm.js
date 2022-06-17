import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import { Alert } from "react-native";
import { auth, db } from "../../firebase";

const LogInForm = () => {
  const navigation = useNavigation();
  const logInFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(6, "Your password has to have at least 8 characters"),
  });

  const onLogin = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log("🔥 Firebase Login Successfull 🔥", email, password);
    } catch (error) {
      Alert.alert("🔥 My Lord ... ", error.message, [
        { text: "OK", onPress: () => console.log("OK"), style: "cancel" },
        { text: "Sign Up", onPress: () => navigation.push("SignUpScreen") },
      ]);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
        validationSchema={logInFormSchema}
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
                placeholder="Phone number, username or email address"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                autoCorrect={false}
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

            <View
              style={{
                alignItems: "flex-end",
                marginBottom: 20,
                marginTop: 10,
              }}
            >
              <Text style={{ color: "#4295F6" }}>Forgot Password?</Text>
            </View>
            <Pressable
              titleSize={20}
              style={styles.btn(isValid)}
              onPress={handleSubmit}
            >
              <Text style={styles.textBtn}>Log In</Text>
            </Pressable>

            <View style={styles.signUpContainer}>
              <Text style={{ color: "#C7C7C7" }}>
                Don't have an account?{"  "}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUpScreen")}
              >
                <Text style={{ color: "#4295F6" }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LogInForm;

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
