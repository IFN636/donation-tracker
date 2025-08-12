import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import CreationFundingNeed from "../pages/fundraisers/CreationFundingNeed";

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
];
