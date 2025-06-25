import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlannerPendingEvents = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await axios.get('http://localhost:5000/api/planner/pending-events', { withCredentials: true });
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/planner/${id}/status`, { status }, { withCredentials: true });
      fetchEvents();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Event Requests</h2>

      {events.length === 0 ? (
        <p>No pending events.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event._id} className="border p-4 rounded shadow bg-white">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Client:</strong> {event.clientId?.email || 'N/A'}</p>
              <p><strong>Requirements:</strong> {event.requirements}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleStatusChange(event._id, 'Approved')}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(event._id, 'Rejected')}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlannerPendingEvents;
