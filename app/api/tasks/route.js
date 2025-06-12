import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// GET all tasks
export async function GET() {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(tasks);
}

// POST create a new task
export async function POST(request) {
  const data = await request.json();
  const task = await prisma.task.create({
    data: { text: data.text, completed: false }
  });
  return NextResponse.json(task, { status: 201 });
}

// PATCH update a task (complete)
export async function PATCH(request) {
  const data = await request.json();
  const task = await prisma.task.update({
    where: { id: data.id },
    data: { completed: data.completed }
  });
  return NextResponse.json(task);
}

// DELETE a task
export async function DELETE(request) {
  const data = await request.json();
  await prisma.task.delete({ where: { id: data.id } });
  return NextResponse.json({ success: true });
}