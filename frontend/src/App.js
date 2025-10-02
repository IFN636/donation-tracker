import { ConfigProvider } from "antd";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Fragment } from "react/jsx-runtime";
import { publicRoutes } from "./routes";

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#16A34A",
                    colorSuccess: "#16A34A",
                    colorWarning: "#FACC15",
                    colorError: "#DC2626",
                    colorInfo: "#2563EB",

                    borderRadius: 8,
                    fontFamily: "Inter, sans-serif",

                    colorBgContainer: "#FFFFFF",
                    colorText: "#111827",
                    colorTextSecondary: "#6B7280",
                    colorBorder: "#E5E7EB",
                    colorBgLayout: "#F9FAFB",
                },
            }}
        >
            <Router>
                <Routes>
                    {publicRoutes.map((route) => {
                        const Element = route.element;
                        const Layout = !route.layout ? Fragment : route.layout;
                        return (
                            <Route
                                path={route.path}
                                element={
                                    <Layout>
                                        <Element />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
                <ToastContainer position="bottom-left" />
            </Router>
        </ConfigProvider>
    );
}

export default App;
