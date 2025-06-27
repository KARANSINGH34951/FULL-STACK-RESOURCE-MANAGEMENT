import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const ClientHome = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventDates, setEventDates] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/client/my-events', {
          withCredentials: true,
        });

        setEvents(res.data);
        setEventDates(res.data.map(ev => new Date(ev.date).toDateString()));
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);

  const tileClassName = ({ date }) => {
    if (eventDates.includes(date.toDateString())) {
      return 'bg-blue-500 text-white font-bold rounded-full';
    }
    return null;
  };

  const selectedEvents = events.filter(
    (event) => new Date(event.date).toDateString() === date.toDateString()
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">Welcome, Client 👋</h2>
          <p className="text-gray-600">Track and manage your events on the calendar.</p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3771/3771521.png"
          alt="Client dashboard"
          className="w-32 h-32 object-contain mt-4 md:mt-0"
        />
      </div>

      {/* Calendar + Events */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">📅 Event Calendar</h3>
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={tileClassName}
            className="w-full rounded-lg"
          />
        </div>

        {/* Events Display */}
        <div className="bg-white shadow rounded-xl p-4 overflow-auto">
          <h3 className="text-lg font-semibold mb-4">
            🗂 {selectedEvents.length > 0
              ? `Events on ${date.toDateString()}`
              : 'All Your Events'}
          </h3>

          {(selectedEvents.length > 0 ? selectedEvents : events).map((event) => (
            <div
              key={event._id}
              className="border p-3 rounded-lg mb-3 bg-blue-50"
            >
              <h4 className="font-semibold text-blue-700">{event.title}</h4>
              <p className="text-sm text-gray-700">
                📅 {new Date(event.date).toDateString()}
              </p>
              <p className="text-sm text-gray-700">📍 {event.location}</p>
              <p className="text-sm text-gray-700">👥 Guests: {event.maxGuests || '—'}</p>
              <p className="text-sm text-gray-700">🎯 Type: {event.type || '—'}</p>
              <p className="text-sm text-gray-700">
                🏷️ Status: <span className="font-medium">{event.status}</span>
              </p>
            </div>
          ))}

          {(events.length === 0 || selectedEvents.length === 0) && (
            <p className="text-gray-500">No events to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientHome;
