import {
    DeleteOutlined,
    EditOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";

const CampaignQuickAction = ({ campaign }) => {
    const handleChangeStatus = () => {
        // Implement change status functionality
    };
    const confirmDelete = () => {
        alert(`Deleted ${campaign.title}`);
        console.log("Confirmed");
    };
    const cancelDelete = () => {
        console.log("Cancelled");
    };
    return (
        <div>
            <Link to={`/creators/campaigns/${campaign.id}/edit`}>
                <Button className="mr-2">
                    <EditOutlined />
                </Button>
            </Link>
            <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                okText="Yes"
                cancelText="No"
            >
                <Button className="mr-2" danger>
                    <DeleteOutlined />
                </Button>
            </Popconfirm>
            <Button onClick={handleChangeStatus}>
                {campaign.status === "active" ? (
                    <EyeOutlined />
                ) : (
                    <EyeInvisibleOutlined />
                )}
            </Button>
        </div>
    );
};

export default CampaignQuickAction;
