const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'comments.db');
const db = new Database(dbPath);

// Krijo tabelën e komenteve nëse nuk ekziston
const createCommentsTable = () => {
  const createTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  createTable.run();
};

// Inicializo databazën
createCommentsTable();

// Funksione për CRUD operations
const commentsDb = {
  // Merr të gjitha komentet
  getAllComments: () => {
    const stmt = db.prepare('SELECT * FROM comments ORDER BY created_at DESC');
    return stmt.all();
  },

  // Merr një koment sipas ID
  getCommentById: (id) => {
    const stmt = db.prepare('SELECT * FROM comments WHERE id = ?');
    return stmt.get(id);
  },

  // Krijo një koment të ri
  createComment: (title, content) => {
    const stmt = db.prepare('INSERT INTO comments (title, content) VALUES (?, ?)');
    const result = stmt.run(title, content);
    return result.lastInsertRowid;
  },

  // Përditëso një koment
  updateComment: (id, title, content) => {
    const stmt = db.prepare('UPDATE comments SET title = ?, content = ? WHERE id = ?');
    return stmt.run(title, content, id);
  },

  // Fshi një koment
  deleteComment: (id) => {
    const stmt = db.prepare('DELETE FROM comments WHERE id = ?');
    return stmt.run(id);
  }
};

module.exports = commentsDb;
