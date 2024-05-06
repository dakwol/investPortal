import React from "react";
import HomePage from "../pages/HomePage/HomePage";
import CardInfoPage from "../pages/CardInfoPage/CardInfoPage";
const isAuthenticated = localStorage.getItem("account");
const isAuthenticatedApplicant = localStorage.getItem("applicant");

export interface IRoute {
    path: string;
    element : React.ComponentType;
    exact?: boolean;
    params?: { [key: string]: string | number };
}

export enum RouteNames {
    HOMEPAGE = '/',
    CARDINFO = '/card-info',
}

export const publicRoutes: IRoute[] = [
  {path: RouteNames.HOMEPAGE, exact: true, element: HomePage},
  {path: `${RouteNames.CARDINFO}/:slug`, exact: false, element: CardInfoPage, params: { params: ':slug' }},
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.HOMEPAGE, exact: true, element: HomePage},
    {path: `${RouteNames.CARDINFO}/:slug`, exact: false, element: CardInfoPage, params: { params: ':slug' }},
]