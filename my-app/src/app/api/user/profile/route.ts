import { NextResponse } from 'next/server';
import { verifyToken } from '@/utils/auth';
import db from '@/config/db';
import { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
    userId: number;
}

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('authorization');
        console.log('Auth header:', authHeader); // Debug log

        if (!authHeader) {
            return NextResponse.json({ error: 'No authorization header' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        console.log('Token:', token); // Debug log

        const decoded = await verifyToken(token) as DecodedToken;
        console.log('Decoded token:', decoded); // Debug log

        if (!decoded || !decoded.userId) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const [rows] = await db.query(
            'SELECT first_name FROM users WHERE id = ?',
            [decoded.userId]
        );

        // Type assertion for the rows array
        const users = rows as any[];
        
        if (users.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ firstName: users[0].first_name });
    } catch (error) {
        console.error('Profile fetch error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 