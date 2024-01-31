import styles from "./Auth.module.css";
import { useState } from "react";
import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import image from "../../assets/auth.png";
import { useNavigate } from "react-router-dom";
import { collection, setDoc, getDoc, doc } from "firebase/firestore";

// import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from "react-bootstrap";

const Auth = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // const {getFollowedUsersPost} = useContext(Context);

  const handleSwitch = () => {
    setIsSignup(!isSignup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!email && !password) {
      alert("Enter email and password");
      setLoading(false);
    }

    if (isSignup) {
      if (!name) {
        alert("Enter a name to continue");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCredential.user, { displayName: name });

        const usersCollectionRef = collection(db, "users");
        const userDocRef = doc(usersCollectionRef, userCredential.user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            id: userCredential.user.uid,
            displayName: name,
            email: email,
          });

          console.log("Users added");
        }

        setLoading(false);
        navigate("/feed");
      } catch (error) {
        setLoading(false);
        console.error("Error creating user:", error);
      }
    } else {
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        setLoading(false);
        navigate("/feed");
      } catch (error) {
        setLoading(false);
        console.error("Error signing in:", error);
      }
    }
  };

  return (
    <div>
      <header>
        <h2>TweetX</h2>
      </header>

      <div className={styles.signUp_login_btn}>
        <p>
          <button
            type="button"
            className={styles.handle_switch_btn}
            onClick={handleSwitch}
          >
            {isSignup ? "Login" : "Create Account"}
          </button>
        </p>
      </div>

      <div className={styles.auth_container}>
        <div className={styles.create_acc}>
          {isSignup ? <h1>Create Account</h1> : <h1>Log In</h1>}

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <label htmlFor="name">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </label>
            )}

            <label htmlFor="email">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label htmlFor="password">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>

            <button type="submit" className={styles.auth_btn}>
              {isSignup ? "Sign up" : "Log in"}
              {loading && <Spinner className="custom_spinner"></Spinner>}
            </button>
          </form>
        </div>

        <div>
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
