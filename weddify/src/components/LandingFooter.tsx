import React from 'react';

const LandingFooter: React.FC = () => {
  return (
    <div className="bg-yellow-400">
      <footer className="bg-black border border-b-4 border-zinc-600 text-white rounded-lg w-full p-4 mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">
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
    </div>
  );
};

export default LandingFooter;
