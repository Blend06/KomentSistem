'use client';

import { useState } from 'react';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCommentAdded = () => {
    // Trigger refresh of comment list
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>💬 Sistemi i Komenteve</h1>
        <p>Shkruani dhe menaxhoni komentet tuaja</p>
      </header>

      <CommentForm onCommentAdded={handleCommentAdded} />
      
      <CommentList key={refreshKey} />
    </div>
  );
}
