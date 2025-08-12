import CreationFundingNeed from "../pages/fundraisers/CreationFundingNeed";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

export const publicRoutes = [
    {
        path: "/login",
        element: Login,
    },
    {
        path: "/profile",
        element: Profile,
    },
    {
        path: "/register",
        element: Register,
    },
    {
        path: "/fundraisers/creation",
        element: CreationFundingNeed,
    },
    {
        path: "/",
        element: HomePage,
    },
];
