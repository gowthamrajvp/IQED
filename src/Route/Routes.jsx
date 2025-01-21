import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  Navigate,
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
import Launch from "../Pages/Launch/Launch";

const basename = import.meta.env.BASE_URL;
export const Routers = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<RootLayout />}>
      {/* <Route index element={<Launch />} /> */}
     
      <Route index element={<LandingPage />} />
      {/* <Route index element={<IQAuthPage />} />
      <Route element={<IQAuthLayout/>}> 
        <Route path="Home" element={<LandingPage />} />
        <Route path="IQquiz" element={<Outlet />}>
          <Route path=":sessionId" element={<IQQuizLayout />}>
            <Route index element={<IQQuizPage />} />
            <Route path="result" element={<GQSuccessPage />} />
          </Route>
        </Route>
      </Route> */}
      <Route path="*" element={<Navigate to="/" replace />} /> 
      {/* <Route path="*" element={<PageNotFound />}/> */}
    </Route>
  )
  // ,
  // { basename }

);
