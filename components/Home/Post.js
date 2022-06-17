import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider, Icon } from "react-native-elements";
import { auth, db, firebase } from "../../firebase";

const postFooterIcon = [
  {
    name: "Like",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
    likedImageUrl:
      "https://img.icons8.com/ios-filled/50/undefined/like--v1.png",
  },
  {
    name: "Comment",
    imageUrl: "https://img.icons8.com/material-outlined/60/ffffff/speech.png",
  },
  {
    name: "Share",
    imageUrl:
      "https://img.icons8.com/external-bartama-outline-32-bartama-graphic/32/undefined/external-email-e-mail-bartama-outline-32-bartama-graphic-7.png",
  },
  {
    name: "Save",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/bookmark-badge.png",
  },
];

const Icons = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={imgUrl} />
  </TouchableOpacity>
);

const Posts = ({ post }) => {
  const handleLike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(
      auth.currentUser.email
    );

    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
          : firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.log("Error updating document", error);
      });
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Divider width={1} orientation={"vertical"} />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginHorizontal: 5,
      marginVertical: 15,
      marginTop: 15,
    }}
  >
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity>
        <Image source={{ uri: post.profile_picture }} style={styles.post} />
      </TouchableOpacity>
      <Text style={{ color: "#FFF", marginLeft: 5, fontWeight: "700" }}>
        {post.user}
      </Text>
    </View>

    <TouchableOpacity>
      <Text style={{ fontWeight: "900", fontSize: 12, color: "#FFF" }}>
        ...
      </Text>
    </TouchableOpacity>
  </View>
);

const PostImage = ({ post }) => (
  <View
    style={{
      width: "100%",
      height: 450,
    }}
  >
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = ({ handleLike, post }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={styles.leftFooterIconsContainer}>
      <TouchableOpacity onPress={() => handleLike(post)}>
        <Icons
          imgStyle={styles.footerIcon}
          imgUrl={{
            uri: post.likes_by_users.includes(auth.currentUser.email)
              ? postFooterIcon[0].likedImageUrl
              : postFooterIcon[0].imageUrl,
          }}
        />
      </TouchableOpacity>

      <Icons
        imgStyle={styles.footerIcon}
        imgUrl={{ uri: postFooterIcon[1].imageUrl }}
      />
      <Icons
        imgStyle={[styles.footerIcon, styles.shareIcon]}
        imgUrl={{ uri: postFooterIcon[2].imageUrl }}
      />
    </View>

    <View style={{ alignItems: "flex-end", flex: 1, alignItems: "flex-end" }}>
      <Icons
        imgStyle={styles.footerIcon}
        imgUrl={{ uri: postFooterIcon[3].imageUrl }}
      />
    </View>
  </View>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ color: "#FFF", fontWeight: "600" }}>
      {post.likes_by_users.length.toLocaleString("en")} likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: "#FFF" }}>
      <Text style={{ fontWeight: "600", color: "#FFF" }}>{post.user}</Text>
      <Text style={{ color: "#FFF" }}> {post.caption}</Text>
    </Text>
  </View>
);

const CommentsSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: "gray" }}>
        View{post.comments.length > 1 ? " all" : ""} {post.comments.length}{" "}
        {post.comments.length > 1 ? "comments" : "comment"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View style={{ flexDirection: "row", marginTop: 3 }} key={index}>
        <Text style={{ color: "#FFF" }}>
          <Text style={{ fontWeight: "600" }}>{comment.user}</Text>{" "}
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
);

// A ) Zero Comments > Don't Render Component
// B ) One Comment > Render Component without "all" and singular comment
// C ) Two Comment > Render comment with "all" and plural comments

export default Posts;

const styles = StyleSheet.create({
  post: {
    width: 35,
    height: 35,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "#e53a61",
  },
  footerIcon: {
    width: 30,
    height: 30,
  },
  leftFooterIconsContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },
  shareIcon: {
    // rotate: "320deg",
    marginTop: -3,
  },
});
