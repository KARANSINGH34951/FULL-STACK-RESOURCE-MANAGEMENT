import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const ClientDashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Client Dashboard</h2>

      <div className="mb-4">
        <Link
          to="request"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Request New Event
        </Link>
      </div>

      <Outlet />
    </div>
  )
}

export default ClientDashboard;
