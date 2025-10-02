import CreatorLayout from "../components/layout/CreatorLayout";
import DefaultLayout from "../components/layout/DefautlLayout";
import CampaignCreationPage from "../pages/creators/CampaignCreationPage";
import CampaignEditPage from "../pages/creators/CampaignEditPage";
import CampaignsPage from "../pages/creators/CampaignsPage";
import DashboardPage from "../pages/creators/DashboardPage";
import CampaignCreation from "../pages/fundraisers/CampaignCreation";
import CampaignDetail from "../pages/fundraisers/CampaignDetail";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";

export const publicRoutes = [
    {
        path: "/login",
        element: Login,
        layout: DefaultLayout,
    },
    {
        path: "/profile",
        element: Profile,
        layout: DefaultLayout,
    },
    {
        path: "/register",
        element: Register,
        layout: DefaultLayout,
    },
    {
        path: "/fundraisers/creation",
        element: CampaignCreation,
        layout: DefaultLayout,
    },
    {
        path: "/",
        element: HomePage,
        layout: DefaultLayout,
    },
    {
        path: "/fundraisers/:id",
        element: CampaignDetail,
        layout: DefaultLayout,
    },
    {
        path: "/creators/dashboard",
        element: DashboardPage,
        layout: CreatorLayout,
    },
    {
        path: "/creators/campaigns/creation",
        element: CampaignCreationPage,
        layout: CreatorLayout,
    },
    {
        path: "/creators/campaigns",
        element: CampaignsPage,
        layout: CreatorLayout,
    },
    {
        path: "/creators/campaigns/:id/edit",
        element: CampaignEditPage,
        layout: CreatorLayout,
    },
];
