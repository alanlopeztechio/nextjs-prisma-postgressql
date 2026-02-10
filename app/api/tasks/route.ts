import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json({
    response: 200,
    data: tasks,
  });
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const response = await prisma.task.create({
    data: data,
  });

  return NextResponse.json({ data: response });
}
