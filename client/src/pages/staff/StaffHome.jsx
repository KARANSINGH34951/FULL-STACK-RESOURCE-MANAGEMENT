import React, { useEffect, useState } from 'react';
import axios from 'axios';

const staffHome = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/staff/my-events', {
          withCredentials: true,
        });
        setEvents(res.data);
      } catch (err) {
        console.error('Failed to fetch allocated events', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Assigned Events</h2>
      {events.length === 0 ? (
        <p>No events assigned yet.</p>
      ) : (
        events.map((event) => (
          <div key={event._id} className="bg-white p-4 rounded shadow mb-4">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Status:</strong> {event.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default staffHome


