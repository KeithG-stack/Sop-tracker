import { NextResponse } from 'next/server';



export async function POST(request) {
  try {
    const data = await request.json();

    // Validate required IDs
    if (!data.authorId || !data.categoryId) {
      return NextResponse.json(
        { error: 'Missing authorId or categoryId' },
        { status: 400 }
      );
    }

    const sop = await prisma.sOP.create({
      data: {
        title: data.title,
        content: data.content,
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
        author: { connect: { id: data.authorId } },
        category: { connect: { id: data.categoryId } }
      }
    });
    return NextResponse.json(sop, { status: 201 });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json({ error: 'Failed to create SOP' }, { status: 500 });
  }
}