export const formatAmount = (amount, currency = "AUD") => {
    return new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: currency || "AUD",
    }).format(amount);
};

export const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-AU", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
};

export const progressPercentage = (currentAmount, goalAmount) => {
    return Math.ceil((currentAmount / goalAmount) * 100);
};
