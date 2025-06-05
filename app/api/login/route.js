import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(request) {

  try {

    const { email, password } = await request.json();

    console.log('Received login data:', { email, password });
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    console.log('User found:', user);

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Compare password
    const valid = await bcrypt.compare(password, user.password);
      console.log('Password valid:', valid);

    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Return success response
    return NextResponse.json({ 
      message: 'Login successful', 
      user: { id: user.id, email: user.email, name: user.name } 
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}