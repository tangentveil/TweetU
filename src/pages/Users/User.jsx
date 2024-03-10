import React, { useContext, useEffect, useState } from "react";
import "./User.css";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import img from "../../assets/auth.png";
import { Context } from "../../Context/MyContext";
import { ToastContainer, toast } from 'react-toastify';

const User = ({ users }) => {
  // console.log(users)
  const User = auth.currentUser;
  // console.log(curUser)

  const { followingUsers, getFollowingUsersID, getFollowingUsers, getFollowedUsers, getFollowedUsersPost } = useContext(Context);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const userFollowRef = collection(db, "users", User.uid, "follows");
  const UserDocRef = doc(userFollowRef, users?.id);

  const userFollowerRef = collection(db, "users", users.id, "followers");
  const followerRef = doc(userFollowerRef, User.uid);

  useEffect(() => {
    const checkIfFollowing = () => {
      const UserIds = new Set(followingUsers);
      const filteredFollows = UserIds.has(users.id);

      // console.log(filteredFollows)

      setIsFollowing(filteredFollows);
    };

    checkIfFollowing();
  }, [users.id]);

  const handleFollow = async () => {
    try {
      if (User) {
        if (isFollowing) {
          setShowLoader(true);
          await deleteDoc(UserDocRef);
          await deleteDoc(followerRef);
          setIsFollowing(!isFollowing);
          // alert("User Unfollowed");
          toast("User Unfollowed");
          setShowLoader(false);
        } else {
          setShowLoader(true);
          await setDoc(UserDocRef, {
            userId: users.id,
          });

          await setDoc(followerRef, {
            userId: User.uid,
          });

          setIsFollowing(!isFollowing);
          // alert("User Followed");
          toast("User Followed");
          setShowLoader(false);
        }
      }

      getFollowingUsersID();
      getFollowingUsers();
      getFollowedUsers();
      getFollowedUsersPost();
    } catch (error) {
      setShowLoader(false)
      console.log(error);
      toast("Error");
    }
  };

  return (
    <>
    <ToastContainer position="top-center"/>
      <div className="container">
        <div className="subContainer">
          <div className="image-user-foll">
            <div className="image">
              <img src={img} alt="" />
            </div>

            <div className="user-following">
              <p>{users?.displayName}</p>
              <p>Following: 200</p>
            </div>
          </div>

          <button className="follow-btn" onClick={handleFollow}>
            {isFollowing ? "Unfollow" : "Follow"}
            {showLoader && <div className="custom_spinner"></div> }
          </button>
        </div>
        <div className="underline"></div>
      </div>
    </>
  );
};

export default User;
