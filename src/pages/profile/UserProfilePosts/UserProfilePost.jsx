import React, { useContext, useState } from "react";
import "./UserProfilePosts.css";
import Profile from "../Profile";
import { Context } from "../../../Context/MyContext";
import moment from "moment";

const UserProfilePost = ({ post }) => {
  const { img, BsMenuApp, BsMenuAppFill } =
    useContext(Context);
  // console.log(usersPosts)
  const [readMore, setReadMore] = useState(true);

  return (
    <div className="PostContainer">
      <div className="SubPostContainer">
        <div className="image-user_time">
          <div className="image">
            <img src={img} alt="" />
          </div>

          <div className="user-text-time">
            <div className="text-icon">
              <h2 className="user">{post.displayName}</h2>
              {true ? (
                <BsMenuApp className="menu-icon" />
              ) : (
                <BsMenuAppFill className="menu-icon" />
              )}
            </div>

            <div className="text-time">
              <p>
                {readMore ? `${post.text.substring(0, 50)}...` : post.text}
                <button
                  onClick={() => setReadMore(!readMore)}
                  className="read-more-btn"
                >
                  {readMore ? "read More..." : "show Less"}
                </button>
              </p>

              <p>{moment(post.created).fromNow()}</p>
            </div>
          </div>

          <div className="half-line"></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePost;
