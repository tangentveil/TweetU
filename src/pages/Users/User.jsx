import React, { useContext, useEffect, useState } from "react";
import "./User.css";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import img from "../../assets/auth.png";
import { Context } from "../../Context/MyContext";

const User = ({ users }) => {
  // console.log(users)
  const User = auth.currentUser;
  // console.log(curUser)

  const { followingUsers } = useContext(Context);
  const [isFollowing, setIsFollowing] = useState(false);

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
          await deleteDoc(UserDocRef);
          await deleteDoc(followerRef);
          setIsFollowing(!isFollowing);
          alert("User Unfollowed");
        } else {
          await setDoc(UserDocRef, {
            userId: users.id,
          });

          await setDoc(followerRef, {
            userId: User.uid,
          });

          setIsFollowing(!isFollowing);
          alert("User Followed");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
          </button>
        </div>
        <div className="underline"></div>
      </div>
    </>
  );
};

export default User;
