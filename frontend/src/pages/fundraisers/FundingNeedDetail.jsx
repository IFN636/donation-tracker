import {
    CalendarOutlined,
    EnvironmentOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {
    Avatar,
    Button,
    Card,
    Col,
    Divider,
    Progress,
    Row,
    Space,
    Tag,
    Typography,
} from "antd";
import { useParams } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const FundingNeedDetail = () => {
    const { id } = useParams();

    const handleDonate = () => {
        // TODO: Implement donation functionality
        console.log("Donate button clicked for funding need:", id);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Hero Section */}
                <Card
                    className="mb-8 overflow-hidden"
                    style={{ borderRadius: "24px" }}
                >
                    <div className="relative">
                        <img
                            src="https://via.placeholder.com/1200x400"
                            alt="Funding Need"
                            className="w-full h-96 object-cover"
                        />
                        <div className="absolute top-6 right-6">
                            <Tag
                                color="green"
                                className="text-sm font-semibold"
                            >
                                30d left
                            </Tag>
                        </div>
                    </div>

                    <div className="p-8">
                        <Row gutter={32}>
                            {/* Main Content */}
                            <Col xs={24} lg={16}>
                                <Title level={1} className="mb-4">
                                    Help Build Clean Water Wells in Rural
                                    Communities
                                </Title>

                                <Space className="mb-6">
                                    <Avatar
                                        src="https://via.placeholder.com/48x48"
                                        size={48}
                                        icon={<UserOutlined />}
                                    />
                                    <div>
                                        <Text strong className="block">
                                            John Doe
                                        </Text>
                                        <Text
                                            type="secondary"
                                            className="text-sm"
                                        >
                                            Campaign Creator
                                        </Text>
                                    </div>
                                </Space>

                                <div className="mb-8">
                                    <Paragraph className="text-gray-700 leading-relaxed">
                                        Access to clean water is a fundamental
                                        human right, yet millions of people in
                                        rural communities around the world still
                                        lack this basic necessity. Our mission
                                        is to build sustainable water wells that
                                        will provide clean, safe drinking water
                                        to communities in need.
                                    </Paragraph>
                                    <Paragraph className="text-gray-700 leading-relaxed">
                                        Each well we build can serve up to 500
                                        people and will be maintained by trained
                                        local technicians. Your contribution
                                        will directly impact families, children,
                                        and entire communities by providing them
                                        with reliable access to clean water.
                                    </Paragraph>
                                </div>
                            </Col>

                            {/* Funding Progress Sidebar */}
                            <Col xs={24} lg={8}>
                                <Card
                                    className="sticky top-8"
                                    style={{
                                        backgroundColor: "#f9fafb",
                                        borderRadius: "16px",
                                    }}
                                >
                                    <div className="mb-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <Text className="text-2xl font-bold text-green-600">
                                                $15,750
                                            </Text>
                                            <Text
                                                type="secondary"
                                                className="text-sm"
                                            >
                                                of $25,000 goal
                                            </Text>
                                        </div>

                                        <Progress
                                            percent={63}
                                            strokeColor={{
                                                "0%": "#10b981",
                                                "100%": "#059669",
                                            }}
                                            className="mb-4"
                                        />

                                        <Row
                                            gutter={16}
                                            className="text-center"
                                        >
                                            <Col span={12}>
                                                <Text className="text-2xl font-bold text-gray-800 block">
                                                    63%
                                                </Text>
                                                <Text
                                                    type="secondary"
                                                    className="text-sm"
                                                >
                                                    Funded
                                                </Text>
                                            </Col>
                                            <Col span={12}>
                                                <Text className="text-2xl font-bold text-gray-800 block">
                                                    127
                                                </Text>
                                                <Text
                                                    type="secondary"
                                                    className="text-sm"
                                                >
                                                    Backers
                                                </Text>
                                            </Col>
                                        </Row>
                                    </div>

                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={handleDonate}
                                        className="w-full mb-4"
                                        style={{
                                            height: "48px",
                                            borderRadius: "12px",
                                            backgroundColor: "#059669",
                                            borderColor: "#059669",
                                        }}
                                    >
                                        Donate Now
                                    </Button>

                                    <Space
                                        direction="vertical"
                                        className="w-full"
                                        size="small"
                                    >
                                        <div className="flex justify-between">
                                            <Space>
                                                <CalendarOutlined />
                                                <Text type="secondary">
                                                    Campaign ends:
                                                </Text>
                                            </Space>
                                            <Text strong>Dec 31, 2024</Text>
                                        </div>
                                        <div className="flex justify-between">
                                            <Space>
                                                <EnvironmentOutlined />
                                                <Text type="secondary">
                                                    Location:
                                                </Text>
                                            </Space>
                                            <Text strong>Rural Kenya</Text>
                                        </div>
                                    </Space>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Card>

                {/* Updates, Comments & Leaderboard Section */}
                <Row gutter={32}>
                    {/* Recent Updates */}
                    <Col xs={24} lg={8}>
                        <Card
                            title="Recent Updates"
                            style={{ borderRadius: "16px" }}
                        >
                            <Space
                                direction="vertical"
                                className="w-full"
                                size="large"
                            >
                                <div className="border-l-4 border-green-500 pl-4">
                                    <Text strong className="block">
                                        Well Construction Begins!
                                    </Text>
                                    <Text
                                        type="secondary"
                                        className="text-sm block mb-2"
                                    >
                                        2 days ago
                                    </Text>
                                    <Text>
                                        We've reached our first milestone and
                                        construction has officially begun...
                                    </Text>
                                </div>
                                <div className="border-l-4 border-blue-500 pl-4">
                                    <Text strong className="block">
                                        50% Funding Milestone Reached
                                    </Text>
                                    <Text
                                        type="secondary"
                                        className="text-sm block mb-2"
                                    >
                                        1 week ago
                                    </Text>
                                    <Text>
                                        Thanks to all our amazing backers, we've
                                        reached 50% of our funding goal...
                                    </Text>
                                </div>
                            </Space>
                        </Card>
                    </Col>

                    {/* Comments */}
                    <Col xs={24} lg={8}>
                        <Card title="Comments" style={{ borderRadius: "16px" }}>
                            <Space
                                direction="vertical"
                                className="w-full"
                                size="large"
                            >
                                <div className="flex gap-3">
                                    <Avatar
                                        src="https://via.placeholder.com/40x40"
                                        size={40}
                                        icon={<UserOutlined />}
                                    />
                                    <div className="flex-1">
                                        <Text strong className="block">
                                            Sarah Johnson
                                        </Text>
                                        <Text
                                            type="secondary"
                                            className="text-sm block mb-1"
                                        >
                                            3 days ago
                                        </Text>
                                        <Text>
                                            This is such an important cause.
                                            Happy to support!
                                        </Text>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Avatar
                                        src="https://via.placeholder.com/40x40"
                                        size={40}
                                        icon={<UserOutlined />}
                                    />
                                    <div className="flex-1">
                                        <Text strong className="block">
                                            Mike Chen
                                        </Text>
                                        <Text
                                            type="secondary"
                                            className="text-sm block mb-1"
                                        >
                                            5 days ago
                                        </Text>
                                        <Text>
                                            Looking forward to seeing the impact
                                            this will make!
                                        </Text>
                                    </div>
                                </div>
                            </Space>
                        </Card>
                    </Col>

                    {/* Top Donors Leaderboard */}
                    <Col xs={24} lg={8}>
                        <Card
                            title="Top Donors"
                            style={{ borderRadius: "16px" }}
                        >
                            <Space
                                direction="vertical"
                                className="w-full"
                                size="large"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        style={{ backgroundColor: "#faad14" }}
                                        size={32}
                                    >
                                        1
                                    </Avatar>
                                    <Avatar
                                        src="https://via.placeholder.com/40x40"
                                        size={40}
                                        icon={<UserOutlined />}
                                    />
                                    <div className="flex-1">
                                        <Text strong className="block">
                                            Emily Rodriguez
                                        </Text>
                                        <Text className="text-green-600 font-semibold">
                                            $2,500
                                        </Text>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        style={{ backgroundColor: "#8c8c8c" }}
                                        size={32}
                                    >
                                        2
                                    </Avatar>
                                    <Avatar
                                        src="https://via.placeholder.com/40x40"
                                        size={40}
                                        icon={<UserOutlined />}
                                    />
                                    <div className="flex-1">
                                        <Text strong className="block">
                                            David Thompson
                                        </Text>
                                        <Text className="text-green-600 font-semibold">
                                            $1,800
                                        </Text>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        style={{ backgroundColor: "#fa8c16" }}
                                        size={32}
                                    >
                                        3
                                    </Avatar>
                                    <Avatar
                                        src="https://via.placeholder.com/40x40"
                                        size={40}
                                        icon={<UserOutlined />}
                                    />
                                    <div className="flex-1">
                                        <Text strong className="block">
                                            Lisa Wang
                                        </Text>
                                        <Text className="text-green-600 font-semibold">
                                            $1,200
                                        </Text>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        style={{
                                            backgroundColor: "#d9d9d9",
                                            color: "#595959",
                                        }}
                                        size={32}
                                    >
                                        4
                                    </Avatar>
                                    <Avatar
                                        src="https://via.placeholder.com/40x40"
                                        size={40}
                                        icon={<UserOutlined />}
                                    />
                                    <div className="flex-1">
                                        <Text strong className="block">
                                            James Miller
                                        </Text>
                                        <Text className="text-green-600 font-semibold">
                                            $950
                                        </Text>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Avatar
                                        style={{
                                            backgroundColor: "#d9d9d9",
                                            color: "#595959",
                                        }}
                                        size={32}
                                    >
                                        5
                                    </Avatar>
                                    <Avatar
                                        src="https://via.placeholder.com/40x40"
                                        size={40}
                                        icon={<UserOutlined />}
                                    />
                                    <div className="flex-1">
                                        <Text strong className="block">
                                            Anna Foster
                                        </Text>
                                        <Text className="text-green-600 font-semibold">
                                            $750
                                        </Text>
                                    </div>
                                </div>
                            </Space>
                            <Divider />
                            <Text
                                type="secondary"
                                className="text-xs text-center block"
                            >
                                Showing top 5 donors • 122 more supporters
                            </Text>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default FundingNeedDetail;
