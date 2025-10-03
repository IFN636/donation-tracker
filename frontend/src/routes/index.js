import CreatorLayout from "../components/layout/CreatorLayout";
import DefaultLayout from "../components/layout/DefautlLayout";
import CompletedDonationPage from "../pages/CompletedDonationPage";
import CampaignsPage from "../pages/creators/CampaignsPage";
import CreateCampaignPage from "../pages/creators/CreateCampaignPage";
import DashboardPage from "../pages/creators/DashboardPage";
import EditCampaignPage from "../pages/creators/EditCampaignPage";
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
        path: "/donations/completed/:donationId",
        element: CompletedDonationPage,
        layout: DefaultLayout,
    },
    {
        path: "/",
        element: HomePage,
        layout: DefaultLayout,
    },
    {
        path: "/fundraisers/:campaignId",
        element: CampaignDetail,
        layout: DefaultLayout,
    },
    {
        path: "/creators/dashboard",
        element: DashboardPage,
        layout: CreatorLayout,
    },
    {
        path: "/creators/campaigns/create",
        element: CreateCampaignPage,
        layout: CreatorLayout,
    },
    {
        path: "/creators/campaigns",
        element: CampaignsPage,
        layout: CreatorLayout,
    },
    {
        path: "/creators/campaigns/:campaignId/edit",
        element: EditCampaignPage,
        layout: CreatorLayout,
    },
];
