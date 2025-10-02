import { Button } from "antd";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import CampaignTable from "../../components/campaigns/CampaignTable";
import { useAuth } from "../../context/AuthContext";
import useDebounce from "../../hooks/useDebounce.js";

const CampaignsPage = () => {
    const { getAccessToken, user } = useAuth();
    const [campaigns, setCampaigns] = useState([]);
    const [total, setTotal] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 8,
        sortBy: "createdAt",
        sortOrder: "desc",
        search: "",
    });

    const debouncedSearchTerm = useDebounce(pagination.search, 500);

    useEffect(() => {
        setPagination((prev) => ({
            ...prev,
            page: parseInt(searchParams.get("page") || "1", 10),
            limit: parseInt(searchParams.get("limit") || "8", 10),
            search: searchParams.get("search") || "",
            sortBy: searchParams.get("sortBy") || "createdAt",
            sortOrder: searchParams.get("sortOrder") || "desc",
        }));
        setCurrentPage(parseInt(searchParams.get("page") || "1", 10));
    }, [searchParams]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (debouncedSearchTerm.trim()) {
            params.append("search", debouncedSearchTerm.trim());
        }

        const fetchCampaigns = async () => {
            const response = await axiosInstance.get(
                `/api/campaigns/owned/by-user?${searchParams.toString()}`,
                {
                    headers: { Authorization: `Bearer ${getAccessToken()}` },
                }
            );
            setCampaigns(response.data.data);
            setTotal(response.data.total || 0);
            setCurrentPage(Number(response.data.page) || 1);
        };
        fetchCampaigns();
    }, [getAccessToken, debouncedSearchTerm, searchParams, pagination]);

    const handlePageChange = (page) => {
        setSearchParams({ page: page.toString() });
        setPagination((prev) => ({ ...prev, page: page }));
    };
    const handleSortChange = (value) => {
        const [field, order] = value.split("-");
        setPagination((prev) => ({
            ...prev,
            sortBy: field,
            sortOrder: order,
        }));
        setCurrentPage(1);
        setSearchParams({ sortBy: field, sortOrder: order });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Creator Dashboard</h1>
                    <p>Welcome to the Creator Dashboard! {user.name}</p>
                </div>
                <Link to="/creators/campaigns/new">
                    <Button type="primary">Create New Campaign</Button>
                </Link>
            </div>

            <CampaignTable
                dataSource={campaigns}
                currentPage={currentPage}
                total={total}
                handlePageChange={handlePageChange}
                setSearchTerm={(e) =>
                    setPagination((prev) => ({
                        ...prev,
                        search: e.target.value,
                    }))
                }
                searchTerm={pagination.search}
                sortBy={pagination.sortBy}
                sortOrder={pagination.sortOrder}
                handleSortChange={handleSortChange}
            />
        </div>
    );
};

export default CampaignsPage;
