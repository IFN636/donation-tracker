import { SearchOutlined } from "@ant-design/icons";
import { Input, Select, Table, Tag } from "antd";
import Pagination from "antd/es/pagination";
import CampaignQuickAction from "./CampaignQuickAction";
const { Option } = Select;

const CampaignTable = ({
    dataSource,
    currentPage,
    total,
    handlePageChange,
    searchTerm,
    setSearchTerm,
    sortBy,
    sortOrder,
    handleSortChange,
    handleDelete,
}) => {
    const formatAmount = (amount) => {
        return new Intl.NumberFormat("en-AU", {
            style: "currency",
            currency: "AUD",
        }).format(amount);
    };

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Goal Amount",
            dataIndex: "goalAmount",
            key: "goalAmount",
            render: (value) => formatAmount(value),
        },
        {
            title: "Current Amount",
            dataIndex: "currentAmount",
            key: "currentAmount",
            render: (value) => <strong>{formatAmount(value)}</strong>,
        },
        {
            title: "Backers",
            dataIndex: "backers",
            key: "backers",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const colorMap = {
                    active: "blue",
                    completed: "green",
                    cancelled: "red",
                };

                return (
                    <Tag color={colorMap[status] || "default"}>
                        {status.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: "Deadline",
            dataIndex: "deadline",
            key: "deadline",
            render: (value) => new Date(value).toLocaleString(),
        },
        {
            title: "Image",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (url) => (
                <img
                    src={url}
                    alt="project"
                    style={{ width: 80, borderRadius: 8 }}
                />
            ),
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (value) => new Date(value).toLocaleString(),
        },
        {
            title: "Updated At",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (value) => new Date(value).toLocaleString(),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_value, record) => (
                <CampaignQuickAction
                    campaign={record}
                    onDeleted={handleDelete}
                />
            ),
        },
    ];
    return (
        <>
            <div className="flex justify-between items-center mb-5">
                <Input
                    placeholder="Search funding needs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    prefix={<SearchOutlined className="text-green-400" />}
                    className="w-1/2"
                />
                <Select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={handleSortChange}
                    className="w-48"
                >
                    <Option value="createdAt-desc">Newest First</Option>
                    <Option value="createdAt-asc">Oldest First</Option>
                    <Option value="goalAmount-desc">Highest Goal</Option>
                    <Option value="goalAmount-asc">Lowest Goal</Option>
                    <Option value="currentAmount-desc">Most Raised</Option>
                    <Option value="currentAmount-asc">Least Raised</Option>
                    <Option value="deadline-asc">Deadline Soon</Option>
                    <Option value="deadline-desc">Deadline Later</Option>
                </Select>
                <Pagination
                    current={currentPage}
                    total={total}
                    pageSize={8}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    showQuickJumper
                    showTotal={(total, range) =>
                        `${range[0]}-${range[1]} of ${total} items`
                    }
                />
            </div>
            <Table
                pagination={false}
                dataSource={dataSource}
                columns={columns}
            />
        </>
    );
};

export default CampaignTable;
