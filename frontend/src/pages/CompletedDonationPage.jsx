import { CheckCircleOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { Button, Card, Col, Result, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

import { formatAmount } from "../utils";

const CompletedDonationPage = () => {
    const { donationId } = useParams();
    const [donationDetails, setDonationDetails] = useState(null);
    const { getAccessToken } = useAuth();

    useEffect(() => {
        const fetchDonationDetails = async () => {
            try {
                const response = await axiosInstance.get(
                    `/api/donations/${donationId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${getAccessToken()}`,
                        },
                    }
                );
                setDonationDetails(response.data);
            } catch (error) {
                console.error("Error fetching donation details:", error);
            }
        };
        fetchDonationDetails();
    }, [donationId, getAccessToken]);

    return (
        <div>
            <div
                style={{
                    background: "#f7f9fc",
                    minHeight: "100vh",
                    padding: "56px 16px",
                }}
            >
                <Row justify="center">
                    <Col xs={24} sm={20} md={16} lg={12} xl={10}>
                        <Card
                            style={{
                                borderRadius: 16,
                                boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                            }}
                        >
                            <Space
                                direction="vertical"
                                size="large"
                                align="center"
                                style={{ width: "100%" }}
                            >
                                <Result
                                    status="success"
                                    title="Thank You for Your Donation!"
                                    subTitle="A receipt has been sent to your email."
                                    icon={
                                        <CheckCircleTwoTone twoToneColor="#10b981" />
                                    }
                                />

                                <div style={{ textAlign: "center" }}>
                                    <Typography.Title
                                        level={2}
                                        style={{ margin: 0, color: "#16a34a" }}
                                    >
                                        {formatAmount(donationDetails?.amount)}
                                    </Typography.Title>
                                </div>
                                <Link to={`/`}>
                                    <Button type="primary">
                                        Go back to Home
                                    </Button>
                                </Link>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </div>
            <CheckCircleOutlined />
        </div>
    );
};
export default CompletedDonationPage;
