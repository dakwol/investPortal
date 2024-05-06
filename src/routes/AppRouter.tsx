import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RouteNames, privateRoutes, publicRoutes } from "./index";
import { useTypeSelector } from "../hooks/useTypedSelector";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Header from "../components/Header/Header";

const AppRouter = () => {
  // const isAuthenticated = !!localStorage.getItem("access");
  const isAuthenticated = true; // временно
  const navigate = useNavigate();
  const location = useLocation();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const storedRoute = localStorage.getItem("currentRoute");

    if (storedRoute) {
      setInitialRoute(storedRoute);
    } else {
      setInitialRoute(RouteNames.HOMEPAGE);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      localStorage.setItem("currentRoute", window.location.pathname);
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return (
    <>
      <Header />
      <Routes>
        {isAuthenticated
          ? privateRoutes.map((route) => (
              <Route
                path={route.path}
                element={<route.element />}
                key={route.path}
              />
            ))
          : publicRoutes.map((route) => (
              <Route
                path={route.path}
                element={<route.element />}
                key={route.path}
              />
            ))}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
