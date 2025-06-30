import { Outlet, type RouteObject } from "react-router";
import NavBar from "./Routes/Navbar";
import { About } from "./Routes/About";
import { Posts } from "./Routes/Posts";
import { Home } from "./Routes/Home";
import { Post } from "./Routes/Post";
import { PageNotFound } from "./Routes/PageNotFound";

export const routesConfig: RouteObject[] = [
  {
    element: (
      <>
        <NavBar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/post/:id",
        element: <Post />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
];
