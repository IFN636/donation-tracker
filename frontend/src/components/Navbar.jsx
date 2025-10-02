import { Button, Layout, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const { Header } = Layout;
const { Title } = Typography;

const navItems = [
    { label: "Contact", path: "#", loginRequired: false },
    { label: "How It works", path: "#", loginRequired: false },
    {
        label: "Creator Dashboard",
        path: "/creators/dashboard",
        loginRequired: true,
    },
];

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
                borderBottom: "1px solid #10b981",
                padding: "0 24px",
                height: "64px",
                position: "sticky",
                top: 0,
                zIndex: 100,
            }}
        >
            <Link to="/">
                <Title level={3} style={{ margin: 0, color: "#059669" }}>
                    Donation App
                </Title>
            </Link>
            <Space size="middle">
                {navItems.map((item) => {
                    if (item.loginRequired && !user) return null;
                    return (
                        <Link key={item.path} to={item.path}>
                            <Button type="link" style={{ color: "#000000" }}>
                                {item.label}
                            </Button>
                        </Link>
                    );
                })}

                {user !== null ? (
                    <>
                        <Button
                            type="link"
                            style={{ color: "#10b981", fontWeight: "bold" }}
                            onClick={() => {
                                if (!user) {
                                    toast.error(
                                        "Please login to create a fundraiser"
                                    );
                                    navigate("/login");
                                    return;
                                }
                                navigate("/creators/campaigns/creation");
                            }}
                        >
                            Start a Fundraiser
                        </Button>
                        <Link to="/profile">
                            <Button type="primary">Profile</Button>
                        </Link>
                        <Button
                            onClick={handleLogout}
                            color="danger"
                            variant="outlined"
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <Button
                                type="default"
                                style={{
                                    borderColor: "#10b981",
                                    color: "#059669",
                                }}
                            >
                                Login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button
                                type="primary"
                                style={{
                                    backgroundColor: "#059669",
                                    borderColor: "#059669",
                                }}
                            >
                                Get Started
                            </Button>
                        </Link>
                    </>
                )}
            </Space>
        </Header>
    );
};

export default Navbar;
