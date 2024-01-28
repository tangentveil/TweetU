import "./Auth.css";
import React, { useState } from "react";
import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import image from "../../assets/auth.png";
import { useNavigate } from "react-router-dom";
import { collection, setDoc, getDoc, doc } from "firebase/firestore";

const Auth = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const {getFollowedUsersPost} = useContext(Context);

  const handleSwitch = () => {
    setIsSignup(!isSignup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setLoading(true)

    if (!email && !password) {
      alert("Enter email and password");
      // setLoading(false)
    }

    if (isSignup) {
      if (!name) {
        alert("Enter a name to continue");
        return;
      }

      try {
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

        navigate("/feed");
      } catch (error) {
        console.error("Error creating user:", error);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        navigate("/feed");
      } catch (error) {
        console.error("Error signing in:", error);
      }
    }
  };

  return (
    <div>
      <header>
        <h2>TweetX</h2>
      </header>

      <div className="signUp_login_btn">
        <p>
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Login" : "Create Account"}
          </button>
        </p>
      </div>

      <div className="auth-container">
        <div className="create_acc">
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

            <button type="submit" className="auth-btn">
              {isSignup ? "Sign up" : "Log in"}
              {/* {loading && <CgSpinner size={20} className="mt-1 animate-spin" />} */}
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
