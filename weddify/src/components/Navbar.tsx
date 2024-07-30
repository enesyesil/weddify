import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-black text-white border-2 border-b-8 border-zinc-500 p-6 mb-16 rounded-lg">
      <div className="container mx-auto flex justify-between items-center">
       
        <div className="text-4xl font-bold">
          <a href="#" className="hover:text-z-400">Gaye & Enes</a>
        </div>
        <div className="text-lg font-bold">
        <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
      <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-900 hover:border-green-700 rounded">
        Get Location
      </button>
    </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
