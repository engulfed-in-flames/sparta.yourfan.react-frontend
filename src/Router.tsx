import { Navigate, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Report from "./routes/Report";
import Me from "./routes/Me";
import Insight from "./routes/Insight";
import Colloquium from "./routes/Colloquium";
import Consortium from "./routes/Consortium";
import Write from "./routes/Write";
import Post from "./routes/Post";

const myRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          index: true,
          element: <Home />,
        },
        {
          path: "/report",
          element: <Report />,
        },
        {
          path: "/me",
          element: <Me />,
        },
        {
          path: ":channel",
          children: [
            {
              path: "insight",
              element: <Insight />,
            },
            {
              path: "consortium",
              children: [
                {
                  path: "",
                  element: <Consortium />,
                },
                {
                  path: ":postPk",
                  element: <Post />,
                },
              ],
            },
            {
              path: "colloquium",
              element: <Colloquium />,
            },
            {
              path: "write",
              element: <Write />,
            },
          ],
        },
      ],
      errorElement: <NotFound />,
    },
  ],
  { basename: "" }
);

export default myRouter;
