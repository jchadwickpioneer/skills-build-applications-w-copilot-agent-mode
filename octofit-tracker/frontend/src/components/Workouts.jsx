import React from 'react'
import { useCollection } from '../api.js'

function Workouts() {
  const { data, loading, error } = useCollection('workouts')
  return (
    <section><div className="page-heading"><div><div className="eyebrow">Suggested sessions</div><h1>Workouts</h1><p>Choose the next useful effort.</p></div></div>
      {loading && <p className="loading">Loading workouts...</p>}{error && <p className="error">{error}</p>}
      <div className="data-grid">{data.map((workout) => <article className="data-card" key={workout._id || workout.id}><div className="eyebrow">{workout.difficulty} · {workout.type}</div><h2>{workout.title}</h2><p>{workout.description}</p><p>{workout.durationMinutes} minutes</p></article>)}</div>
      {!loading && !error && data.length === 0 && <p className="empty">No workouts available yet.</p>}
    </section>
  )
}

export default Workouts
