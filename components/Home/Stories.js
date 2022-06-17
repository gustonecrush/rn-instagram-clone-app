import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { USERS } from "../../data/Users";

const Stories = () => {
  return (
    <View
      style={{
        marginBottom: 13,
        marginTop: 5,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View
            key={index}
            style={{
              alignItems: "center",
              marginRight: 10,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity style={{ alignSelf: "center" }}>
              <Image source={{ uri: story.image }} style={styles.story} />
            </TouchableOpacity>
            <Text style={styles.user}>
              {story.user.length > 10
                ? story.user.slice(0, 6).toLocaleLowerCase() + "..."
                : story.user.toLocaleLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  story: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#e53a61",
  },
  user: {
    color: "#FFF",
    fontSize: 14,
    textAlign: "center",
  }
});
