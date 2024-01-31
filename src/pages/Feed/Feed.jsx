import { useContext, useEffect, useState } from "react";
import "./Feed.css";
import Navbar from "../../components/Navbar/Navbar";
import Posts from "../Posts/Posts";
import { Context } from "../../Context/MyContext";

const Feed = () => {
  const { setText, handlePost, postLists, Spinner, showLoader } = useContext(Context);

  const [loading, setLoading] = useState(false);

  // console.log(postLists);

  useEffect(() => {
    if (postLists.length === 0) setLoading(true);
    else setLoading(false);
  }, [postLists]);

  return (
    <div className="feed-container">
      <Navbar></Navbar>
      <div className="content-post">
        <div className="ContentUploadContainer">
          <div className="input-div">
            <input
              type="text"
              className="contentWritingpart"
              placeholder="Write your real thought....."
              onChange={(e) => setText(e.target.value)}
            />
            <button className="btn" onClick={handlePost}>
              Post
              {showLoader && <Spinner className="custom_spinner"></Spinner> }
            </button>
          </div>
        </div>
        {loading ? <h1>Loading...</h1> : <Posts postLists={postLists}></Posts>}
      </div>
    </div>
  );
};

export default Feed;
