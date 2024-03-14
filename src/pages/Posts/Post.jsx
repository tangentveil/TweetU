import React, { useContext, useState } from "react";
import "./Post.css";
import moment from "moment";
import { Context } from "../../Context/MyContext";

const Post = ({ post }) => {
  // console.log(post);
  const user = post.displayName;
  const { img, BsMenuApp, BsMenuAppFill } = useContext(Context);
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
              <h2 className="user">{user}</h2>
              {true ? (
                <BsMenuApp className="menu-icon" />
              ) : (
                <BsMenuAppFill className="menu-icon" />
              )}
            </div>

            <div className="text-time">
              <p>
                {readMore ? `${post.text.substring(0, 50)}` : post.text}
                {post.text.length > 30 && (
                  <button
                    onClick={() => setReadMore(!readMore)}
                    className="read-more-btn"
                  >
                    {readMore ? "read More..." : "show Less"}
                  </button>
                )}
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

export default Post;
