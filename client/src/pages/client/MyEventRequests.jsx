import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyEventRequests = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/client/my-events', {
          withCredentials: true
        });
        setEvents(res.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading your event requests...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Event Requests</h2>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event._id} className="border rounded-lg p-4 shadow bg-white">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Status:</strong> <span className="font-medium">{event.status}</span></p>
              <p><strong>Requirements:</strong> {event.requirements || "—"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEventRequests;
