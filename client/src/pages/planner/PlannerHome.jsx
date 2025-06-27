import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCalendar from '../../components/EventCalendar';

const PlannerHome = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    availableResources: 0,
    allocatedResources: 0,
    staffAssigned: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/planner/stats", {
          withCredentials: true
        });
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching planner stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Welcome, Planner 👋</h2>

      <section>
        <h3 className="text-xl font-semibold mb-3 text-gray-700">📊 Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <StatCard title="Total Events" count={stats.totalEvents} color="bg-blue-100" />
          <StatCard title="Upcoming Events" count={stats.upcomingEvents} color="bg-green-100" />
          <StatCard title="Resources Available" count={stats.availableResources} color="bg-yellow-100" />
          <StatCard title="Resources Allocated" count={stats.allocatedResources} color="bg-red-100" />
          <StatCard title="Staff Assigned" count={stats.staffAssigned} color="bg-purple-100" />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3 text-gray-700">🗓 Event Calendar</h3>
        <EventCalendar />
      </section>
    </div>
  );
};

const StatCard = ({ title, count, color }) => (
  <div className={`${color} rounded-xl shadow hover:shadow-md transition p-4`}>
    <h4 className="text-md font-semibold text-gray-800">{title}</h4>
    <p className="text-3xl font-bold text-gray-900 mt-2">{count}</p>
  </div>
);

export default PlannerHome;
