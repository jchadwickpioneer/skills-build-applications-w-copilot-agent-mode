import React from 'react'
import { useCollection } from '../api.js'

function Users() {
  const { data, loading, error } = useCollection('users')
  return (
    <section><div className="page-heading"><div><div className="eyebrow">Your community</div><h1>Users</h1><p>Meet the athletes behind the numbers.</p></div><div className="metric">{data.length} <small>members</small></div></div>
      {loading && <p className="loading">Loading users...</p>}{error && <p className="error">{error}</p>}
      <div className="data-grid">{data.map((user, index) => <article className="data-card" key={user._id || user.id || index}><div className="eyebrow">@{user.username || 'athlete'}</div><h2>{user.displayName || user.username || 'Athlete'}</h2><p>{user.email || 'No email provided'}</p><p>{user.teamId?.name || 'Independent athlete'}</p></article>)}</div>
      {!loading && !error && data.length === 0 && <p className="empty">No users registered yet.</p>}
    </section>
  )
}

export default Users
