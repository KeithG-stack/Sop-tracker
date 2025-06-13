import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function POST(request) {
  try {
    const data = await request.json();
    const sop = await prisma.sOP.create({
  data: {
    title: data.title,
    content: data.content,
    category: data.category,
    department: data.department,
    purpose: data.purpose,
    scope: data.scope,
    responsibilities: data.responsibilities,
    procedure: JSON.stringify(data.procedure),
    relatedDocuments: JSON.stringify(data.relatedDocuments),
    reviewFrequency: data.reviewFrequency,
    effectiveDate: new Date(data.effectiveDate),
    version: data.version,
    status: data.status,
    authorId: data.authorId,
    categoryId: data.categoryId,
  },
});
    return NextResponse.json(sop, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create SOP' }, { status: 500 });
  }
}