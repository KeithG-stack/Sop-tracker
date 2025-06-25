import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
// import { getCurrentUserId } from 'path-to-your-auth-utils'; // Implement this for real auth

// Instantiate Prisma client
const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.json();
    // In a real app, get the authenticated user's ID from session/auth
    // const userId = await getCurrentUserId(request);
    const userId = 1; // <-- Hardcoded for demo; replace with real user ID from auth

    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    if (!data.categoryId) {
      return NextResponse.json({ error: 'Missing categoryId' }, { status: 400 });
    }

    const sop = await prisma.sOP.create({
      data: {
        title: data.title,
        content: data.content,
        version: data.version || '1.0',
        status: data.status || 'DRAFT',
        author: { connect: { id: userId } },
        category: { connect: { id: data.categoryId } }
      }
    });
    return NextResponse.json(sop, { status: 201 });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json({ error: 'Failed to create SOP' }, { status: 500 });
  }
}

export async function GET() {
  try {
    console.log('Received GET request for SOPs');
    const sops = await prisma.sOP.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        author: true,
        category: true,
      },
    });
    return NextResponse.json(sops, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch SOPs:', error);
    return NextResponse.json({ error: 'Failed to fetch SOPs' }, { status: 500 });
  }
}

  
