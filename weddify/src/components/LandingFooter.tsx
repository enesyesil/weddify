import React from 'react';

const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-black border border-b-4 border-zinc-600 text-white rounded-lg w-full p-4 mt-8">
      <div className="max-w-full mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-lg font-bold mb-4 md:mb-0">
          <p>&copy; 2024 Weddify. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a
            href="#contact"
            className="text-white hover:underline"
          >
            Contact Us
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
