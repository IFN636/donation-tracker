import { DollarOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import { useAuth } from "../../context/AuthContext";
import RecentDonations from "../donations/RecentDonations";
import StatCard from "../StatCard";

const Dashboard = () => {
    const { getAccessToken } = useAuth();
    const [currentDonations, setCurrentDonations] = useState([]);

    useEffect(() => {
        const fetchRecentDonations = async () => {
            const response = await axiosInstance.get(
                `/api/donations/creators/recent`,
                {
                    headers: { Authorization: `Bearer ${getAccessToken()}` },
                }
            );
            setCurrentDonations(response.data.data);
        };

        fetchRecentDonations();
    }, [getAccessToken]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1>Creator Dashboard</h1>
                    <p>Welcome to the Creator Dashboard!</p>
                </div>
                <Link to="/creators/campaigns/create">
                    <Button type="primary">Create New Campaign</Button>
                </Link>
            </div>
            <div className="flex w-full gap-4">
                <StatCard
                    title="Total Donations"
                    value={12847}
                    prefix="$"
                    percent={12.5}
                    positive={true}
                    icon={
                        <DollarOutlined
                            style={{ fontSize: 24, color: "#16A34A" }}
                        />
                    }
                />

                <StatCard
                    title="Active Campaigns"
                    value={520}
                    percent={4.3}
                    positive={false}
                    icon={
                        <UserOutlined
                            style={{ fontSize: 24, color: "#16A34A" }}
                        />
                    }
                />
                <StatCard
                    title="Supporters"
                    value={520}
                    percent={4.3}
                    positive={false}
                    icon={
                        <UserOutlined
                            style={{ fontSize: 24, color: "#16A34A" }}
                        />
                    }
                />
                <StatCard
                    title="Monthly Growth"
                    value={520}
                    percent={4.3}
                    positive={false}
                    icon={
                        <UserOutlined
                            style={{ fontSize: 24, color: "#16A34A" }}
                        />
                    }
                />
            </div>

            {currentDonations.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">
                    No recent donations to display.
                </p>
            ) : (
                <RecentDonations dataSource={currentDonations} />
            )}
        </div>
    );
};

export default Dashboard;
