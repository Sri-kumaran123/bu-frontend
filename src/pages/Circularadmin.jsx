import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAllCircularsApi, addCircularApi, deleteCircularApi } from "../api/circular.api";
import { Trash2, UploadCloud, FileText, Loader2 } from "lucide-react";

export default function CircularAdmin() {
    const { register, handleSubmit, reset } = useForm();
    const [circulars, setCirculars] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCirculars();
    }, []);

    const fetchCirculars = async () => {
        try {
            const data = await getAllCircularsApi();
            setCirculars(data);
        } catch (error) {
            console.error("Failed to fetch circulars:", error);
        }
    };

    const onSubmit = async (data) => {
        if (!data.file[0]) {
            alert("Please select a file!");
            return;
        }

        const formData = new FormData();
        formData.append("content", data.content);
        formData.append("file", data.file[0]);

        setLoading(true);
        try {
            await addCircularApi(formData);
            alert("Circular uploaded successfully!");
            reset();
            fetchCirculars();
        } catch (error) {
            console.error("Upload failed:", error);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this circular?")) {
            try {
                await deleteCircularApi(id);
                fetchCirculars();
            } catch (error) {
                console.error("Delete failed:", error);
            }
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">📄 Circular Management</h2>

            {/* Upload Form */}
            <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Upload New Circular</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter circular content"
                        {...register("content", { required: true })}
                        className="bg-gray-100 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    <input
                        type="file"
                        {...register("file", { required: true })}
                        className="w-full bg-gray-100 p-3 rounded-lg"
                        accept=".pdf,.png,.jpg,.jpeg"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-full justify-center hover:bg-blue-700 transition disabled:opacity-50 shadow-md"
                        disabled={loading}
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
                        {loading ? "Uploading..." : "Upload Circular"}
                    </button>
                </form>
            </div>

            {/* Circular List */}
            <div className="bg-white shadow-lg rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Existing Circulars</h3>
                {circulars.length > 0 ? (
                    <div className="space-y-4">
                        {circulars.map((circular) => (
                            <div key={circular._id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-xl transition">
                                <div>
                                    <p className="text-gray-800 font-medium">{circular.content}</p>
                                    {circular.file && (
                                        <a
                                            href={`http://localhost:3000/file/download/${circular.file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 flex items-center gap-2 hover:underline mt-1"
                                        >
                                            <FileText size={18} /> View File
                                        </a>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleDelete(circular._id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center hover:bg-red-700 transition shadow-md"
                                >
                                    <Trash2 size={18} /> Delete
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No circulars found.</p>
                )}
            </div>
        </div>
    );
}
