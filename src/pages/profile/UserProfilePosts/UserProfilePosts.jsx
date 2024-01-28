import React, { useContext } from "react";
import './UserProfilePosts.css'
import Profile from "../Profile";
import { Context } from "../../../Context/MyContext";
import moment from "moment";

const UserProfilePosts = () => {
  const {postCount, usersPosts, img} = useContext(Context)
  // console.log(usersPosts)

  return (
    <>
      <Profile postCount={postCount} />
      <div className="user-profile-posts-container">
      <div className="mainPostContainer">
        {usersPosts.map((item) => (
          <div key={item.docId} className="PostContainer">
          <div className="SubPostContainer">
            <div className="image-user_time">
              <div className="image">
                <img src={img} alt="" />
              </div>
    
              <div className="user-time">
                <div className="user-text-cir">
                  <p className="user">{item.displayName}</p>
                  <p>{moment(item?.created).fromNow()}</p>
                </div>
    
                <div className="text_cir">
                    <p>{item?.text}</p>
                    <div className="cir"></div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default UserProfilePosts;
