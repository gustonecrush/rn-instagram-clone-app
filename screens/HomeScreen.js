import React from "react";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import BottomTabs, { bottomTabIcons } from "../components/Home/BottomTabs";
import Header from "../components/Home/Header";
import Posts from "../components/Home/Post";
import Post from "../components/Home/Post";
import Stories from "../components/Home/Stories";
import { POSTS } from "../data/Posts";
import { db } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collectionGroup("posts")
      // .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((post) => ({ id: post.id, ...post.data() }))
        );
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header navigation={navigation} />

      {/* Stories */}
      <Stories />

      {/* Posts */}
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        {posts.map((post, index) => (
          <Posts post={post} key={index} />
        ))}
        {POSTS.map((post, index) => (
          <Posts post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
});
