import React from 'react'
import { useCollection } from '../api.js'

function Leaderboard() {
  const { data, loading, error } = useCollection('leaderboard')
  return (
    <section><div className="page-heading"><div><div className="eyebrow">Friendly competition</div><h1>Leaderboard</h1><p>Small wins add up.</p></div></div>
      {loading && <p className="loading">Loading leaderboard...</p>}{error && <p className="error">{error}</p>}
      <div className="data-grid">{data.map((entry, index) => <article className="data-card" key={entry.userId || entry._id || index}><div className="eyebrow">Rank {index + 1}</div><h2>{entry.displayName || entry.username || 'Athlete'}</h2><div className="metric">{entry.points || 0} <small>pts</small></div><p>{entry.activities || 0} activities</p></article>)}</div>
      {!loading && !error && data.length === 0 && <p className="empty">No leaderboard data yet.</p>}
    </section>
  )
}

export default Leaderboard
