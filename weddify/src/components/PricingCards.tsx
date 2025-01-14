import React from 'react';

const PricingCards: React.FC = () => {
  return (
    <section id="pricing" className="bg-yellow-400 text-black py-16">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-6">Choose Your Plan</h3>
        <p className="text-lg mb-8 font-bold">
          Flexible pricing tailored for every couple.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basic Plan */}
          <div className="bg-red-800 text-white border-b-4 rounded-lg shadow-lg p-6 border-2 border-black">
            <h4 className="text-xl font-bold mb-4">Basic</h4>
            <p className="text-lg font-bold mb-4">$9.99 / month</p>
            <ul className="text-left font-bold mb-6">
              <li>- Basic invitations</li>
              <li>- Guest management</li>
              <li>- Up to 100 guests</li>
              <li>- Up to 4 events</li>
              <li>- Basic support</li>
              <li>- Custom designs</li>
            </ul>
            <a
              href="/subscription"
              className="bg-black text-white font-bold py-2 px-4 rounded-lg border-b-4 border-gray-800 hover:bg-gray-900 transition"
            >
              Select Plan
            </a>
          </div>

          {/* Premium Plan */}
          <div className="bg-green-800 text-white border-b-4 rounded-lg shadow-lg p-6 border-2 border-black">
            <h4 className="text-xl font-bold mb-4">Premium</h4>
            <p className="text-lg font-bold mb-4">$19.99 / month</p>
            <ul className="text-left font-bold mb-6">
              <li>- Advanced invitations</li>
              <li>- Guest management</li>
              <li>- Up to 500 guests</li>
              <li>- Up to 10 events</li>
              <li>- Priority support</li>
              <li>- Custom designs</li>
            </ul>
            <a
              href="/subscription"
              className="bg-black text-white font-bold py-2 px-4 rounded-lg border-b-4 border-gray-800 hover:bg-gray-900 transition"
            >
              Select Plan
            </a>
          </div>
          <div className="bg-sky-800 text-white border-b-4 rounded-lg shadow-lg p-6 border-2 border-black">
            <h4 className="text-xl font-bold mb-4">Enterprise</h4>
            <p className="text-lg font-bold mb-4">Contact us for pricing</p>
            <ul className="text-left font-bold mb-6">
              <li>- Advanced invitations</li>
              <li>- Guest management</li>
              <li>- Unlimited guests</li>
              <li>- Unlimited events</li>
              <li>- 7/24 support</li>
              <li>- Custom designs</li>

            </ul>
            <a
              href="/subscription"
              className="bg-black text-white font-bold py-2 px-4 rounded-lg border-b-4 border-gray-800 hover:bg-gray-900 transition"
            >
              Select Plan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCards;
