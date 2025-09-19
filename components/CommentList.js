'use client';

import { useState, useEffect } from 'react';

export default function CommentList() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const fetchComments = async () => {
    try {
      const response = await fetch('/api/comments');
      const data = await response.json();
      
      if (data.success) {
        setComments(data.data);
      } else {
        setError('Gabim në marrjen e komenteve');
      }
    } catch (error) {
      setError('Gabim në lidhjen me serverin');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('A jeni të sigurt që doni të fshini këtë koment?')) {
      return;
    }

    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setComments(comments.filter(comment => comment.id !== id));
      } else {
        alert('Gabim në fshirjen e komentit');
      }
    } catch (error) {
      alert('Gabim në lidhjen me serverin');
    }
  };

  const handleEdit = (comment) => {
    setEditingId(comment.id);
    setEditTitle(comment.title);
    setEditContent(comment.content);
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert('Ju lutemi plotësoni të gjitha fushat');
      return;
    }

    try {
      const response = await fetch(`/api/comments/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editTitle.trim(), content: editContent.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setComments(comments.map(comment => 
          comment.id === editingId ? data.data : comment
        ));
        setEditingId(null);
        setEditTitle('');
        setEditContent('');
      } else {
        alert('Gabim në përditësimin e komentit');
      }
    } catch (error) {
      alert('Gabim në lidhjen me serverin');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditContent('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sq-AL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Duke ngarkuar komentet...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="comments-list">
      <div style={{ padding: '20px', borderBottom: '1px solid #f0f0f0' }}>
        <h2 style={{ color: '#333', margin: 0 }}>Komentet ({comments.length})</h2>
      </div>
      
      {comments.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          Nuk ka komente ende. Bëni të parin!
        </div>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            {editingId === comment.id ? (
              <div>
                <div className="form-group">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={{ marginBottom: '10px' }}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    style={{ marginBottom: '15px' }}
                  />
                </div>
                <div className="comment-actions">
                  <button className="edit-btn" onClick={handleSaveEdit}>
                    Ruaj
                  </button>
                  <button className="delete-btn" onClick={handleCancelEdit}>
                    Anulo
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="comment-header">
                  <div>
                    <div className="comment-title">{comment.title}</div>
                    <div className="comment-date">
                      {formatDate(comment.created_at)}
                    </div>
                  </div>
                </div>
                <div className="comment-content">{comment.content}</div>
                <div className="comment-actions">
                  <button className="edit-btn" onClick={() => handleEdit(comment)}>
                    Përditëso
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(comment.id)}>
                    Fshi
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
