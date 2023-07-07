import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Me from "./routes/Me";
import Insight from "./routes/Insight";
import Colloquium from "./routes/Colloquium";
import Consortium from "./routes/Consortium";
import Post from "./routes/Post";
import RedirectToConsortium from "./components/Redirect/RedirectToConsortium";
import KakaoConfirm from "./routes/KakaoConfirm";
import GithubConfirm from "./routes/GithubConfirm";
import Report from "./routes/Report";
import ReportWrite from "./routes/ReportWrite";
import ReportPost from "./routes/ReportPost";
import PostUpdate from "./routes/PostUpdate";
import PostWrite from "./routes/PostWrite";

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
          path: "report",
          children: [
            { path: "", element: <Report /> },
            { path: "write", element: <ReportWrite /> },
            { path: ":reportPk", element: <ReportPost /> },
          ],
        },
        {
          path: "me",
          element: <Me />,
        },
        {
          path: "social",
          children: [
            {
              path: "kakao",
              element: <KakaoConfirm />,
            },
            {
              path: "github",
              element: <GithubConfirm />,
            },
          ],
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
                {
                  path: ":postPk/update",
                  element: <PostUpdate />,
                },
              ],
            },
            {
              path: "colloquium",
              element: <Colloquium />,
            },
            {
              path: "write",
              element: <PostWrite />,
            },
            {
              path: "*",
              element: <RedirectToConsortium />,
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
