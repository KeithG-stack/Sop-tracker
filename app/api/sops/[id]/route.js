import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = params;
  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid or missing id parameter' }, { status: 400 });
  }
  try {
    const sop = await prisma.sOP.findUnique({
      where: { id: Number(id) },
      include: { author: true, category: true },
    });
    if (!sop) {
      return NextResponse.json({ error: 'SOP not found' }, { status: 404 });
    }
    return NextResponse.json(sop, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch SOP', details: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid or missing id parameter' }, { status: 400 });
  }
  const data = await request.json();
  try {
    const sop = await prisma.sOP.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        content: data.content,
        version: data.version,
        status: data.status,
        categoryId: data.categoryId, // Use categoryId directly since it's an Int
        // Add other fields as needed
      },
    });
    return NextResponse.json(sop, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update SOP', details: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid or missing id parameter' }, { status: 400 });
  }
  try {
    await prisma.sOP.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete SOP', details: error.message }, { status: 500 });
  }
}