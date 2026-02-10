import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-slate-800 p-4 text-white flex items-center justify-between">
      <h3>Next Crud</h3>
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Tasks</Link>
        </li>
        <li>
          <Link href="/new">New</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
