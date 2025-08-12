const ShowInputError = ({ name, errors, validationErrors }) => {
    const error = validationErrors?.find((error) => error?.field === name);
    if (error) {
        return <p className="text-red-600 text-sm">{error.message}</p>;
    }

    return (
        <>
            {errors[name] && (
                <p className="text-red-600 text-sm">{errors[name][0]}</p>
            )}
        </>
    );
};

export default ShowInputError;
