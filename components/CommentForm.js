'use client';

import { useState } from 'react';

export default function CommentForm({ onCommentAdded }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setMessage({ type: 'error', text: 'Ju lutemi plotësoni të gjitha fushat' });
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setTitle('');
        setContent('');
        setMessage({ type: 'success', text: 'Komenti u shtua me sukses!' });
        if (onCommentAdded) {
          onCommentAdded();
        }
      } else {
        setMessage({ type: 'error', text: data.error || 'Gabim në shtimin e komentit' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Gabim në lidhjen me serverin' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="comment-form">
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Shto një Koment të Ri</h2>
      
      {message && (
        <div className={message.type}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titulli:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Shkruani titullin e komentit..."
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Përmbajtja:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Shkruani përmbajtjen e komentit..."
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Duke shtuar...' : 'Shto Komentin'}
        </button>
      </form>
    </div>
  );
}
