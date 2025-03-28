import { useEffect, useState } from "react";
import { getAllBatch, createBatch, updateBatchYear, updateBatchSemester } from "../api/batch.api";
import { uploadStudent } from "../api/student.api";
import { ChevronDown, Edit, Eye, Upload } from "lucide-react";

export default function AdminDashboard() {
    const [batches, setBatches] = useState([]);
    const [course, setCourse] = useState("");
    const [loading, setLoading] = useState(false);
    const [openBatch, setOpenBatch] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchBatches();
    }, []);

    const fetchBatches = async () => {
        try {
            const res = await getAllBatch();
            setBatches(res.data);
        } catch (err) {
            console.error("Error fetching batches:", err);
        }
    };

    const handleCreateBatch = async () => {
        if (!course) return alert("Please select a course");
        setLoading(true);
        try {
            await createBatch({ course });
            fetchBatches();
        } catch (err) {
            console.error("Error creating batch:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id, field, value) => {
        try {
            if (field === "currentYear") {
                await updateBatchYear({ currentYear: value }, id);
            } else if (field === "semester") {
                await updateBatchSemester({ semester: value }, id);
            }
            fetchBatches();
        } catch (err) {
            console.error("Error updating batch:", err);
        }
    };

    const handleFileUpload = async (batchId) => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        setUploading(true);
        try {
            await uploadStudent(formData, batchId);
            alert("Students uploaded successfully.");
            fetchBatches();
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Error uploading file.");
        } finally {
            setUploading(false);
            setSelectedFile(null);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            {/* Course Selection */}
            <div className="flex gap-2 mb-4">
                <select className="border p-2 rounded w-full" value={course} onChange={(e) => setCourse(e.target.value)}>
                    <option value="">Select Course</option>
                    <option value="MCA">MCA</option>
                    <option value="M.Sc Cyber Security">M.Sc Cyber Security</option>
                    <option value="M.Sc Data Analytics">M.Sc Data Analytics</option>
                </select>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleCreateBatch} disabled={loading}>
                    {loading ? "Creating..." : "Create Batch"}
                </button>
            </div>

            {/* Batch List */}
            <div className="space-y-4">
                {batches.map((batch) => (
                    <div key={batch._id} className="shadow-lg shadow-gray-300 p-4 rounded-lg w-full">
                        {/* Batch Header */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">{batch.course} ({batch.startYear} - {batch.endYear})</h2>
                            <button onClick={() => setOpenBatch(openBatch === batch._id ? null : batch._id)}>
                                <ChevronDown className={`w-5 h-5 transition-transform ${openBatch === batch._id ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        {/* Year & Semester Update */}
                        <div className="flex gap-2 mt-2">
                            <label className="font-semibold">Year:</label>
                            <select className="border p-2 rounded" value={batch.currentYear} onChange={(e) => handleUpdate(batch._id, "currentYear", e.target.value)}>
                                <option value="I">I</option>
                                <option value="II">II</option>
                            </select>
                            <label className="font-semibold">Semester:</label>
                            <select className="border p-2 rounded" value={batch.semester} onChange={(e) => handleUpdate(batch._id, "semester", e.target.value)}>
                                <option value="I">I</option>
                                <option value="II">II</option>
                                <option value="III">III</option>
                                <option value="IV">IV</option>
                            </select>
                            <button className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600">
                                <Edit className="w-4 h-4" />
                            </button>
                        </div>

                        {/* File Upload Section */}
                        <div className="mt-3 flex gap-2">
                            <input 
                                type="file" 
                                accept=".xlsx, .csv" 
                                className="border p-2 rounded w-full"
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                            />
                            <button 
                                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 flex items-center gap-2" 
                                onClick={() => handleFileUpload(batch._id)}
                                disabled={uploading}
                            >
                                {uploading ? "Uploading..." : "Upload"} <Upload className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Student List */}
                        {openBatch === batch._id && (
                            <div className="mt-3 p-4 bg-gray-100 rounded-lg shadow-inner">
                                <h3 className="text-md font-semibold mb-2">Student Details:</h3>
                                {batch.students.length > 0 ? (
                                    <ul className="space-y-2">
                                        {batch.students.map((student) => (
                                            <li key={student._id} className="flex justify-between bg-white p-2 rounded-md shadow">
                                                <span>
                                                    <strong>Reg No:</strong> {student.regNo} <br />
                                                    <strong>Department:</strong> {student.Department} <br />
                                                    <strong>Course:</strong> {student.course}
                                                </span>
                                                <button className="text-blue-500 hover:text-blue-700">
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No students enrolled.</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
