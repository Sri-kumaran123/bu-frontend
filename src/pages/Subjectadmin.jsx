import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getallSubject, addNewSubject, editSubject, deleteSubject } from "../api/subject.api";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

export default function SubjectAdmin() {
    const [subjects, setSubjects] = useState([]);
    const [editingSubject, setEditingSubject] = useState(null);
    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const res = await getallSubject();
            setSubjects(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (editingSubject) {
                await editSubject(data, editingSubject._id);
            } else {
                await addNewSubject(data);
            }
            reset();
            setEditingSubject(null);
            fetchSubjects();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (subject) => {
        setEditingSubject(subject);
        setValue("name", subject.name);
        setValue("code", subject.code);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this subject?")) {
            try {
                await deleteSubject(id);
                fetchSubjects();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                {editingSubject ? "Edit Subject" : "Manage Subjects"}
            </h2>

            {/* Add/Edit Subject Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mb-6 p-6 bg-gray-50 rounded-lg shadow-md">
                <div className="grid grid-cols-3 gap-4">
                    <input 
                        {...register("name")} 
                        placeholder="Subject Name" 
                        className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" 
                        required 
                    />
                    <input 
                        {...register("code")} 
                        placeholder="Subject Code" 
                        className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" 
                        required 
                    />
                    <button 
                        type="submit" 
                        className={`flex items-center justify-center gap-2 text-white px-4 py-3 rounded-lg transition-all duration-200 ${
                            editingSubject ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        <PlusCircle size={20} />
                        {editingSubject ? "Update Subject" : "Add Subject"}
                    </button>
                </div>
            </form>

            {/* Subject Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-gray-700 font-semibold border-b">Name</th>
                            <th className="p-4 text-gray-700 font-semibold border-b">Code</th>
                            <th className="p-4 text-gray-700 font-semibold border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject) => (
                            <tr key={subject._id} className="border-b hover:bg-gray-50 transition duration-150">
                                <td className="p-4 text-gray-800">{subject.name}</td>
                                <td className="p-4 text-gray-800">{subject.code}</td>
                                <td className="p-4 flex items-center justify-center gap-4">
                                    <button 
                                        onClick={() => handleEdit(subject)} 
                                        className="text-yellow-500 hover:text-yellow-600 transition duration-200 tooltip"
                                    >
                                        <Pencil size={20} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(subject._id)} 
                                        className="text-red-500 hover:text-red-600 transition duration-200 tooltip"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
