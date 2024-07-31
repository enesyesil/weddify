import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border border-b-4 border-zinc-600 text-white rounded-lg w-full p-4 mt-8">
      <div className="max-w-full mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <p>&copy; 2024 Gaye & Enes Wedding</p>
        </div>
        <a
            href="https://www.google.com/calendar/render?action=TEMPLATE&text=Gaye+%26+Enes+Wedding&details=Join+us+for+our+wedding+celebration&location=1811+Albion+Rd%2C+Etobicoke%2C+ON+M9W+5W4&dates=20240819T193000Z%2F20240819T223000Z"
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
