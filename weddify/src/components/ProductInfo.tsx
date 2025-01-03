import React from 'react';

const ProductInfo: React.FC = () => {
  return (
    <section id="features" className="bg-yellow-400 text-black py-16">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-6">Why Weddify?</h3>
        <p className="text-lg font-bold mb-8">
          Everything you need to make your wedding invitations special and hassle-free.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white text-black rounded-lg shadow-lg p-6 border-2 border-black">
            <h4 className="text-xl font-bold mb-4">Custom Invitations</h4>
            <p>Create beautiful invitations that match your unique style.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white text-black rounded-lg shadow-lg p-6 border-2 border-black">
            <h4 className="text-xl font-bold mb-4">Guest Management</h4>
            <p>Easily track RSVPs and manage your guest list in one place.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white text-black rounded-lg shadow-lg p-6 border-2 border-black">
            <h4 className="text-xl font-bold mb-4">Seamless Experience</h4>
            <p>Intuitive interface to make the process smooth and efficient.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
