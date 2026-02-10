import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, params: Params) {
  const { id } = await params.params;

  const task = await prisma.task.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return NextResponse.json(task);
}

export async function PUT(req: NextRequest, params: Params) {
  const { id } = await params.params;

  const data = await req.json();

  const response = await prisma.task.update({
    where: {
      id: parseInt(id),
    },
    data: data,
  });

  return NextResponse.json({
    message: 'Tarea actualizada',
    data: response,
  });
}

export async function DELETE(req: NextRequest, params: Params) {
  try {
    const { id } = await params.params;

    const response = await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ message: 'Tarea eliminada', data: response });
  } catch (error) {
    return NextResponse.json({ message: 'Error al eliminar la tarea', error });
  }
}
