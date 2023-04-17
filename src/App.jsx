import { createBrowserRouter, RouterProvider, Navigate, redirect } from "react-router-dom";
import Root from "./Routes/Root";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
// import ErrorPage from "./Error/ErrorPage";
import AuthLayout from "./Wrappers/AuthLayout";
import DashboardLayout from "./Wrappers/DashboardLayout";
import Online from "./Pages/Online/Online";
import Offline from "./Pages/Offline/Offline";
import Transfer from "./Pages/Transfer/Transfer";
import Friends from "./Pages/Friends/Friends";
import Active from "./Pages/Active/Active";
import { useAuth } from "./Context/AuthContext/AuthContext";

function App() {
  const { loggedIn } = useAuth();
  const redirectIfUser = () => {
    if (loggedIn) {
      return redirect("/dashboard");
    }

    return null;
  }

  const redirectIfNoUser = () => {
    if (!loggedIn) {
      return redirect("/login");
    }

    return null;
  }

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Root />,
        // errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/login" />
          },
          {
            element: <AuthLayout />,
            children: [
              {
                path: "login",
                element: <Login />,
                loader: redirectIfUser
              },
              {
                path: "register",
                element: <Register />,
                loader: redirectIfUser
              }
            ]
          },
          {
            element: <DashboardLayout />,
            children: [
              {
                path: "dashboard",
                element: <Online />,
                loader: redirectIfNoUser
              },
              {
                path: "offline",
                element: <Offline />
              },
              {
                path: "friends",
                element: <Friends />,
                loader: redirectIfNoUser
              },
              {
                path: "transfer",
                element: <Transfer />,
                loader: redirectIfNoUser
              },
              {
                path: "active",
                element: <Active />,
                loader: redirectIfNoUser
              }
            ]
          }
        ]
      }
    ]
  );

  return (
    <RouterProvider router={router} />
  )
}

export default App;