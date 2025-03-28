import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addNewEvent, getAllEvent, deleteEvent } from "./api/events.api";
import toast from "react-hot-toast";
import { Trash2, CalendarPlus } from "lucide-react";

export default function EventAdmin() {
    const { register, handleSubmit, reset } = useForm();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await getAllEvent();
            setEvents(res.data);
        } catch (err) {
            toast.error("Error fetching events");
        }
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("desc", data.desc);
            formData.append("time", data.time);
            formData.append("location", data.location);
            if (data.file[0]) {
                formData.append("file", data.file[0]);
            }

            await addNewEvent(formData);
            toast.success("Event added successfully!");
            fetchEvents();
            reset();
        } catch (err) {
            toast.error("Error adding event");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteEvent(id);
            toast.success("Event deleted successfully!");
            fetchEvents();
        } catch (err) {
            toast.error("Error deleting event");
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                <CalendarPlus className="w-7 h-7 text-blue-600" /> Manage Events
            </h2>

            {/* Add Event Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow-xl rounded-lg space-y-4 border border-gray-200">
                <input
                    {...register("title", { required: true })}
                    type="text"
                    placeholder="Event Title"
                    className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 shadow-sm"
                />
                <textarea
                    {...register("desc", { required: true })}
                    placeholder="Event Description"
                    className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 shadow-sm"
                />
                <input
                    {...register("location", { required: true })}
                    type="text"
                    placeholder="location"
                    className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 shadow-sm"
                />
                <input
                    {...register("time", { required: true })}
                    type="text"
                    placeholder="Event time"
                    className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300 shadow-sm"
                />
                <input
                    {...register("file")}
                    type="file"
                    className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300 shadow-sm"
                />
                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-lg"
                >
                    <CalendarPlus className="w-5 h-5" /> Add Event
                </button>
            </form>

            {/* Events List */}
            <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">🎟️ Upcoming Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events.map(event => (
                        <div 
                            key={event._id} 
                            className="bg-white shadow-xl rounded-lg p-4 border border-gray-200 hover:shadow-2xl transition transform hover:scale-105"
                        >
                            <img
                                src={event.image ? `http://localhost:3000/file/download/${event.image._id}` : "/fallback.jpg"}
                                alt={event.title}
                                className="w-full h-48 object-cover rounded-lg mb-3"
                            />
                            <h4 className="text-lg font-semibold">{event.title}</h4>
                            <p className="text-gray-600">{event.desc}</p>
                            <p className="text-sm text-gray-500">📅 {event.time}</p>
                            <button
                                onClick={() => handleDelete(event._id)}
                                className="mt-3 w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition transform hover:scale-105 shadow-lg"
                            >
                                <Trash2 className="w-5 h-5" /> Delete Event
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
