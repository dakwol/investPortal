import React from "react";
import HomePage from "../pages/HomePage/HomePage";
import CardInfoPage from "../pages/CardInfoPage/CardInfoPage";
import BrandsPage from "../pages/BrandsPage/BrandsPage";
import NewsPage from "../pages/NewsPage/NewsPage";
import NewsInfoPage from "../pages/NewsInfoPage/NewsInfoPage";
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
    BRANDS = '/brands',
    NEWS = '/news',
    NEWSINFO = '/news-info',
}

export const publicRoutes: IRoute[] = [
  {path: RouteNames.HOMEPAGE, exact: true, element: HomePage},
  {path: RouteNames.BRANDS, exact: true, element: BrandsPage},
  {path: RouteNames.NEWS, exact: true, element: NewsPage},
  {path: `${RouteNames.CARDINFO}/:slug`, exact: false, element: CardInfoPage, params: { params: ':slug' }},
  {path: `${RouteNames.NEWSINFO}/:slug`, exact: false, element: NewsInfoPage, params: { params: ':slug' }},
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.HOMEPAGE, exact: true, element: HomePage},
    {path: RouteNames.BRANDS, exact: true, element: BrandsPage},
    {path: RouteNames.NEWS, exact: true, element: NewsPage},
    {path: `${RouteNames.CARDINFO}/:slug`, exact: false, element: CardInfoPage, params: { params: ':slug' }},
    {path: `${RouteNames.NEWSINFO}/:slug`, exact: false, element: NewsInfoPage, params: { params: ':slug' }},
]