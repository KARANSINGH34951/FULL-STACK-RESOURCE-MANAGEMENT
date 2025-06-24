import React from 'react';
import CreateEvent from './CreateEvent';
import GetEvents from '../../components/GetEvents';

const PlannerDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Calendar and Events on the left */}
      <div className="w-full md:w-2/3">
        <GetEvents />
      </div>

      {/* Event creation form on the right */}
      <div className="w-full md:w-1/3">
        <CreateEvent />
      </div>
    </div>
  );
};

export default PlannerDashboard;
