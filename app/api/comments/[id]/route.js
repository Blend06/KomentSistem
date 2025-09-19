import { NextResponse } from 'next/server';
import commentsDb from '../../../../lib/database.js';

// GET - Merr një koment sipas ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const comment = commentsDb.getCommentById(id);

    if (!comment) {
      return NextResponse.json(
        { success: false, error: 'Komenti nuk u gjet' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: comment });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Gabim në marrjen e komentit' },
      { status: 500 }
    );
  }
}

// PUT - Përditëso një koment
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Titulli dhe përmbajtja janë të detyrueshme' },
        { status: 400 }
      );
    }

    const result = commentsDb.updateComment(id, title, content);
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Komenti nuk u gjet' },
        { status: 404 }
      );
    }

    const updatedComment = commentsDb.getCommentById(id);
    return NextResponse.json({ success: true, data: updatedComment });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Gabim në përditësimin e komentit' },
      { status: 500 }
    );
  }
}

// DELETE - Fshi një koment
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const result = commentsDb.deleteComment(id);

    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Komenti nuk u gjet' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Komenti u fshi me sukses' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Gabim në fshirjen e komentit' },
      { status: 500 }
    );
  }
}
