export function toFullIsoFromDatetimeLocal(value) {
    if (!value) return "";
    const d = new Date(value);
    if (isNaN(d)) return "";
    return d.toISOString();
}

export function beautifyDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleString("en-US", {
        year: "numeric", // "2025"
        month: "long", // "September"
        minute: "2-digit",
    });
}
