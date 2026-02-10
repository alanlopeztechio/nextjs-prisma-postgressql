import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
  return (
    <section className="flex h-[calc(100vh-7rem)] justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Not Found</h1>
        <Link href="/" className="text-salte-400 text-2xl mt-10">
          Go back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
