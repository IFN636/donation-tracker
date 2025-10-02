import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, Typography } from "antd";

const StatCard = ({ title, value, prefix, percent, icon, positive = true }) => {
    return (
        <Card
            style={{
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
        >
            <Row justify="space-between" align="middle">
                {/* Bên trái */}
                <Col>
                    <Typography.Text type="secondary">{title}</Typography.Text>
                    <Statistic
                        value={value}
                        prefix={prefix}
                        valueStyle={{ fontSize: 28, fontWeight: 600 }}
                    />
                    {percent !== undefined && (
                        <Typography.Text type={positive ? "success" : "danger"}>
                            {positive ? (
                                <ArrowUpOutlined />
                            ) : (
                                <ArrowDownOutlined />
                            )}{" "}
                            {positive ? "+" : "-"}
                            {percent}%
                        </Typography.Text>
                    )}
                </Col>

                {/* Bên phải - Icon */}
                {icon && (
                    <Col>
                        <div
                            style={{
                                background: positive ? "#f0fdf4" : "#fef2f2",
                                padding: 12,
                                borderRadius: "50%",
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
