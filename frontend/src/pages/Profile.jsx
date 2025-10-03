import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar, Button, Input } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import RecentDonations from "../components/donations/RecentDonations";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { user } = useAuth(); // Access user token from context
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        university: "",
        address: "",
    });
    const [recentDonations, setRecentDonations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch profile data from the backend
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get("/api/auth/profile", {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.phone || "",
                    address: response.data.address || "",
                });
            } catch (error) {
                alert("Failed to fetch profile. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        const fetchRecentDonations = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(
                    "/api/donations/donors/recent",
                    {
                        headers: { Authorization: `Bearer ${user.token}` },
                    }
                );
                setRecentDonations(response.data.data || []);
                console.log(response.data.data);
            } catch (error) {
                alert("Failed to fetch recent donations. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchRecentDonations();
            fetchProfile();
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosInstance.put("/api/auth/profile", formData, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            alert("Profile updated successfully!");
        } catch (error) {
            alert("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    return (
        <div className="mt-20">
            <div className="flex flex-col items-center gap-4 pb-8">
                <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    icon={<AntDesignOutlined />}
                />
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-800">
                        {formData.name || "User Name"}
                    </h1>
                    <p className="text-sm text-slate-500">
                        {formData.email || "Email"}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <section className="mx-auto min-w-[500px]">
                    <h2 className="text-base font-semibold mb-4">
                        Personal Information
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4"
                    >
                        <Input
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            className="w-full"
                        />
                        <Input
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            className="w-full"
                        />
                        <Input
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                })
                            }
                            className="w-full"
                        />
                        <Input
                            placeholder="Address"
                            value={formData.address}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    address: e.target.value,
                                })
                            }
                            className="w-full"
                        />

                        <div className="pt-2">
                            <Button htmlType="submit" type="primary" block>
                                Update Information
                            </Button>
                        </div>
                    </form>
                </section>

                <section className="mx-auto min-w-[500px]">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                        <h2 className="text-base font-semibold mb-4">
                            Recent Donations
                        </h2>
                        <RecentDonations dataSource={recentDonations} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Profile;
