function formatDate(isoString) {
    const date = new Date(isoString);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const DateTimeSelector = ({ onChange, value }) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

    return (
        <div>
            <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-700"
            >
                Deadline
            </label>
            <input
                id="deadline"
                type="datetime-local"
                min={minDateTime}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                onChange={onChange}
                value={formatDate(value) || ""}
            />
        </div>
    );
};

export default DateTimeSelector;
