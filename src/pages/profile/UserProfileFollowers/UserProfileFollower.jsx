import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../Context/MyContext";
import { auth, db } from "../../../firebase";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";

const UserProfileFollower = ({ users }) => {
  const { img, followingUsers } = useContext(Context);

  const User = auth.currentUser;

  const [isFollowing, setIsFollowing] = useState(false);

  const userFollowRef = collection(db, "users", User?.uid, "follows");
  const UserDocRef = doc(userFollowRef, users?.id);

  const userFollowerRef = collection(db, "users", users?.id, "followers");
  const followerRef = doc(userFollowerRef, User?.uid);

  useEffect(() => {
    const checkIfFollowing = () => {
      const UserIds = new Set(followingUsers);
      const filteredFollows = UserIds.has(users.id);

      // console.log(filteredFollowings)

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
          // alert("User Unfollowed");
        } else {
          await setDoc(UserDocRef, {
            userId: users.id,
          });

          await setDoc(followerRef, {
            userId: User.uid,
          });

          setIsFollowing(!isFollowing);
          // alert("User Followed")
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(isFollowing);

  return (
    <div className="container">
      <div key={users.id} className="subContainer">
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
  );
};

export default UserProfileFollower;
