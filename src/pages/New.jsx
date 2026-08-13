import React from 'react'
import StatCard from '../components/dashboard/StatCard'

const New = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Test"
        value="100"
        description="This is a test card"
        icon="📊"
        iconBg="bg-blue-100"
        iconColor="text-blue-600"
      />
    </div>
  )
}

export default New