import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const usersignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign Out");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const links = [
    { id: 1, href: "/feed", text: "feed" },
    { id: 2, href: "/users", text: "Users" },
    { id: 3, href: "/profile/posts", text: "Profile" },
  ];

  return (
    <div>
      <header>
        <h2>TweetU</h2>

        <nav>
          {links.map((link) => {
            return (
              <NavLink
                key={link.id}
                to={link.href}
                className="nav-links"
                activeclassname="active"
              >
                <p>{link.text}</p>
              </NavLink>
            );
          })}

          <div className="btn-div">
            <button onClick={usersignOut}>Sign Out</button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
