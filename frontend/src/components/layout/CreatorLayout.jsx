import { FolderOpenOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
const { Content, Sider } = Layout;
const items = [
    {
        key: "1",
        icon: <HomeOutlined />,
        label: <Link to="/creators/dashboard">Dashboard</Link>,
    },
    {
        key: "2",
        icon: <FolderOpenOutlined />,
        label: <Link to="/creators/campaigns">Campaigns</Link>,
    },
];
const CreatorLayout = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                theme="light"
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="mt-10">
                    <Menu
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        items={items}
                        onClick={(e) => {
                            console.log("click ", e);
                        }}
                    />
                </div>
            </Sider>
            <Layout>
                <Navbar />
                <Content style={{ margin: "10px" }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
export default CreatorLayout;
