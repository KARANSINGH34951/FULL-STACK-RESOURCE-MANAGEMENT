import React, { useState } from "react";
import axios from "axios";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateTime: '',
    location: '',
    status: 'PLANNED',
    isPublic: false,
    maxGuests: '',
    type: 'MEETING',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:5000/api/planner/create-event",
      formData,
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   withCredentials: true
      // }
    );

    alert("Event created successfully!");
    setFormData({
      title: '',
      description: '',
      dateTime: '',
      location: '',
      status: 'PLANNED',
      isPublic: false,
      maxGuests: '',
      type: 'MEETING',
    });
    console.log(response.data);

  } catch (error) {
    console.error("Error creating event:", error.response?.data || error.message);
    alert("Failed to create event");
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-lg mx-auto shadow rounded bg-white"
    >
      <h2 className="text-xl font-semibold mb-4">Create Event</h2>

      <label className="block mb-2">Title *</label>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-4"
      />

      <label className="block mb-2">Description *</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-4"
      />

      <label className="block mb-2">Date & Time *</label>
      <input
        type="datetime-local"
        name="dateTime"
        value={formData.dateTime}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-4"
      />

      <label className="block mb-2">Location *</label>
      <input
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-4"
      />

      <label className="block mb-2">Status *</label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-4"
      >
        <option value="PLANNED">Planned</option>
        <option value="ONGOING">In Progress</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELLED">Cancelled</option>
      </select>

      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          name="isPublic"
          checked={formData.isPublic}
          onChange={handleChange}
          className="mr-2"
        />
        Is Public?
      </label>

      <label className="block mb-2">Max Guests</label>
      <input
        type="number"
        name="maxGuests"
        value={formData.maxGuests}
        onChange={handleChange}
        className="w-full p-2 border mb-4"
      />

      <label className="block mb-2">Tags / Type *</label>
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-4"
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
        Create Event
      </button>
    </form>
  );
};


export default CreateEvent;
