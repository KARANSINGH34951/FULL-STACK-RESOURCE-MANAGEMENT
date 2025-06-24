import React, { useState } from 'react';
import axios from 'axios';

const AddResource = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'EQUIPMENT',
    quantity: 0,
    availability: true,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/planner/resource', formData, {
        withCredentials: true, // in case your backend needs cookies
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // alert('✅ Resource added successfully!');
      console.log(res.data);
      // Optionally clear form
      setFormData({
        name: '',
        type: 'EQUIPMENT',
        quantity: 0,
        availability: true,
        description: ''
      });
    } catch (error) {
      console.error("Error adding resource:", error.response?.data || error.message);
      alert('❌ Failed to add resource');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-xl font-semibold mb-4">Add New Resource</h2>

      <label className="block mb-2 font-medium">Name *</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-4"
      />

      <label className="block mb-2 font-medium">Type *</label>
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full p-2 border mb-4"
      >
        <option value="EQUIPMENT">Equipment</option>
        <option value="STAFF">Staff</option>
        <option value="SERVICE">Service</option>
        <option value="OTHER">Other</option>
      </select>

      <label className="block mb-2 font-medium">Quantity *</label>
      <input
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        required
        className="w-full p-2 border mb-4"
      />

      <label className="block mb-2 font-medium">Availability</label>
      <input
        type="checkbox"
        name="availability"
        checked={formData.availability}
        onChange={handleChange}
        className="mr-2"
      />
      <span>{formData.availability ? "Available" : "Not Available"}</span>

      <label className="block mt-4 mb-2 font-medium">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows="3"
        className="w-full p-2 border mb-4"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Add Resource
      </button>
    </form>
  );
};

export default AddResource;
