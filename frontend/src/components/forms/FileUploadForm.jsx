import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../axiosConfig";

const FileUploadForm = ({ onUploadSuccess, onUploadError }) => {
    const [files, setFiles] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length > 10) {
            toast.error("You can only upload up to 10 files");
            return;
        }
        const validFiles = selectedFiles.filter(
            (file) =>
                ["image/png", "image/jpeg"].includes(file.type) &&
                file.size <= 10 * 1024 * 1024
        );
        if (validFiles.length !== selectedFiles.length) {
            toast.error("Some files were rejected (type/size limits)");
        }
        setFiles(validFiles);
    };

    const handleUpload = async () => {
        if (!files || files.length === 0) {
            toast.error("Please select files to upload");
            return;
        }

        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        setIsUploading(true);
        try {
            const response = await axiosInstance.post(
                "/api/files/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success(
                `${
                    response?.data?.length || files.length
                } files uploaded successfully`
            );
            // setFiles(null);
            onUploadSuccess?.(response?.data || []);
            setIsSuccess(true);
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Upload failed";
            toast.error(errorMessage);
            onUploadError?.(errorMessage);
        } finally {
            setIsUploading(false);
        }
    };

    const removeFile = (index) => {
        if (!files) return;
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles.length > 0 ? newFiles : null);
    };

    return (
        <div className="flex flex-col gap-4">
            <div>
                <button
                    type="button"
                    onClick={() => {
                        setIsSuccess(false);
                        fileInputRef.current?.click();
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2 text-white rounded-xl border-0 bg-blue-600 cursor-pointer ${
                        files && files.length > 0 ? "hidden" : ""
                    }`}
                >
                    <Upload size={16} />
                    Choose Files
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".png,.jpg,.jpeg"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            </div>

            {files && files.length > 0 && (
                <div className="flex flex-col gap-2">
                    {files.map((file, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2 border border-gray-300 px-2 py-1 rounded-xl"
                        >
                            <div className="relative">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="w-20 h-20 object-cover rounded-lg shadow-md border border-gray-200"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 rounded-lg"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(i)}
                                className="bg-transparent border-none cursor-pointer p-0"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    ))}

                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                            {files.length} file{files.length !== 1 ? "s" : ""}{" "}
                            selected
                        </span>
                        <button
                            onClick={handleUpload}
                            disabled={isUploading || isSuccess}
                            className={`inline-flex items-center gap-2 px-4 py-2 text-white rounded-xl border-0 ${
                                isUploading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-600 cursor-pointer"
                            }`}
                        >
                            <Upload size={16} />
                            {isUploading ? "Uploading..." : "Upload Files"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUploadForm;
