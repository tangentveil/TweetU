import React, { useContext } from "react";
import "./Post.css";
import moment from "moment";
import { Context } from "../../Context/MyContext";

const Post = ({ post }) => {
  // console.log(post);
  const user = post.displayName;
  const {img} = useContext(Context);

  return (
    <div className="PostContainer">
      <div className="SubPostContainer">
        <div className="image-user_time">
          <div className="image">
            <img src={img} alt="" />
          </div>

          <div className="user-time">
            <div className="user-text-cir">
              <p className="user">{user}</p>
              <p>{moment(post.created).fromNow()}</p>
            </div>

            <div className="text_cir">
              <p>{post.text}</p>
              <div className="cir"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
