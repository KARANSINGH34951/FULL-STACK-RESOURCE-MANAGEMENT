import React from 'react'
import { Outlet } from "react-router-dom"

const StaffDashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Staff Dashboard</h2>
      <Outlet />
    </div>
  )
}

export default StaffDashboard