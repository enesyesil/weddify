import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border border-b-4 border-zinc-600 text-white rounded-lg w-full p-4 mt-8">
      <div className="max-w-full mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <p>&copy; 2024 Gaye & Enes Wedding</p>
        </div>
        <a
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20240820T000000Z%2F20240820T023000Z&details=&location=1811%20Albion%20Rd%2C%20Etobicoke%2C%20ON%20M9W%205W4&text=Gaye%20%26%20Enes%20Wedding%20"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-blue-900 hover:border-blue-700 rounded"
          >
            Add to Google Calendar
          </a>
      </div>
    </footer>
  );
};

export default Footer;
