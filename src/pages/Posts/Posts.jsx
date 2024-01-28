import React from "react";
import "./Posts.css";
import Post from "./Post";

const Posts = ({ postLists }) => {
  // console.log(postLists)

  return (
    <>
      {/* <h1>Posts</h1> */}

      <div className="mainPostContainer">
        {postLists.map((post) => (
          <Post post={post} key={post.docId} />
        ))}
      </div>
    </>
  );
};

export default Posts;
