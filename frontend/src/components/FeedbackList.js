import React from 'react';

export default function FeedbackList({ items, refresh }) {
  return (
    <div>
      <h3>Recent feedback</h3>
      {items.length === 0 && <p>No messages yet — be the first!</p>}
      <ul>
        {items.map(f => (
          <li key={f.id} style={{ marginBottom: 12 }}>
            <strong>{f.username}</strong> <em style={{ color:'#666' }}>{new Date(f.created_at).toLocaleString()}</em>
            <div>{f.message}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
