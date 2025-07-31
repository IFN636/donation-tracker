import { useActionState, useState, useTransition } from "react";

export const useFormAction = ({
    initialData,
    initialState,
    action,
    formValidationSchemas,
}) => {
    const [formData, setFormData] = useState(initialData);
    const [state, formAction] = useActionState(action, initialState, null);
    const [validationForm, setValidationForm] = useState();
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData) => {
        if (formValidationSchemas) {
            setValidationForm(false);
        }
        startTransition(() => formAction(formData));
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checked = e.target.checked;
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleChangeArray = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    return {
        formData,
        state,
        isPending,
        validationForm,
        handleChangeArray,
        setFormData,
        handleChange,
        handleSubmit,
    };
};
