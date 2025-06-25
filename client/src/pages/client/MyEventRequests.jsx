import React, { useState } from "react";
import axios from "axios";

const MyEventRequests = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    requirements: "",
    maxGuests: "",
    type: "MEETING",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/client/create-event",
        formData,
        {
          withCredentials: true,
        }
      );

      alert("Event request submitted successfully!");
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        requirements: "",
        maxGuests: "",
        type: "MEETING",
      });
    } catch (err) {
      console.error("Error submitting event:", err);
      alert("Failed to submit event request.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Request an Event</h2>

      <label className="block mb-1 font-medium">Title *</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full border p-2 mb-4 rounded"
      />

      <label className="block mb-1 font-medium">Description *</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        className="w-full border p-2 mb-4 rounded"
      />

      <label className="block mb-1 font-medium">Date *</label>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="w-full border p-2 mb-4 rounded"
      />

      <label className="block mb-1 font-medium">Location *</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
        className="w-full border p-2 mb-4 rounded"
      />

      <label className="block mb-1 font-medium">Requirements</label>
      <textarea
        name="requirements"
        value={formData.requirements}
        onChange={handleChange}
        className="w-full border p-2 mb-4 rounded"
        placeholder="Optional"
      />

      <label className="block mb-1 font-medium">Max Guests</label>
      <input
        type="number"
        name="maxGuests"
        value={formData.maxGuests}
        onChange={handleChange}
        className="w-full border p-2 mb-4 rounded"
        placeholder="Optional"
      />

      <label className="block mb-1 font-medium">Event Type *</label>
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
        className="w-full border p-2 mb-4 rounded"
      >
        <option value="MEETING">Meeting</option>
        <option value="CONFERENCE">Conference</option>
        <option value="WORKSHOP">Workshop</option>
        <option value="WEBINAR">Webinar</option>
        <option value="OTHER">Other</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Submit Request
      </button>
    </form>
  );
};

export default MyEventRequests;
