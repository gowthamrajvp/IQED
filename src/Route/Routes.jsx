import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import RootLayout from "../Pages/Layout/RootLayout";
import AuthLayout from "../Pages/Layout/AuthLayout";
import { LandingPage, AuthPage, ExplorePage, MissionPage } from "../Pages";
import UserLayout from "../Pages/Layout/UserLayout";

export const Routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="Auth" element={<AuthPage />} />
      <Route element={<AuthLayout />}>
        <Route element={<UserLayout />}>
          <Route path="explore" element={<ExplorePage/>} />
          <Route path="missions" element={<MissionPage/>} />
        </Route>
      </Route>
    </Route>
  )
);
