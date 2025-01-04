'use client';

import { useSession, signOut } from 'next-auth/react';

interface EventHeaderProps {
  text: string; // Header text to display
}

const EventHeader: React.FC<EventHeaderProps> = ({ text }) => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="bg-black p-4 border-b-4 border-zinc-600 rounded-lg text-white">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">{text}</span>
        {session ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              window.location.href = '/auth/login'; // Redirect to login page
            }}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default EventHeader;
