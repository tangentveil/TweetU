import React, { useContext } from "react";
import "./Profile.css";
import Navbar from "../../components/Navbar/Navbar";
import UserProfileNav from "./UserProfileNav/UserProfileNav";
import { auth } from "../../firebase";
import { Context } from "../../Context/MyContext";

const Profile = () => {
  const user = auth.currentUser;
  const { postCount, followingCount, followersCount, img, userListFollowing, followers } =
    useContext(Context);

  return (
    <>
      <Navbar></Navbar>

      <div className="profileContainer">
        <div className="profile-image image-div">
          <img src={img} alt="" />
        </div>

        <div>
          <h1>{user.displayName}</h1>
          <div className="post_follow">
            <p>Posts: {postCount}</p>
            <p>Followers : {followers.length}</p>
            <p>Following: {userListFollowing.length}</p>
          </div>
        </div>
      </div>
      <div className="user-profile-nav">
        <UserProfileNav />
      </div>
    </>
  );
};

export default Profile;
