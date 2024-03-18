import { useContext } from "react";
import "./UserProfilePosts.css";
import Profile from "../Profile";
import { Context } from "../../../Context/MyContext";
import UserProfilePost from "./UserProfilePost";

const UserProfilePosts = () => {
  const { postCount, usersPosts } =
    useContext(Context);
  // console.log(usersPosts)

  return (
    <>
      <Profile postCount={postCount} />
      <div className="user-profile-posts-container">
        <div className="mainPostContainer">
          {usersPosts.map((post) => (
            <UserProfilePost key={post.docId} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserProfilePosts;
