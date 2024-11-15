import { useEffect, useState, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DynamicBackground } from "../../Common";
import {
  WhiteBackgroundSVG,
  YellowBackgroundSVG,
  BlueBackgroundSVG,
} from "../../assets/SVG";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "../../Socket/SocketContext";

const RootLayout = () => {
  const location = useLocation();
  const backgroundImage = useMemo(() => {
    const backgroundMap = {
      "/": YellowBackgroundSVG,
      "/auth": BlueBackgroundSVG,
      "/signup": BlueBackgroundSVG,
      "/general-quiz-test": YellowBackgroundSVG,
      "/gq-success": YellowBackgroundSVG,
      "/gq-get-result": YellowBackgroundSVG,
      "/gq-get-result-vai-wa": YellowBackgroundSVG,
      "/commenquiztest": YellowBackgroundSVG,
      "/match": YellowBackgroundSVG,
      "/result": YellowBackgroundSVG,
    };
    console.log(location.pathname.toLowerCase());
    return backgroundMap[location.pathname.toLowerCase()] || WhiteBackgroundSVG;
  }, [location.pathname]);

  return (
    <DynamicBackground
      sx={{ backgroundImage: `url(${backgroundImage})` }}
      className="Root-BackGround"
      
    >
      <SocketProvider>
        <Outlet />
      </SocketProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </DynamicBackground>
  );
};

export default RootLayout;
