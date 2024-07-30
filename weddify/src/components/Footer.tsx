import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white border-2 border-t-4 border-zinc-500 p-12 mt-12 rounded-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <p>&copy; 2024 Gaye & Enes Wedding</p>
        </div>
        <div className="text-lg font-bold">
          <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
            <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 border-b-4 border-green-900 hover:border-green-700 rounded">
              Get Location
            </button>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
