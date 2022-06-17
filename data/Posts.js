import { USERS } from "./Users";

export const POSTS = [
  {
    imageUrl:
      "https://images.pexels.com/photos/2765871/pexels-photo-2765871.jpeg?cs=srgb&dl=pexels-jeremy-bishop-2765871.jpg&fm=jpg",
    user: USERS[0].user,
    likes_by_users: ['a', 'b', 'c', 'd', 'd', 'd'],
    caption:
      "I Feel so fucking fresh today. I hope this is not only my fucking happiest day ever <3",
    profile_picture: USERS[0].image,
    comments: [],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1583795484071-3c453e3a7c71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
    user: USERS[1].user,
    likes_by_users: ['a', 'b', 'c', 'd', 'd', 'd'],
    caption:
      "Here We Go Again. 🎸 I want the ride by my side. I don't know fucking this world but this truly being my whole life",
    profile_picture: USERS[1].image,
    comments: [
      {
        user: "gustonecrush",
        comment: "Wow!. This concert looks so exciting.",
      },
    ],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80",
    user: USERS[2].user,
    likes_by_users: ['a', 'b', 'c', 'd', 'd', 'd'],
    caption:
      "Here We Go Again. 🎸 I want the ride by my side. I don't know fucking this world but this truly being my whole life",
    profile_picture: USERS[2].image,
    comments: [
      {
        user: "gustonecrush",
        comment: "Wow!. This concert looks so exciting.",
      },
      {
        user: "hanss.code",
        comment: "Once If I am a Singer. I would sing along side with him 💗.",
      },
    ],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2439&q=80",
    user: USERS[3].user,
    likes_by_users: ['a', 'b', 'c', 'd', 'd', 'd'],
    caption:
      "Here We Go Again. 🎸 I want the ride by my side. I don't know fucking this world but this truly being my whole life",
    profile_picture: USERS[3].image,
    comments: [
      {
        user: "gustonecrush",
        comment: "Wow!. This concert looks so exciting.",
      },
      {
        user: "hanss.code",
        comment: "Once If I am a Singer. I would sing along side with him 💗.",
      },
    ],
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2439&q=80",
    user: USERS[4].user,
    likes_by_users: ['a', 'b', 'c', 'd', 'd', 'd'],
    caption:
      "Here We Go Again. 🎸 I want the ride by my side. I don't know fucking this world but this truly being my whole life",
    profile_picture: USERS[4].image,
    comments: [
      {
        user: "gustonecrush",
        comment: "Wow!. This concert looks so exciting.",
      },
      {
        user: "hanss.code",
        comment: "Once If I am a Singer. I would sing along side with him 💗.",
      },
    ],
  },
];
