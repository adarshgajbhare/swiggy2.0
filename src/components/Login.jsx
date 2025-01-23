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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const { setUser } = useContext(UserContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);
  const navigate = useNavigate();

  const notify = () =>
    toast(
      "Please use access-control-allow-origin extension to see the real time data from Swiggy..",
    );
  const handleAuth = async () => {
    if (isSignUp) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value,
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
          password.current.value,
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
    <>
      <div className="flex min-h-dvh">
        <div className="grid w-full shrink-0 place-items-center bg-[#050505] md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2">
          <div className="flex w-3/5 flex-col gap-8">
            <span className="mb-6 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-600 bg-clip-text py-2 text-center text-5xl font-black tracking-tight text-transparent">
              EatNow{" "}
            </span>
            <h1 className="text-left text-2xl font-semibold text-white">
              {isSignUp ? "Sign up" : "Login"}
            </h1>
            {isSignUp && (
              <input
                className="rounded-lg border border-white/10 bg-[#202020] px-4 py-3 text-lg text-gray-200 outline-none placeholder:font-bold placeholder:text-gray-500"
                type="text"
                ref={username}
                placeholder="Enter your name"
              />
            )}
            <input
              className="rounded-lg border border-white/10 bg-[#202020] px-4 py-3 text-lg text-gray-200 outline-none placeholder:font-bold placeholder:text-gray-500"
              type="email"
              ref={email}
              placeholder="Enter email"
            />
            <input
              className="rounded-lg border border-white/10 bg-[#202020] px-4 py-3 text-lg text-gray-200 outline-none placeholder:font-bold placeholder:text-gray-500"
              type="password"
              ref={password}
              placeholder="Enter password"
            />
            <div>
              <button
                className="w-full rounded-lg bg-orange-500 px-4 py-3 text-lg font-bold text-white"
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
                      className="cursor-pointer text-blue-500 underline"
                      onClick={() => setIsSignUp(false)}
                    >
                      Login here
                    </span>
                  </>
                ) : (
                  <>
                    Not a member?{" "}
                    <span
                      className="cursor-pointer text-blue-500 underline"
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

        <div className="hidden flex-1 shrink-0 overflow-hidden bg-black/40 md:block lg:block xl:block 2xl:block">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_1340/Lunch1_vlksgq"
            alt=""
            className="relative -z-10 size-full object-cover object-center"
          />
        </div>
      </div>
      <ToastContainer
        theme="dark"
        position="top-center"
        hideProgressBar={true}
        pauseOnFocusLossdraggable
        rtl={false}
        newestOnTop
        closeOnClick
        autoClose={5000}
      />
      {notify()}
    </>
  );
};

export default Login;
