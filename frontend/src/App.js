import React, { useState, useEffect } from 'react';
import FeedbackList from './components/FeedbackList';
import NewFeedback from './components/NewFeedback';
import Login from './components/Login';
import About from './components/About';
import api from './api';

export default function App() {
  const [page, setPage] = useState('home');
  const [feedbacks, setFeedbacks] = useState([]);
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return token ? { token, username } : null;
  });

  const load = async () => {
    const res = await api.get('/feedback');
    setFeedbacks(res.data);
  };

  useEffect(() => { load(); }, []);

  const onLogin = (userObj) => {
    localStorage.setItem('token', userObj.token);
    localStorage.setItem('username', userObj.username);
    setUser(userObj);
  };

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma', padding: 20 }}>
      <nav style={{ display:'flex', gap:20, marginBottom:20 }}>
        <button onClick={()=>setPage('home')}>Home</button>
        <button onClick={()=>setPage('about')}>About</button>
        <button onClick={()=>setPage('write')}>Write Feedback</button>
        {user ? <span>Hi, {user.username} <button onClick={onLogout}>Logout</button></span> : <button onClick={()=>setPage('login')}>Login / Register</button>}
      </nav>

      {page === 'home' && <>
        <h1>Community Guestbook</h1>
        <p>Public feedback left by visitors — built by Farooq.</p>
        <FeedbackList items={feedbacks} refresh={load}/>
      </>}

      {page === 'about' && <About />}

      {page === 'write' && <NewFeedback user={user} onPosted={load}/>}

      {page === 'login' && <Login onLogin={onLogin}/>}

      <footer style={{ marginTop:40, borderTop:'1px solid #eee', paddingTop:10 }}>
        Made with <span style={{color:'#e25555'}}>❤️</span> by Farooq — <a href="https://www.linkedin.com/in/farooq710" target="_blank" rel="noreferrer">LinkedIn</a>
      </footer>
    </div>
  );
}
