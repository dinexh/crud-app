import { NextResponse } from 'next/server';
import db from '@/config/db';
import { hashPassword, generateToken } from '@/utils/auth';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json();

    const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const [result] = await db.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword]
    );

    const token = generateToken(result.insertId);

    return NextResponse.json({
      token,
      user: {
        id: result.insertId,
        email,
        firstName,
        lastName,
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 