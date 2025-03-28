import { useEffect, useState } from "react";
import { 
    getDocumentByNewApi, 
    getAllDocumentsApi, 
    setAsOldDocumentApi, 
    deleteDocumentApi 
} from "../api/adduploads.api";
import { Trash2, Download, CheckCircle } from "lucide-react";

export default function SeeUploads() {
    const [newDocuments, setNewDocuments] = useState([]);
    const [allDocuments, setAllDocuments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        setLoading(true);
        try {
            // const newDocs = await getDocumentByNewApi();
            const allDocs = await getAllDocumentsApi();
            // setNewDocuments(newDocs.data);
            setAllDocuments(allDocs.data);
            const newDocs = await getDocumentByNewApi();
            etNewDocuments(newDocs.data);
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
        setLoading(false);
    };

    const markAsOld = async (id) => {
        try {
            await setAsOldDocumentApi(id);
            fetchDocuments();
        } catch (error) {
            console.error("Failed to mark as old:", error);
        }
    };

    const deleteDocument = async (id) => {
        if (window.confirm("Are you sure you want to delete this document?")) {
            try {
                await deleteDocumentApi(id);
                fetchDocuments();
            } catch (error) {
                console.error("Failed to delete document:", error);
            }
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-8 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">📁 Document Management</h2>

            {/* New Documents Section */}
            <div className="bg-white shadow-sm rounded-xl p-6 mb-8">
                <h3 className="text-xl font-medium text-gray-700 mb-4">🆕 New Documents</h3>
                {loading ? <p>Loading...</p> : (
                    newDocuments.length > 0 ? (
                        newDocuments.map((doc) => (
                            <div key={doc._id} className="flex justify-between items-center p-4 mb-3 rounded-lg bg-gray-50 border border-gray-200">
                                <div>
                                    <p className="font-medium text-gray-800">{doc.purpose}</p>
                                    <p className="text-sm text-gray-500">Uploaded by: {doc.user.username} ({doc.user.email})</p>
                                    <p className="text-sm text-gray-400">🕒 Uploaded: {new Date(doc.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {console.log(doc.file._id)}
                                    <a 
                                        href={`http://localhost:3000/file/download/${doc.file._id}`} 
                                        download 
                                        className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition"
                                    >
                                        <Download size={16} /> Download
                                    </a>
                                    <button 
                                        onClick={() => markAsOld(doc._id)} 
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-400 transition"
                                    >
                                        <CheckCircle size={16} /> Mark as Old
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : <p className="text-gray-500">No new documents found.</p>
                )}
            </div>

            {/* All Documents Section */}
            <div className="bg-white shadow-sm rounded-xl p-6">
                <h3 className="text-xl font-medium text-gray-700 mb-4">📂 All Documents</h3>
                {loading ? <p>Loading...</p> : (
                    allDocuments.length > 0 ? (
                        allDocuments.map((doc) => (
                            <div key={doc._id} className="flex justify-between items-center p-4 mb-3 rounded-lg bg-gray-50 border border-gray-200">
                                <div>
                                    <p className="font-medium text-gray-800">{doc.purpose}</p>
                                    <p className="text-sm text-gray-500">Uploaded by: {doc.user.username} ({doc.user.email})</p>
                                    <p className="text-sm text-gray-400">🕒 Uploaded: {new Date(doc.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <a 
                                        href={`http://localhost:3000/file/download/${doc.file._id}`} 
                                        download 
                                        className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition"
                                    >
                                        <Download size={16} /> Download
                                    </a>
                                    <button 
                                        onClick={() => deleteDocument(doc._id)} 
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-400 transition"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : <p className="text-gray-500">No documents available.</p>
                )}
            </div>
        </div>
    );
}
