const FundingNeedItem = ({ fundingNeed }) => {
    const {
        title,
        goalAmount,
        currentAmount = 0,
        currency,
        deadline,
        imageUrl,
        createdBy,
        status,
    } = fundingNeed;

    const progressPercentage = Math.min(
        (currentAmount / goalAmount) * 100,
        100
    );
    const daysLeft = Math.ceil(
        (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
    );
    const isExpired = daysLeft < 0;

    const formatAmount = (amount) => {
        return new Intl.NumberFormat("en-AU", {
            style: "currency",
            currency: currency || "AUD",
        }).format(amount);
    };

    return (
        <div className="bg-white cursor-pointer rounded-3xl shadow-md border border-green-100 overflow-hidden hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-52 object-cover"
                />
                <div className="absolute top-3 right-3">
                    <span
                        className={`px-3 py-2 rounded-full text-xs font-semibold ${
                            isExpired
                                ? "bg-red-500 text-white"
                                : daysLeft <= 7
                                ? "bg-orange-500 text-white"
                                : "bg-green-500 text-white"
                        }`}
                    >
                        {isExpired ? "Expired" : `${daysLeft}d left`}
                    </span>
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 h-14">
                    {title}
                </h3>

                <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-green-600 uppercase tracking-wide">
                            {status === "completed"
                                ? "Completed"
                                : "In Progress"}
                        </span>
                        <span className="text-xs font-bold text-green-700">
                            {Math.round(progressPercentage)}%
                        </span>
                    </div>
                    <div className="w-full bg-green-100 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-xs text-green-500 uppercase tracking-wide">
                            Raised
                        </p>
                        <p className="text-base font-bold text-gray-800">
                            {formatAmount(currentAmount)}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-green-500 uppercase tracking-wide">
                            Goal
                        </p>
                        <p className="text-base font-bold text-gray-800">
                            {formatAmount(goalAmount)}
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-green-100">
                    <div className="text-xs text-gray-500">
                        Created by{" "}
                        <span className="font-medium text-green-700">
                            {createdBy?.name || "Anonymous"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FundingNeedItem;
