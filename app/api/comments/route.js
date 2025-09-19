import { NextResponse } from 'next/server';
import commentsDb from '../../../lib/database.js';

// GET - Merr të gjitha komentet
export async function GET() {
  try {
    const comments = commentsDb.getAllComments();
    return NextResponse.json({ success: true, data: comments });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Gabim në marrjen e komenteve' },
      { status: 500 }
    );
  }
}

// POST - Krijo një koment të ri
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Titulli dhe përmbajtja janë të detyrueshme' },
        { status: 400 }
      );
    }

    const commentId = commentsDb.createComment(title, content);
    const newComment = commentsDb.getCommentById(commentId);

    return NextResponse.json(
      { success: true, data: newComment },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Gabim në krijimin e komentit' },
      { status: 500 }
    );
  }
}
