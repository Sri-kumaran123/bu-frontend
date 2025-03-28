import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { getAllEvent, addUserInEvent, checkEventandUSer } from '../api/events.api';
import toast from 'react-hot-toast';

const Events = ({ UserId }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvent] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState({}); // Tracks registered events

  useEffect(() => {
    getAllEvent()
      .then(res => {
        setEvent(res.data);
        checkUserRegistrations(res.data);
      })
      .catch(() => toast.error('Failed to load events'));
  }, []);

  const checkUserRegistrations = async (eventsList) => {
    const status = {};
    for (const event of eventsList) {
      try {
        const isRegistered = await checkEventandUSer(event._id);
        status[event._id] = isRegistered;
      } catch (error) {
        console.error(`Error checking registration for event ${event._id}:`, error);
      }
    }
    setRegisteredEvents(status);
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    console.log('Registration Data:', data);

    const loadingToast = toast.loading('Registering...');
    
    try {
      await addUserInEvent({ userId: UserId }, selectedEvent._id);
      toast.success(`Registered successfully for ${selectedEvent.title}!`);
      setRegisteredEvents(prev => ({ ...prev, [selectedEvent._id]: true })); // Update UI
      reset();
      setSelectedEvent(null);
    } catch (error) {
      toast.error('Failed to register. Please try again.');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="p-8">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={`http://localhost:3000/file/download/${event.image?._id}`}
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      <Users size={16} className="inline mr-1" />
                      {event.attendees}+ attending
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={18} className="mr-2" />
                      <span>{event.desc}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock size={18} className="mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={18} className="mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{event.description}</p>

                  <div className="flex gap-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <button 
                        type='submit'
                        className={`px-6 py-2 rounded-md transition-colors ${
                          registeredEvents[event._id] 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                        onClick={() => setSelectedEvent(event)}
                        disabled={registeredEvents[event._id]} // Disable button if registered
                      >
                        {registeredEvents[event._id] ? 'Registered' : 'Register'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Events;
