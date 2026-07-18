import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchAllProducts, fetchCategories, fetchProductsByCategory } from '../services/productApi';
import ProductCard from './ProductCard';
import { useAuth } from '../context/AuthContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function ProductGrid() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories()
      .then(data => setCategories(['all', ...data]))
      .catch(err => console.error('Failed to load categories', err));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const loadProducts = activeCategory === 'all' 
      ? fetchAllProducts()
      : fetchProductsByCategory(activeCategory);

    loadProducts
      .then(data => setProducts(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const displayProducts = user ? products : products.slice(0, 4);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto font-sans" id="products">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">
          Trending <span className="text-purple-400">Products</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold capitalize transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-zinc-800 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="text-center py-20 text-red-400 bg-red-400/10 rounded-2xl border border-red-500/20">
          <p>Oops! Failed to load products.</p>
          <p className="text-sm opacity-80 mt-2">{error}</p>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {displayProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
          {!user && products.length > 4 && (
            <div className="mt-16 flex flex-col items-center justify-center p-12 rounded-3xl border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Want to see more?
                </h3>
                <p className="text-zinc-400 max-w-md mx-auto mb-8">
                  Sign up or log in to unlock our full collection of exclusive products, deals, and personalized recommendations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-fuchsia-500 shadow-lg shadow-purple-500/20"
                    >
                      Create Account
                    </motion.button>
                  </Link>
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 rounded-xl font-bold text-zinc-300 bg-zinc-800 border border-zinc-700/50 hover:text-white transition-colors"
                    >
                      Log In
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
