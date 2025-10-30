import React from 'react';

export default function About(){
  return (
    <div>
      <h2>About Farooq</h2>
      <p>Hi — I’m Farooq. I work on networking, monitoring and full-stack tasks. This project demonstrates:</p>
      <ul>
        <li>React frontend + Node.js backend</li>
        <li>SQLite for simple persistence</li>
        <li>Docker & Docker Compose for easy deployment</li>
      </ul>
      <p>How I built this: started with a static page, added APIs in Node, used SQLite for persistence, then containerized each component and used nginx to serve the React build. This is a simple guestbook you can extend to add moderation, replies, or email notifications.</p>
    </div>
  );
}
