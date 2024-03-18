import { useContext, useState } from "react";
import "./UserProfilePosts.css";
import Profile from "../Profile";
import { Context } from "../../../Context/MyContext";
import UserProfilePost from "./UserProfilePost";

const UserProfilePosts = () => {
  const { postCount, usersPosts } = useContext(Context);
  const [modalActiveId, setModalActiveId] = useState(null);
  // console.log(usersPosts)

  const toggleModal = (docId) => {
    const newActiveId = docId === modalActiveId ? null : docId;
    setModalActiveId(newActiveId);
  };

  return (
    <>
      <Profile postCount={postCount} />
      <div className="user-profile-posts-container">
        <div className="mainPostContainer">
          {usersPosts.map((post) => (
            <UserProfilePost
              key={post.docId}
              post={post}
              modalActiveId={modalActiveId}
              toggleModal={toggleModal}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserProfilePosts;
