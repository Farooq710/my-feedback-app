import React, { useState } from 'react';
import api from '../api';

export default function NewFeedback({ user, onPosted }) {
  const [message, setMessage] = useState('');
  const post = async () => {
    if (!user) return alert('Please login first');
    await api.post('/feedback', { message }, { headers: { 'x-auth-token': user.token }});
    setMessage('');
    onPosted();
    alert('Posted');
  };
  return (
    <div>
      <h3>Write Feedback</h3>
      <textarea rows="6" value={message} onChange={e=>setMessage(e.target.value)} style={{width:'80%'}} />
      <br />
      <button onClick={post} style={{ marginTop:8 }}>Post</button>
    </div>
  );
}
