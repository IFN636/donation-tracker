import { useState } from "react";
import { useNavigate } from "react-router-dom";
import z from "zod";
import axiosInstance from "../axiosConfig";

import { toast } from "react-toastify";
import ShowInputError from "../components/ShowInputError";

const registerSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().email("Please enter a valid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password needs at least 1 uppercase letter")
        .regex(/[a-z]/, "Password needs at least 1 lowercase letter")
        .regex(/\d/, "Password needs at least 1 number"),
});

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [validationErrors, setValidationErrors] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = registerSchema.safeParse(formData);
            if (!result.success) {
                toast.error("Registration failed. Please try again.");
                const { fieldErrors, formErrors } = result.error.flatten();
                setErrors({
                    ...fieldErrors,
                    form: formErrors[0] || "",
                });
                return;
            }
            await axiosInstance.post("/api/auth/register", formData);
            toast.success("Registration successful. Please log in.");
            navigate("/login");
        } catch (error) {
            toast.error("Registration failed. Please try again.");
            if (error?.response?.data?.errorType === "validation") {
                setValidationErrors(error?.response?.data?.validationErrors);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-50 p-8 shadow-lg rounded-2xl max-w-md mx-auto border border-gray-200"
            >
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
                    Register Today
                </h1>
                <div className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                        <ShowInputError
                            name={"name"}
                            validationErrors={validationErrors}
                            errors={errors}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                        <ShowInputError
                            name={"email"}
                            validationErrors={validationErrors}
                            errors={errors}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Choose a strong password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                        <ShowInputError
                            name={"password"}
                            validationErrors={validationErrors}
                            errors={errors}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-8 w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default Register;
