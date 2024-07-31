'use client';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black border border-b-4 border-zinc-600 text-white rounded-lg w-full p-4 mb-8">
      <div className="max-w-full mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Gaye & Enes Wedding</div>
        <div className="text-lg font-bold">
          <a href="https://www.google.com/maps/dir//edessa+banquet+hall/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x882b3b04f4add47d:0xa1c5bc35b233225a?sa=X&ved=1t:3061&ictx=111" target="_blank" rel="noopener noreferrer">
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
