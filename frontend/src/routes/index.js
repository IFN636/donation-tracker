import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Tasks from "../pages/Tasks";

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
        path: "/tasks",
        element: Tasks,
    },
];
