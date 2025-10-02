import { FallOutlined, RiseOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, Typography } from "antd";

const StatCard = ({ title, value, prefix, percent, icon, positive = true }) => {
    return (
        <Card
            style={{
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                minWidth: 300,
            }}
        >
            <Row justify="space-between" align="middle">
                <Col>
                    <Typography.Text type="secondary">{title}</Typography.Text>
                    <Statistic
                        value={value}
                        prefix={prefix}
                        valueStyle={{ fontSize: 28, fontWeight: 300 }}
                    />
                    {percent !== undefined && (
                        <Typography.Text type={positive ? "success" : "danger"}>
                            {positive ? <RiseOutlined /> : <FallOutlined />}{" "}
                            {positive ? "+" : "-"}
                            {percent}%
                        </Typography.Text>
                    )}
                </Col>

                {icon && (
                    <Col>
                        <div
                            style={{
                                background: "#f0fdf4",
                                padding: 20,
                                borderRadius: "30%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {icon}
                        </div>
                    </Col>
                )}
            </Row>
        </Card>
    );
};

export default StatCard;
