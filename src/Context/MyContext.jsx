import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import img from "../assets/auth.png";

import React from "react";

export const Context = createContext();

const MyContext = ({ children }) => {
  const User = auth.currentUser;

  // console.log(User);

  const [allUsers, setAllUsers] = useState([]);
  const [allPosts, setAllposts] = useState([]);

  const [postLists, setPostLists] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersLists, setFollowersLists] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [usersPosts, setUsersPosts] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [userListFollowing, setUserListFollowing] = useState([]);

  const usersCollectionRef = collection(db, "users");
  const postsCollectionRef = collection(db, "posts");
  const followsCollectionRef = collection(db, "users", User.uid, "follows");
  const followersCollectionRef = collection(db, "users", User.uid, "followers");

  // console.log(postLists);

  useEffect(() => {
    const getFollowedUsers = async () => {
      try {
        const followsData = await getDocs(followsCollectionRef);
        const followeduser = followsData.docs.map((doc) => doc.id);
        setFollowedUsers(followeduser);
      } catch (error) {
        console.log("Error in Fetching Followed Users", error);
      }
    };

    const getAllPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        const posts = data.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));

        setAllposts(posts);
      } catch (error) {
        console.log("Error in Fetching All Posts", error);
      }
    };

    const getAllUsers = async () => {
      try {
        const data = await getDocs(usersCollectionRef);
        const users = data.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));

        setAllUsers(users);
      } catch (error) {
        console.log("Error in Fetching All Users", error);
      }
    };

    const getFollowersID = async () => {
      try {
        const followsData = await getDocs(followersCollectionRef);
        const followersId = followsData.docs.map((doc) => doc.id);
        setFollowersLists(followersId);
      } catch (error) {
        console.log("Error in Fetching Followers", error);
      }
    };

    const getFollowingUsersID = async () => {
      try {
        const followsData = await getDocs(followsCollectionRef);
        const followingID = followsData.docs.map((doc) => doc.id);
        setFollowingUsers(followingID);
      } catch (error) {
        console.log("Error in Fetching Following Users IDs", error);
      }
    };

    getFollowingUsersID();
    getFollowersID();
    getFollowedUsers();
    getAllUsers();
    getAllPosts();
  }, []);

  useEffect(() => {
    const getFollowedUsersPost = () => {
      const followedUserIds = new Set(followedUsers);
      const filteredPosts = allPosts.filter((post) =>
        followedUserIds.has(post.id)
      );

      // console.log(filteredPosts)
      setPostLists(filteredPosts);
    };

    const getFollowers = () => {
      const followersUserIds = new Set(followersLists);
      const filteredFollwers = allUsers.filter((user) =>
        followersUserIds.has(user.id)
      );

      // console.log(filteredFollwers)
      setFollowers(filteredFollwers);
      setFollowersCount(followers.length);
    };

    const getFollowingUsers = () => {
      const followingUserIds = new Set(followingUsers);
      const filteredFollowings = allUsers.filter((user) =>
        followingUserIds.has(user.id)
      );

      setUserListFollowing(filteredFollowings);
      // setLoading(false)
      setFollowingCount(userListFollowing.length);
    };

    const getUserPosts = () => {
      const userPosts = allPosts.filter((user) => user.id === User.uid);

      setUsersPosts(userPosts);
      setPostCount(userPosts.length);
    };

    getFollowedUsersPost();
    getFollowers();
    getFollowingUsers();
    getUserPosts();
  }, [
    followedUsers,
    allPosts,
    allUsers,
    followersLists,
    followingUsers,
    postCount,
    followersCount,
    followingCount,
  ]);

  const handlePost = async () => {
    await addDoc(postsCollectionRef, {
      displayName: User.displayName,
      id: User.uid,
      text,
      created: Date.now(),
    });

    alert("Post Created");
    setText("");
  };

  return (
    <Context.Provider
      value={{
        postLists,
        setText,
        handlePost,
        followers,
        postCount,
        followersCount,
        followingCount,
        usersPosts,
        img,
        userListFollowing,
        loading,
        setLoading,
        allUsers,
        allPosts,
        followedUsers,
        isFollowing,
        setIsFollowing,
        followersLists,
        followingUsers,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default MyContext;
