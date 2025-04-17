import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout.jsx";
import Home from "../pages/HomePage.jsx";
import Favourite from "../pages/FavouritePage.jsx";
import Game from "../pages/GamePage.jsx";
import Search from "../pages/SearchPage.jsx";

const myRouter = () => [
    {
        path: "",
        element: <Home />,
    },
    {
        path: "/search",
        element: <Search />,
    },
    {
        path: "/favorite",
        element: <Favourite />,
    },
    {
        path: "/game",
        element: <Game />,
    },
];

export default createBrowserRouter([
    {
        path: "/",
        element: <Layout />, // Le Layout englobe toutes les pages
        children: myRouter(),
    },
]);