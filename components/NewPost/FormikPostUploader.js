import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";
import { Formik, formik } from "formik";
import { useState, useEffect } from "react";
import { Divider } from "react-native-elements";
import { Button } from "react-native";
import validUrl from "valid-url";
import { auth, db, firebase } from "../../firebase";

const PLACEHOLDER_IMG =
  "https://wolper.com.au/wp-content/uploads/2017/10/image-placeholder.jpg";

const uploadPostScheme = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required"),
  caption: Yup.string().max(2200, "Caption has reached the character limits"),
});

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

  const getUsername = () => {
    const user = auth.currentUser;
    const unsubscribe = db
      .collection("users")
      .where("owner_uid", "==", user.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profile_picture: doc.data().profile_picture,
          });
        })
      );
    return unsubscribe;
  };

  useEffect(() => {
    getUsername();
  }, []);

  const uploadPostToFire = (imageUrl, caption) => {
    const unsubscribe = db
      .collection("users")
      .doc(auth.currentUser.email)
      .collection("posts")
      .add({
        imageUrl: imageUrl,
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profile_picture,
        owner_uid: auth.currentUser.uid,
        caption: caption,
        owner_email: auth.currentUser.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes_by_users: [],
        comments: [],
      })
      .then(() => navigation.goBack());

    return unsubscribe;
  };

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      validationSchema={uploadPostScheme}
      validateOnMount={true}
      onSubmit={(values) => {
        uploadPostToFire(values.imageUrl, values.caption);
      }}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Image
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : PLACEHOLDER_IMG,
              }}
              style={{ width: 100, height: 100, borderRadius: 5 }}
            />

            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput
                style={{ color: "#FFFafd", fontSize: 18 }}
                placeholder="Write a caption ..."
                placeholderTextColor={"gray"}
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
          </View>
          <Divider width={0.2} orientation={"vertical"} />
          <TextInput
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
            style={{ color: "#FFFafd", fontSize: 16 }}
            placeholder="Enter Image Url"
            placeholderTextColor={"gray"}
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{ fontSize: 10, color: "red" }}>
              {errors.imageUrl}
            </Text>
          )}

          <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;

const styles = StyleSheet.create({});
