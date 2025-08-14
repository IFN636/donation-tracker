import { Button, Layout, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
                borderBottom: "1px solid #10b981",
                padding: "0 24px",
                height: "64px",
            }}
        >
            <Link to="/">
                <Title level={3} style={{ margin: 0, color: "#059669" }}>
                    Donation App
                </Title>
            </Link>
            <Space size="middle">
                <Button
                    type="primary"
                    color="cyan"
                    variant="outlined"
                    onClick={() => {
                        if (!user) {
                            toast.error(
                                "Please login to create a funding need"
                            );
                            navigate("/login");
                            return;
                        }
                        navigate("/fundraisers/creation");
                    }}
                >
                    Launch a Fundraiser
                </Button>

                {user !== null ? (
                    <>
                        <Link to="/profile">
                            <Button type="text" style={{ color: "#059669" }}>
                                Profile
                            </Button>
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
