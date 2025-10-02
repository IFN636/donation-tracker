import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../axiosConfig";
import { useAuth } from "../../context/AuthContext";

const CampaignQuickAction = ({ campaign, onDeleted }) => {
    const { getAccessToken } = useAuth();
    const confirmDelete = async () => {
        try {
            const response = await axiosInstance.delete(
                `/api/campaigns/${campaign._id}`,
                {
                    headers: { Authorization: `Bearer ${getAccessToken()}` },
                }
            );
            toast.success(response.data.message);
            onDeleted(campaign._id);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };
    const cancelDelete = () => {
        toast.error("Campaign deletion cancelled");
    };
    return (
        <div>
            <Link to={`/creators/campaigns/${campaign.id}/edit`}>
                <Button className="mr-2">
                    <EditOutlined />
                </Button>
            </Link>
            <Popconfirm
                title="Delete the campaign"
                description={`Are you sure to delete this ${campaign.title}?`}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                okText="Yes"
                cancelText="No"
            >
                <Button className="mr-2" danger>
                    <DeleteOutlined />
                </Button>
            </Popconfirm>
        </div>
    );
};

export default CampaignQuickAction;
