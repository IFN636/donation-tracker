import { Button, Layout, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Header
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
                borderBottom: "1px solid #f0f0f0",
                padding: "0 24px",
                height: "64px",
            }}
        >
            <Link to="/">
                <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
                    Donation App
                </Title>
            </Link>
            <Space size="middle">
                {user !== null ? (
                    <>
                        <Link to="/profile">
                            <Button type="text">Profile</Button>
                        </Link>
                        <Button onClick={handleLogout} type="primary" danger>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <Button type="default">Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button type="primary">Get Started</Button>
                        </Link>
                    </>
                )}
            </Space>
        </Header>
    );
};

export default Navbar;
