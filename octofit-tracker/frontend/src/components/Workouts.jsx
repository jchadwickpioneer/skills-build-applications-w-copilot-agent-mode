import React from 'react'
import { useCollection } from '../api.js'

function Workouts() {
  // API endpoint: -8000.app.github.dev/api/workouts
  const { data, loading, error } = useCollection('workouts')
  return (
    <section><div className="page-heading"><div><div className="eyebrow">Suggested sessions</div><h1>Workouts</h1><p>Choose the next useful effort.</p></div></div>
      {loading && <p className="loading">Loading workouts...</p>}{error && <p className="error">{error}</p>}
      <div className="data-grid">{data.map((workout, index) => <article className="data-card" key={workout._id || workout.id || index}><div className="eyebrow">{workout.difficulty || 'all levels'} · {workout.type || 'workout'}</div><h2>{workout.title || 'Untitled workout'}</h2><p>{workout.description || 'No description available.'}</p><p>{workout.durationMinutes || 0} minutes</p></article>)}</div>
      {!loading && !error && data.length === 0 && <p className="empty">No workouts available yet.</p>}
    </section>
  )
}

export default Workouts
