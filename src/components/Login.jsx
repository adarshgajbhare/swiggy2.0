import  { useState, useRef, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,

} from "firebase/auth";
import {

  useNavigate,

} from "react-router-dom";
import { auth } from "../firbase/firbase";
import UserContext from "../utils/UserContext";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);
  const navigate = useNavigate();

  const handleAuth = () => {
    if (isSignUp) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
        username.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {

            updateProfile(user, {
              displayName: username.current.value
            })
            setUser(user); // Update user state in UserContext
            localStorage.setItem('loggedInUser', JSON.stringify(user)); 
            navigate("/home");
            console.log(user);
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage, errorCode);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            setUser(user); // Update user state in UserContext
            localStorage.setItem('loggedInUser', JSON.stringify(user)); 
            console.log("Logged in user", user);
            navigate("/home");
           
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage, errorCode);
        });
    }
  };


  return (
    <div className="bg-black h-screen flex items-center justify-center ">
      <div className="text-center gap-6 flex flex-col">
        <span className="flex justify-center mb-10 font-black text-5xl bg-gradient-to-r from-orange-300 via-orange-500 tracking-tight to-orange-600 bg-clip-text text-transparent">
          Swiggify
        </span>
        <h1 className="text-2xl font-semibold text-left text-white">
          {isSignUp ? "Sign Up" : "Login"}
        </h1>
        {isSignUp && (
          <input
            className="bg-gray-300 placeholder:text-gray-600 rounded-lg outline-none text-black placeholder:font-bold px-10 py-3"
            type="text"
            ref={username}
            placeholder="Enter your name"
          />
        )}
        <input
          className="bg-gray-300 placeholder:text-gray-600 rounded-lg outline-none text-black placeholder:font-bold px-10 py-3"
          type="email"
          ref={email}
          placeholder="Enter email"
        />
        <input
          className="bg-gray-300 placeholder:text-gray-600 rounded-lg outline-none text-black placeholder:font-bold px-10 py-3"
          type="password"
          ref={password}
          placeholder="Enter password"
        />
        <div>
          <button
            className="bg-white py-3 px-32 rounded-lg"
            onClick={handleAuth}
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </div>
        <div>
          <p className="text-white">
            {isSignUp ? (
              <>
                Already a member?{" "}
                <span
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() => setIsSignUp(false)}
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Not a member?{" "}
                <span
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up here
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;