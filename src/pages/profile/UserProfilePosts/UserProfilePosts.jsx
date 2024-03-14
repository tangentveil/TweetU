import React, { useContext, useState } from "react";
import "./UserProfilePosts.css";
import Profile from "../Profile";
import { Context } from "../../../Context/MyContext";
import moment from "moment";
import UserProfilePost from "./UserProfilePost";

const UserProfilePosts = () => {
  const { postCount, usersPosts, img, BsMenuApp, BsMenuAppFill } =
    useContext(Context);
  // console.log(usersPosts)
  const [readMore, setReadMore] = useState(true);

  return (
    <>
      <Profile postCount={postCount} />
      <div className="user-profile-posts-container">
        <div className="mainPostContainer">
          {usersPosts.map((post) => (
            <UserProfilePost key={post.docId} post={post}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserProfilePosts;
