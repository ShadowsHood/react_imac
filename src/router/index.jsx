import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout.jsx";
import Home from "../pages/HomePage.jsx";
import Favourite from "../pages/FavouritePage.jsx";
import Game from "../pages/GamePage.jsx";

export default createBrowserRouter([
    {
        path: "/",
        element: <Layout />, // Le Layout englobe toutes les pages
        children: [
            { path: "", element: <Home /> },
            { path: "list", element: <Favourite /> },
            { path: "game", element: <Game /> },
        ],
    },
    // {
    //     path: "/",
    //     element: <Home />,
    // },
    // {
    //     path: "/contact",
    //     element: <Favourite />,
    // },
    // {
    //     path: "/game",
    //     element: <Game />,
    // },
]);