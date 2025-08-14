import { Button, Checkbox, Form, Input, Modal, Select } from "antd";

const DonationInputModal = ({ open, onCancel, fundingNeedId }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        const { amount, paymentMethod, anonymous } = values;
        const donation = {
            amount,
            paymentMethod,
            anonymous,
            fundingNeedId,
        };

        console.log(donation);
    };

    return (
        <Modal
            title="Donation Input"
            open={open}
            onCancel={onCancel}
            footer={null}
            className="rounded-2xl"
            centered
        >
            <Form layout="vertical" form={form} onFinish={handleSubmit}>
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: "Please enter donation amount",
                        },
                        {
                            validator: (_, value) => {
                                if (value && value > 0) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("Amount must be greater than 0")
                                );
                            },
                        },
                    ]}
                >
                    <Input
                        id="amount"
                        placeholder="Enter amount in AUD"
                        prefix="AUD"
                        min={1}
                    />
                </Form.Item>

                <Form.Item
                    label="Payment Method"
                    name="paymentMethod"
                    rules={[
                        {
                            required: true,
                            message: "Please select a payment method",
                        },
                    ]}
                >
                    <Select placeholder="Select payment method">
                        <Select.Option value="credit-card">
                            Credit Card
                        </Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name="anonymous" valuePropName="checked">
                    <Checkbox>Donate as anonymous</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button
                        style={{
                            backgroundColor: "#059669",
                            borderColor: "#059669",
                        }}
                        type="primary"
                        htmlType="submit"
                        block
                    >
                        Donate Now
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default DonationInputModal;
