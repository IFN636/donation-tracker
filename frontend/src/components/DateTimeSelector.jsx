const DateTimeSelector = ({ onChange }) => {
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
            />
        </div>
    );
};

export default DateTimeSelector;
