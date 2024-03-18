import { useContext, useState } from "react";
import "./UserProfilePosts.css";
import moment from "moment";
import { Context } from "../../../Context/MyContext";
import Modal from "../../../components/Modal/Modal";

const UserProfilePost = ({ post, modalActiveId, toggleModal }) => {
  // console.log(usersPosts)
  const { img, BsMenuApp, BsMenuAppFill } = useContext(Context);
  const [readMore, setReadMore] = useState(true);
  const isModalActive = post.docId == modalActiveId;

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

              <button onClick={() => toggleModal(post.docId)} className="menu-btn">
                {isModalActive ? (
                  <BsMenuAppFill className="menu-icon" />
                ) : (
                  <BsMenuApp className="menu-icon" />
                )}
              </button>

              <Modal isModalActive={isModalActive} />
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

export default UserProfilePost;
