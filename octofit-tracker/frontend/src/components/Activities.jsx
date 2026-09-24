import React from 'react'
import { useCollection } from '../api.js'

function Activities() {
  const { data, loading, error } = useCollection('activities')
  return (
    <section>
      <div className="page-heading"><div><div className="eyebrow">Movement log</div><h1>Activities</h1><p>Keep your momentum visible.</p></div><div className="metric">{data.reduce((sum, item) => sum + (item.points || 0), 0)} <small>pts</small></div></div>
      {loading && <p className="loading">Loading activities...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && data.length === 0 && <p className="empty">No activities recorded yet.</p>}
      <div className="data-grid">{data.map((activity, index) => <article className="data-card" key={activity._id || activity.id || index}><div className="eyebrow">{activity.type || 'Activity'}</div><h2>{activity.userId?.displayName || activity.userId?.username || 'Athlete'}</h2><p>{activity.durationMinutes || 0} minutes {activity.distanceKm ? `· ${activity.distanceKm} km` : ''}</p><p>{activity.points || 0} points</p></article>)}</div>
    </section>
  )
}

export default Activities
