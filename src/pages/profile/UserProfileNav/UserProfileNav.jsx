import styles from "./UserProfileNav.module.css";
import { NavLink } from "react-router-dom";

const links = [
  { id: 1, href: "/profile/posts", text: "Posts" },
  { id: 2, href: "/profile/followers", text: "Followers" },
  { id: 3, href: "/profile/following", text: "Following" },
];

const UserProfileNav = () => {
  const location = window.location.pathname;
  // console.log(location);

  return (
    <>
      <div className="nav-div">
        <div className={styles.underline}></div>

        <nav className={styles.profileNav}>
          {links.map((link) => {
            return (
              <NavLink
                key={link.id}
                to={link.href}
                className={
                  location === link.href ? styles.profile_nav_active : styles.nav_links
                }
              >
                <p>{link.text}</p>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default UserProfileNav;
