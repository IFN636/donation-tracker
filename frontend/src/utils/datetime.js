export function toFullIsoFromDatetimeLocal(value) {
    if (!value) return "";
    const d = new Date(value);
    if (isNaN(d)) return "";
    return d.toISOString();
}
