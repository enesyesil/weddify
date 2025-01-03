'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const MainNavbar: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/'); // Redirect to homepage after logout
  };

  return (
    <nav className="bg-black p-4 text-white">
      <div className="flex justify-between items-center">
        {/* App Name */}
        <span className="text-xl font-bold cursor-pointer" onClick={() => router.push('/')}>
          Weddify
        </span>

        {/* Right Section */}
        <div className="flex gap-4 items-center">
          {session ? (
            <>
              <span className="text-gray-300 font-bold">Welcome, {session.user?.name || 'User'}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push('/auth/login')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/auth/register')}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Create an Account
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
