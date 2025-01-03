'use client';

import { useSession, signOut } from 'next-auth/react';

const EventNavbar: React.FC = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="bg-black p-4 text-white">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">Weddify</span>
        {session ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        ) : (
          <span className="text-gray-400">Welcome, Guest</span>
        )}
      </div>
    </nav>
  );
};

export default EventNavbar;
