import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
// import { getCurrentUserId } from 'path-to-your-auth-utils'; // Implement this for real auth

// Instantiate Prisma client
const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Received SOP data:', data);
    // Defensive parse for categoryId and authorId
    const authorId = Number(data.authorId);
    const categoryId = Number(data.categoryId);
    if (!authorId || !categoryId) {
      console.log('Missing or invalid authorId or categoryId:', authorId, categoryId);
      return NextResponse.json(
        { error: 'Missing or invalid authorId or categoryId', received: { authorId: data.authorId, categoryId: data.categoryId } },
        { status: 400 }
      );
    }
    const sop = await prisma.sOP.create({
      data: {
        title: data.title,
        content: data.content,
        authorId,
        categoryId,
      },
    });
    console.log('SOP created successfully:', sop);
    return NextResponse.json(sop, { status: 201 });
  } catch (error) {
    console.error('SOP creation error:', error);
    return NextResponse.json({ error: 'Failed to create SOP', details: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    // Get userId from query param (for demo)
    const { searchParams } = new URL(request.url);
    const userId = Number(searchParams.get('userId'));

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const sops = await prisma.sOP.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(sops);
  } catch (error) {
    console.error('Failed to fetch SOPs:', error);
    return NextResponse.json({ error: 'Failed to fetch SOPs' }, { status: 500 });
  }
}


