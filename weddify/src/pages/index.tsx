import Header from '@/components/MainHeader';
import HeroSection from '@/components/HeroSection';
import ProductInfo from '@/components/ProductInfo';
import PricingCards from '@/components/PricingCards';
import Footer from '@/components/LandingFooter';
import '../app/globals.css'; // Update the path based on your project structure


const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ProductInfo />
        <PricingCards />
      </main>
      <Footer />
    </div>
  );
};

export default App;
