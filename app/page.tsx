import TaskCard from '@/components/TaskCard';
import { Task } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getTasksByPrisma();

  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-3 gap-3">
        {data.map((task, index) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </section>
  );
}

async function getTasks() {
  const res = await fetch('http://localhost:3000/api/tasks');

  if (!res.ok) {
    console.error('Error al obtener tareas', res.status);
    return [];
  }

  try {
    const data = (await res.json()) as { response: number; data: Task[] };
    return (data.data ?? []) as Task[];
  } catch (err) {
    console.error('Error al parsear JSON de /api/tasks', err);
    return [];
  }
}

async function getTasksByPrisma() {
  try {
    const tasks = await prisma.task.findMany();

    return tasks;
  } catch (error) {
    console.error('Error al obtener tareas directamente de DB:', error);
    return [];
  }
}
