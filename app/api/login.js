import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
  const { email, password } = await request.json();

  // Find user by email
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Compare password
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // You can set a cookie or return user info here
  return NextResponse.json({ message: 'Login successful', user: { id: user.id, email: user.email } });
}