import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import CampaignTable from "../../components/campaigns/CampaignTable";
import { useAuth } from "../../context/AuthContext";
import useDebounce from "../../hooks/useDebounce.js";

const CampaignsPage = () => {
    const { getAccessToken } = useAuth();
    const [campaigns, setCampaigns] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        const params = new URLSearchParams();
        if (debouncedSearchTerm.trim()) {
            params.append("search", debouncedSearchTerm.trim());
        }
        const fetchCampaigns = async () => {
            const response = await axiosInstance.get(
                `/api/campaigns/owned/by-user?${params.toString()}`,
                {
                    headers: { Authorization: `Bearer ${getAccessToken()}` },
                }
            );
            setCampaigns(response.data.data);
        };
        fetchCampaigns();
    }, [getAccessToken, debouncedSearchTerm]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1>Creator Dashboard</h1>
                    <p>Welcome to the Creator Dashboard!</p>
                </div>
                <Link to="/creators/campaigns/new">
                    <Button type="primary">Create New Campaign</Button>
                </Link>
            </div>
            <Input
                placeholder="Search funding needs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                prefix={<SearchOutlined className="text-green-400" />}
                size="large"
            />
            <CampaignTable dataSource={campaigns} />
        </div>
    );
};

export default CampaignsPage;
