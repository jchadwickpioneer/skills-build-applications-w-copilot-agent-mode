import React from 'react'
import { useCollection } from '../api.js'

function Teams() {
  const { data, loading, error } = useCollection('teams')
  return (
    <section><div className="page-heading"><div><div className="eyebrow">Find your people</div><h1>Teams</h1><p>Progress is better together.</p></div></div>
      {loading && <p className="loading">Loading teams...</p>}{error && <p className="error">{error}</p>}
      <div className="data-grid">{data.map((team) => <article className="data-card" key={team._id || team.id}><div className="eyebrow">Team</div><h2>{team.name}</h2><p>{team.description || 'Ready for a new challenge.'}</p><p>{team.memberIds?.length || 0} members</p></article>)}</div>
      {!loading && !error && data.length === 0 && <p className="empty">No teams created yet.</p>}
    </section>
  )
}

export default Teams
