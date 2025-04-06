import { useState, useEffect } from 'react';
import { getOneStudent } from '../api/student.api.js';
import personalAPI from '../api/personal.api.js';

export default function Dashboard() {
    const [student, setStudent] = useState(null);
    const [personal, setPersonal] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '', dob: '', fatherName: '', motherName: '',
        parentNumber: '', address: '', phoneNumber: ''
    });

    useEffect(() => {
        async function fetchStudent() {
            try {
                const res = await getOneStudent();
                setStudent(res.data);
                fetchPersonal(res.data.user._id);
            } catch (err) {
                console.error('Error fetching student:', err);
            }
        }
        fetchStudent();
    }, []);

    async function fetchPersonal(userId) {
        try {
            const res = await personalAPI.getPersonalByUser(userId);
            setPersonal(res.profile);
        } catch (err) {
            console.error('Error fetching personal details:', err);
        }
    }

    async function handleSave() {
        try {
            if (personal) {
                await personalAPI.updatePersonal({ user: student.user._id, ...formData });
            } else {
                await personalAPI.createNewPersonal({ user: student.user._id, ...formData });
            }
            fetchPersonal(student.user._id);
            setEditing(false);
        } catch (err) {
            console.error('Error saving personal details:', err);
        }
    }

    if (!student) return <p>Loading...</p>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-2 gap-6">
                <Container title="Academic Details">
                    <Detail label="Register Number" value={student.regNo} />
                    <Detail label="Course" value={student.course} />
                    <Detail label="Department" value={student.Department} />
                    <Detail label="Current Year" value={student.batch.currentYear} />
                    <Detail label="Semester" value={student.batch.semester} />
                    <Detail label="Email" value={student.user.email} />
                </Container>
                <Container title="Personal Details">
    {editing ? (
        <div className="grid gap-3">
            {Object.keys(formData)
                .filter((key) => !["createdAt", "updatedAt", "user", "__v", "_id"].includes(key)) // Exclude non-editable fields
                .map((key) => (
                    <InputField
                        key={key}
                        label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        value={formData[key]}
                        onChange={(e) =>
                            setFormData({ ...formData, [key]: e.target.value })
                        }
                    />
                ))}
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
                Save
            </button>
        </div>
    ) : personal ? (
        <div className="grid gap-2">
            {/* Display user ID instead of the whole object */}
            <Detail label="Name" value={personal.name} />
            <Detail label="Date of Birth" value={String(personal.dob)} />
            <Detail label="Father's Name" value={personal.fatherName} />
            <Detail label="Mother's Name" value={personal.motherName} />
            <Detail label="Parent's Number" value={personal.parentNumber} />
            <Detail label="Address" value={personal.address} />
            <Detail label="Phone Number" value={personal.phoneNumber} />
            <button className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => {
                    setFormData({
                        ...personal,
                        dob: String(personal.dob),
                    });
                    setEditing(true);
                }}>
                Edit
            </button>
        </div>
    ) : (
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setEditing(true)}>
            Add Personal Details
        </button>
    )}
</Container>


            </div>
        </div>
    );
}

function Container({ title, children }) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            {children}
        </div>
    );
}

function Detail({ label, value }) {
    return (
        <p className="flex justify-between border-b px-2 py-2"><span className="font-medium">{label}:</span> {value}</p>
    );
}

function InputField({ label, value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input type="text" value={value} onChange={onChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
        </div>
    );
}
