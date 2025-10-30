import React, { useState } from 'react';
import api from '../api';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    const res = await api.post('/register', { username, password });
    onLogin({ token: res.data.token, username: res.data.username });
  };

  const login = async () => {
    const res = await api.post('/login', { username, password });
    onLogin({ token: res.data.token, username: res.data.username });
  };

  return (
    <div>
      <h3>Login / Register</h3>
      <input placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
      <br />
      <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <br />
      <button onClick={login}>Login</button>
      <button onClick={register} style={{ marginLeft:8 }}>Register</button>
    </div>
  );
}
