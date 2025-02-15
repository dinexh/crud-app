import { NextRequest, NextResponse } from 'next/server';
import db from '../../../config/db';

export async function GET() {
    try {
        const [rows] = await db.execute('SELECT * FROM tasks ORDER BY created_at DESC');
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { message: 'Failed to fetch tasks' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const { title, description } = await request.json();
        if (!title) {
            return NextResponse.json(
                { message: 'Title is required' },
                { status: 400 }
            );
        }
        
        const [result] = await db.execute(
            'INSERT INTO tasks (title, description) VALUES (?, ?)',
            [title, description || '']
        );
        return NextResponse.json(
            { message: 'Task added successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { message: 'Failed to create task' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { id, title, description, status } = await request.json();
        if (!id || !title) {
            return NextResponse.json(
                { message: 'ID and title are required' },
                { status: 400 }
            );
        }

        const [result] = await db.execute(
            'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
            [title, description || '', status || 'pending', id]
        );
        return NextResponse.json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { message: 'Failed to update task' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const { id } = await request.json();
        if (!id) {
            return NextResponse.json(
                { message: 'ID is required' },
                { status: 400 }
            );
        }
        const [result] = await db.execute(
            `UPDATE tasks 
             SET status = CASE 
                WHEN status = 'pending' THEN 'completed' 
                ELSE 'pending' 
             END 
             WHERE id = ?`,
            [id]
        );
        return NextResponse.json({ message: 'Task status updated successfully' });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { message: 'Failed to update task status' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();
        if (!id) {
            return NextResponse.json(
                { message: 'ID is required' },
                { status: 400 }
            );
        }

        const [result] = await db.execute(
            'DELETE FROM tasks WHERE id = ?',
            [id]
        );
        return NextResponse.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { message: 'Failed to delete task' },
            { status: 500 }
        );
    }
}
