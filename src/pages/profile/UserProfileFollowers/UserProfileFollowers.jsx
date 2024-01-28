import React, { useContext } from "react";
import Profile from "../Profile";
import { Context } from "../../../Context/MyContext";
import UserProfileFollower from "./UserProfileFollower";

const UserProfileFollowers = () => {
  const { followers } = useContext(Context);

  return (
    <>
      <Profile />

      {followers.map((users) => {
        return <UserProfileFollower key={users.id} users={users} />;
      })}
    </>
  );
};

export default UserProfileFollowers;
