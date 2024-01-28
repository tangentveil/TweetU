import React, { useContext } from "react";
import Profile from "../Profile";
import { Context } from "../../../Context/MyContext";

const UserProfileFollowing = () => {
  const { img, userListFollowing } = useContext(Context);

  return (
    <>
      <Profile />

      {userListFollowing.map((item) => {
        return (
          <div key={item.id} className="container">
            <div className="subContainer">
              <div className="image-user-foll">
                <div className="image">
                  <img src={img} alt="" />
                </div>

                <div className="user-following">
                  <p>{item?.displayName}</p>
                  <p>Following: 200</p>
                </div>
              </div>
              <p>Following</p>
            </div>
            <div className="underline"></div>
          </div>
        );
      })}
    </>
  );
};

export default UserProfileFollowing;
