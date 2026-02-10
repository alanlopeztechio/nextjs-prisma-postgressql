'use client';
import { Task } from '@/app/generated/prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const TaskCard = (task: Task) => {
  const router = useRouter();

  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    setDate(
      new Date(task.createAt).toLocaleString('es-MX', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    );
  }, [task.createAt]);

  return (
    <div
      key={task.id}
      className="bg-slate-800 p-4 m-2 space-y-4 hover:bg-slate-700 cursor-pointer"
      onClick={() => {
        router.push(`/task/edit/${task.id}`);
      }}
    >
      <h2 className="font-bold text-3xl">{task.title}</h2>
      <p>{task.description}</p>
      <p>{date}</p>
    </div>
  );
};

export default TaskCard;
