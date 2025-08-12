import { useState } from "react";
import DateTimeSelector from "./DateTimeSelector";
import FileUploadForm from "./FileUploadForm";

const FundingNeedForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        goalAmount: 0,
        currency: "AUD",
        deadline: "",
        status: "active",
        currentAmount: 0,
        category: "",
        imageUrl: "",
    });

    return (
        <div className="max-w-md mx-auto mt-20">
            <form className="bg-gray-50 p-8 shadow-lg rounded-2xl max-w-md mx-auto border border-gray-200">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
                    Create Funding Need
                </h1>
                <div className="space-y-6">
                    <div>
                        <label
                            htmlFor="Title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Enter the title of the funding need"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                }))
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Enter the description of the funding need"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="goalAmount"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Goal Amount
                        </label>
                        <input
                            id="goalAmount"
                            type="number"
                            placeholder="Enter the goal amount of the funding need"
                            value={formData.goalAmount}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    goalAmount: e.target.value,
                                }))
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="currency"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Currency
                        </label>
                        <select
                            id="currency"
                            disabled
                            value={formData.currency}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    currency: e.target.value,
                                }))
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="AUD">AUD</option>
                        </select>
                    </div>
                    <DateTimeSelector
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                deadline: e.target.value,
                            }))
                        }
                    />

                    <FileUploadForm
                        onUploadSuccess={(images) =>
                            setFormData((prev) => ({
                                ...prev,
                                imageUrl: images[0],
                            }))
                        }
                    />

                    <div className="flex justify-between gap-3">
                        <button className="w-full bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FundingNeedForm;
