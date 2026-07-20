import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchAllProducts, fetchCategories, fetchProductsByCategory } from '../services/productApi';
import './Dashboard.css';
import OutsideDashBoard from '../onClickingOutside/pages/OutsideDashBoard';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});

  const outsidedashboard = ()=>{
    navigate('/outside')
  }

  useEffect(() => {
    fetchCategories()
      .then(data => setCategories(['all', ...data]))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setLoading(true);
    const load = activeCategory === 'all'
      ? fetchAllProducts()
      : fetchProductsByCategory(activeCategory);

    load
      .then(data => setProducts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const toggleFavorite = (productId) => {
    setFavorites(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  /**
   * Calculates the discount percentage
   * between the original and current price
   */
  const getDiscountPercent = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <h1 className="dashboard-title">Products</h1>
          <span className="dashboard-welcome">Welcome, {user?.name}</span>
        </div>
        <div className="dashboard-outside" onClick={()=>{
          outsidedashboard()
        }}>
          <img src="https://imgs.search.brave.com/aX7CEgdsXcExaNXt5jLIa8--8k0utAjO33xcdugux44/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kcmVh/bXBmcC5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjYvMDUv/RGVmYXVsdC1QZnAt/Ym95LTIud2VicA" alt="" />
        </div>
      </header>

      <div className="dashboard-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'filter-btn-active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div className="dashboard-loading">
          <div className="spinner"></div>
        </div>
      )}

      {!loading && (
        <div className="product-grid">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />

                <button
                  className="love-btn"
                  onClick={() => toggleFavorite(product.id)}
                  aria-label={favorites[product.id] ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={favorites[product.id] ? '#e53e3e' : 'none'}
                    stroke={favorites[product.id] ? '#e53e3e' : '#ffffff'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>

                {product.hasDiscount && (
                  <span className="discount-badge">
                    -{getDiscountPercent(product.originalPrice, product.price)}%
                  </span>
                )}

                {product.stock === 0 && (
                  <span className="out-of-stock-badge">Out of Stock</span>
                )}
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-description">{product.description}</p>

                <div className="product-price-row">
                  <div className="price-group">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    {product.hasDiscount && (
                      <span className="product-original-price">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="product-stock">
                  {product.stock > 0 ? (
                    <span className={`stock-text ${product.stock <= 5 ? 'stock-low' : 'stock-ok'}`}>
                      {product.stock <= 5
                        ? `Only ${product.stock} left`
                        : `${product.stock} in stock`
                      }
                    </span>
                  ) : (
                    <span className="stock-text stock-none">Unavailable</span>
                  )}
                </div>

                <button
                  className="add-to-cart-btn"
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
