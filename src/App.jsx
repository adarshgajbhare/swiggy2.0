import { useState, lazy, Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/Header";
import BodyLayout from "./components/BodyLayout";
import RouterError from "./components/RouterError";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Offers from "./components/Offers";
import ResMenu from "./components/RestaurantMenus";
import UserName from "./components/UserName";
import appStore from "./store/appStore";
import { getCityAPI } from "./utils/constants";
import Login from "./components/Login";
import { UserProvider } from "./utils/UserContext";

const About = lazy(() => import("./components/About"));

const App = () => {
  const [name, setName] = useState();
  useEffect(() => {
    const dummyData = {
      name: "AG",
    };
    setName(dummyData.name);
  }, []);

  const [api, setAPI_KEY] = useState(getCityAPI(18.516726, 73.856255));

  const handleAPIKeyChange = (newAPIKey, latitude, longitude) => {
    setAPI_KEY(newAPIKey);
  };

  const location = useLocation();

  return (
    <Provider store={appStore}>
      <UserProvider>
      <UserName.Provider value={{ loggedUser: name, setName }}>
        <div className="app">
          {location.pathname !== "/" && <Header onAPIKeyChange={handleAPIKeyChange} />}
          <Outlet context={api} />
          {/* <Footer /> */}
        </div>
      </UserName.Provider>
      </UserProvider>
    </Provider>
  );
};

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouterError />,
    children: [
      {
        path: "/home",
        element:  <BodyLayout />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>About Loading....</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/offers",
        element: <Offers />,
      },
      {
        path: "/menu/:resId",
        element: <ResMenu />,
      },
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoute} />);
