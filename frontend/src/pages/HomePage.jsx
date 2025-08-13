import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import FundingNeedList from "../components/FundingNeedList";
import useDebounce from "../hooks/useDebounce.js";

const HomePage = () => {
    const [fundingNeeds, setFundingNeeds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");

    // Debounce search term with 500ms delay
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        const fetchFundingNeeds = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams({
                    page: currentPage,
                    limit: 8,
                    sortBy,
                    sortOrder,
                });

                if (debouncedSearchTerm.trim()) {
                    params.append("search", debouncedSearchTerm.trim());
                }

                const response = await axiosInstance.get(
                    `/api/funding-needs?${params.toString()}`
                );
                setFundingNeeds(response.data.data);
                setTotalPages(response.data.totalPages || 1);
            } catch (error) {
                console.error("Failed to fetch funding needs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFundingNeeds();
    }, [currentPage, debouncedSearchTerm, sortBy, sortOrder]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (newSortBy) => {
        if (sortBy === newSortBy) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(newSortBy);
            setSortOrder("desc");
        }
        setCurrentPage(1);
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(
            1,
            currentPage - Math.floor(maxVisiblePages / 2)
        );
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Previous button
        buttons.push(
            <button
                key="prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 mx-1 rounded ${
                    currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-green-600 border border-green-300 hover:bg-green-50"
                }`}
            >
                Previous
            </button>
        );

        // Page number buttons
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-2 mx-1 rounded ${
                        i === currentPage
                            ? "bg-green-600 text-white"
                            : "bg-white text-green-600 border border-green-300 hover:bg-green-50"
                    }`}
                >
                    {i}
                </button>
            );
        }

        // Next button
        buttons.push(
            <button
                key="next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 mx-1 rounded ${
                    currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-green-600 border border-green-300 hover:bg-green-50"
                }`}
            >
                Next
            </button>
        );

        return buttons;
    };

    return (
        <div className="container mx-auto px-5 py-8">
            <div className="flex flex-col mb-10 lg:flex-row gap-6 items-center justify-between">
                <div className="flex-1 max-w-lg">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search funding needs..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full pl-12 pr-4 py-2 border-2 border-green-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-green-300 focus:border-green-400 transition-all duration-200 bg-white shadow-sm"
                        />
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg
                                className="h-6 w-6 text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-green-700">
                        Sort by:
                    </span>
                    <div className="relative">
                        <select
                            value={`${sortBy}-${sortOrder}`}
                            onChange={(e) => {
                                // eslint-disable-next-line no-unused-vars
                                const [field, order] =
                                    e.target.value.split("-");
                                handleSortChange(field);
                            }}
                            className="appearance-none bg-white border-2 border-green-200 rounded-xl px-4 py-2 pr-10 text-sm font-medium text-green-700 focus:outline-none focus:ring-3 focus:ring-green-300 focus:border-green-400 transition-all duration-200 shadow-sm cursor-pointer hover:border-green-300"
                        >
                            <option value="createdAt-desc">Newest First</option>
                            <option value="createdAt-asc">Oldest First</option>
                            <option value="goalAmount-desc">
                                Highest Goal
                            </option>
                            <option value="goalAmount-asc">Lowest Goal</option>
                            <option value="currentAmount-desc">
                                Most Raised
                            </option>
                            <option value="currentAmount-asc">
                                Least Raised
                            </option>
                            <option value="deadline-asc">Deadline Soon</option>
                            <option value="deadline-desc">
                                Deadline Later
                            </option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg
                                className="h-5 w-5 text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                </div>
            ) : (
                <>
                    <FundingNeedList fundingNeeds={fundingNeeds} />

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-8">
                            <div className="flex items-center">
                                {renderPaginationButtons()}
                            </div>
                        </div>
                    )}

                    <div className="text-center mt-4 text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </div>
                </>
            )}
        </div>
    );
};

export default HomePage;
