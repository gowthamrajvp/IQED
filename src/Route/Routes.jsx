import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";

import RootLayout from "../Pages/Layout/RootLayout";
import {
  LandingPage,
  AuthPage,
  IQAuthPage,
  PageNotFound,
} from "../Pages";
import GQSuccessPage from "../Pages/IQQuizPage/GQResultPage";
import IQQuizLayout from "../Pages/Layout/IQQuizLayout";
import IQQuizPage from "../Pages/IQQuizPage/IQQuizPage";
import IQAuthLayout from "../Pages/Layout/IQAuthLayout";

const basename = import.meta.env.BASE_URL;
export const Routers = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<RootLayout />}>
      <Route index element={<IQAuthPage />} />
      <Route element={<IQAuthLayout/>}>
        <Route path="Home" element={<LandingPage />} />
        <Route path="IQquiz" element={<Outlet />}>
          <Route path=":sessionId" element={<IQQuizLayout />}>
            <Route index element={<IQQuizPage />} />
            <Route path="result" element={<GQSuccessPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>

  )
  // ,
  // { basename }

);
