import { Layout, theme } from "antd";
import Navbar from "../Navbar";
const { Content } = Layout;

const DefaultLayout = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Navbar />
            <Content>
                <div
                    style={{
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </div>
            </Content>
        </Layout>
    );
};
export default DefaultLayout;
