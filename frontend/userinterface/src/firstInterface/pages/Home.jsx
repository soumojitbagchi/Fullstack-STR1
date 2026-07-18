import Navbar from '../components/navbar';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen">
      <Hero/>
      <ProductGrid />
    </div>
  );
}
