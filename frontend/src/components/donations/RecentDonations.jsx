import { Table, Tag } from "antd";

// const dataSource = ;

const columns = [
    {
        title: "Campaign",
        dataIndex: ["campaign", "title"], // nếu populate thì có thể lấy campaign.title
        key: "campaign",
    },
    {
        title: "Donor",
        dataIndex: ["donor", "name"], // nếu populate User
        key: "donor",
        render: (donor, record) =>
            donor
                ? donor.name || donor._id
                : record.isAnonymous
                ? "Anonymous"
                : "N/A",
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount, record) => `${amount} ${record.currency || "AUD"}`,
    },
    {
        title: "Currency",
        dataIndex: "currency",
        key: "currency",
    },
    {
        title: "Anonymous",
        dataIndex: "isAnonymous",
        key: "isAnonymous",
        render: (val) => (val ? "Yes" : "No"),
    },
    {
        title: "Paid At",
        dataIndex: "paidAt",
        key: "paidAt",
        render: (date) => new Date(date).toLocaleString(),
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (_, record) => {
            if (record.paidAt) {
                return <Tag color="green">Completed</Tag>;
            }
            return <Tag color="orange">Pending</Tag>;
        },
    },
];

const RecentDonations = ({ dataSource }) => {
    return (
        <Table pagination={false} dataSource={dataSource} columns={columns} />
    );
};

export default RecentDonations;
