import { useState, useRef, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firbase/firbase";
import UserContext from "../utils/UserContext";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (isSignUp) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        const user = userCredential.user;
        if (user) {
          await updateProfile(user, { displayName: username.current.value });
          onAuthStateChanged(auth, (updatedUser) => {
            if (updatedUser) {
              setUser(updatedUser);
              localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
              navigate("/home");
            }
          });
        }
      } catch (error) {
        console.log(error.message, error.code);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        const user = userCredential.user;
        if (user) {
          setUser(user);
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          navigate("/home");
        }
      } catch (error) {
        console.log(error.message, error.code);
      }
    }
  };

  return (
    <div className=" min-h-dvh flex">
      <div className=" lg:w-1/2 xl:w-1/2 md:w-1/2 2xl:w-1/2 w-full shrink-0 grid place-items-center bg-[#050505]">
        <div className=" gap-8 w-3/5   flex flex-col">
          <span className="text-center mb-6  py-2 font-black text-5xl bg-gradient-to-r from-orange-300 via-orange-500 tracking-tight to-orange-600 bg-clip-text text-transparent">
            Swiggify
          </span>
          <h1 className="text-2xl font-semibold text-left text-white">
            {isSignUp ? "Sign up" : "Login"}
          </h1>
          {isSignUp && (
            <input
              className="bg-[#202020] placeholder:text-gray-500 rounded-lg outline-none border border-white/10 placeholder:font-bold px-4 py-3 text-lg text-gray-200"
              type="text"
              ref={username}
              placeholder="Enter your name"
            />
          )}
          <input
            className="bg-[#202020] placeholder:text-gray-500 rounded-lg outline-none border border-white/10 placeholder:font-bold px-4 py-3 text-lg text-gray-200"
            type="email"
            ref={email}
            placeholder="Enter email"
          />
          <input
            className="bg-[#202020] placeholder:text-gray-500 rounded-lg outline-none border border-white/10 placeholder:font-bold px-4 py-3 text-lg text-gray-200"
            type="password"
            ref={password}
            placeholder="Enter password"
          />
          <div>
            <button
              className="bg-orange-500 py-3 px-4 w-full text-white font-bold text-lg rounded-lg"
              onClick={handleAuth}
            >
              {isSignUp ? "Sign up" : "Login"}
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
                    Sign up here
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 hidden lg:block xl:block 2xl:block md:block shrink-0 overflow-hidden bg-black/40 ">
        <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_1340/Lunch1_vlksgq" alt="" className="object-cover object-center size-full relative -z-10"/>
      </div>
    </div>
  );
};

export default Login;
