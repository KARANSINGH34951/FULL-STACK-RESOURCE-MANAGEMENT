import React, { useEffect, useState } from "react";
import axios from "axios";

const PlannerAssignResources = () => {
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [resources, setResources] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedResources, setSelectedResources] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const eventRes = await axios.get(
      "http://localhost:5000/api/planner/approved-events",
      { withCredentials: true }
    );
    setApprovedEvents(eventRes.data);

    const resRes = await axios.get("http://localhost:5000/api/planner/all", {
      withCredentials: true,
    });
    setResources(resRes.data);

    const staffRes = await axios.get("http://localhost:5000/api/staff/getstaff", {
      withCredentials: true,
    });
    setStaffList(staffRes.data);
  };

  const handleQuantityChange = (eventId, resourceId, quantity) => {
    setSelectedResources((prev) => {
      const current = prev[eventId] || [];

      if (quantity === 0) {
        return {
          ...prev,
          [eventId]: current.filter((r) => r.resource !== resourceId),
        };
      }

      const exists = current.find((r) => r.resource === resourceId);
      let updated;

      if (exists) {
        updated = current.map((r) =>
          r.resource === resourceId ? { ...r, quantity } : r
        );
      } else {
        updated = [...current, { resource: resourceId, quantity }];
      }

      return { ...prev, [eventId]: updated };
    });
  };

  const handleAssignStaff = async (eventId, staffId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/planner/event/${eventId}/assign-staff`,
        { staffId },
        { withCredentials: true }
      );
      alert("Staff assigned!");
      fetchData();
    } catch (err) {
      console.error("Error assigning staff:", err);
      alert("Failed to assign staff");
    }
  };

  const handleAssign = async (eventId) => {
    try {
      const payload = {
        resources:
          selectedResources[eventId]?.filter((r) => r.quantity > 0) || [],
      };

      await axios.put(
        `http://localhost:5000/api/planner/${eventId}/assign`,
        payload,
        { withCredentials: true }
      );

      alert("Resources assigned! ✅");
      fetchData();
      setSelectedResources((prev) => ({ ...prev, [eventId]: [] }));
    } catch (err) {
      console.error("Error assigning resources:", err);
      alert("Assignment failed ❌");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        Assign Resources and Staff to Approved Events
      </h2>

      {approvedEvents.length === 0 ? (
        <p>No approved events yet.</p>
      ) : (
        approvedEvents.map((event) => (
          <div
            key={event._id}
            className="border rounded p-4 shadow mb-6 bg-white"
          >
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Client:</strong> {event.clientId?.email || "N/A"}</p>

            <div className="mt-4">
              <p className="font-medium mb-2">Assign Staff:</p>
              <select
                className="border rounded p-2"
                defaultValue=""
                onChange={(e) =>
                  handleAssignStaff(event._id, e.target.value)
                }
              >
                <option value="" disabled>
                  Select Staff
                </option>
                {staffList.map((staff) => (
                  <option key={staff._id} value={staff._id}>
                    {staff.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <p className="font-medium mb-2">Assign Resource Quantities:</p>
              <div className="grid grid-cols-2 gap-4">
                {resources.map((res) => {
                  const isUnavailable = res.quantity === 0;
                  const selectedQty =
                    selectedResources[event._id]?.find(
                      (r) => r.resource === res._id
                    )?.quantity || 0;

                  return (
                    <div key={res._id} className="flex items-center gap-4">
                      <span className="w-32">{res.name}</span>
                      <input
                        type="number"
                        min="0"
                        max={res.quantity}
                        value={selectedQty}
                        disabled={isUnavailable}
                        onChange={(e) =>
                          handleQuantityChange(
                            event._id,
                            res._id,
                            parseInt(e.target.value)
                          )
                        }
                        className="border p-1 w-24 rounded"
                      />
                      <span className="text-sm text-gray-500">
                        Available: {res.quantity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => handleAssign(event._id)}
            >
              Assign Selected Resources
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PlannerAssignResources;
