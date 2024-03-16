import React, { useContext, useState } from "react";
import "./UserProfilePosts.css";
import Profile from "../Profile";
import { Context } from "../../../Context/MyContext";
import moment from "moment";
import UserProfilePost from "./UserProfilePost";
import Modal from "../../../components/Modal/Modal";

const UserProfilePosts = () => {
  const { postCount, usersPosts, img, BsMenuApp, BsMenuAppFill } =
    useContext(Context);
  // console.log(usersPosts)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
              isModalOpen={isModalOpen}
              openModal={openModal}
              closeModal={closeModal}
            />
          ))}
          <Modal isModalOpen={isModalOpen} closeModal={closeModal} />
        </div>
      </div>
    </>
  );
};

export default UserProfilePosts;
