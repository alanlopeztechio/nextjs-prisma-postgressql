'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Task } from '../generated/prisma/browser';

const NewPage: React.FC = () => {
  const router = useRouter();

  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const params = useParams<{ id?: string }>();
  useEffect(() => {
    if (!params.id) {
      return;
    }

    fetch(`/api/tasks/${params.id}`)
      .then((res) => res.json())
      .then((data: Task) => {
        setTask(data);
        setTitle(data.title ?? '');
        setDescription(data.description ?? '');
      });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (params.id) {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await res.json();
      router.push(`/`);
      return;
    }

    const res = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    router.push(`/`);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-10">
        <label htmlFor="title" className="font-bold text-sm">
          Titulo de la tarea
        </label>
        <input
          type="text"
          className="border border-gray-400 mb-4 w-full"
          placeholder="Titulo de tarea"
          id="title"
          name="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <label htmlFor="description" className="font-bold text-sm">
          Description de la tarea
        </label>
        <textarea
          name="description"
          id="description"
          rows={3}
          className="border border-gray-400 p-2 mb-2 w-full"
          placeholder="Describe tu tarea"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        ></textarea>
        <div className="flex justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {params.id !== undefined ? 'Actualizar tarea' : 'Crear tarea'}
          </button>
          {params.id && (
            <button
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={async () => {
                await fetch(`/api/tasks/${params.id}`, {
                  method: 'DELETE',
                });
                router.push(`/`);
              }}
            >
              Eliminar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewPage;
