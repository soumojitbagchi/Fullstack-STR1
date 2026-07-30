import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  fetchAllProducts,
  fetchCategories,
  fetchProductsByCategory,
} from "../services/productApi";
import { useSearch } from "../searchbar/Hooks/useSearch";
import {useDashboard} from "../onClickingOutside/hooks/useDashboard"
import "./Dashboard.css";
import DashboardHeader from "./DashboardHeader";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { searchResultHandler } = useSearch();
  const { handleAddToCart } = useDashboard();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [openSideBar, setopenSideBar] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate()

  const outsidedashboard = () => {
    setopenSideBar(!openSideBar);
    console.log(user);
  };

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(["all", ...data]))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setLoading(true);
    const load =
      activeCategory === "all"
        ? fetchAllProducts()
        : fetchProductsByCategory(activeCategory);

    load
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  /**
   * Calculates the discount percentage
   * between the original and current price
   */
  const getDiscountPercent = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  /**
   * @description send call over the api to fetch data from database
   *
   */



  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <DashboardHeader />
      </header>

      <div className="dashboard-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "filter-btn-active" : ""}`}
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
          {products.map((product) => {
            const productId = product._id || product.id;
            return (
              <div className="product-card" key={productId}>
                <div className="product-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />

                  <button
                    className="love-btn"
                    onClick={() => toggleFavorite(productId)}
                    aria-label={
                      favorites[productId]
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={favorites[product.id] ? "#e53e3e" : "none"}
                      stroke={favorites[product.id] ? "#e53e3e" : "#ffffff"}
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
                      <span className="product-price">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.hasDiscount && (
                        <span className="product-original-price">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="product-stock">
                    {product.stock > 0 ? (
                      <span
                        className={`stock-text ${product.stock <= 5 ? "stock-low" : "stock-ok"}`}
                      >
                        {product.stock <= 5
                          ? `Only ${product.stock} left`
                          : `${product.stock} in stock`}
                      </span>
                    ) : (
                      <span className="stock-text stock-none">Unavailable</span>
                    )}
                  </div>

                  <button
                    className="add-to-cart-btn"
                    disabled={product.stock === 0}
                    onClick={() => {
                      if (product.stock > 0) {
                        handleAddToCart(productId);
                      }
                    }}
                  >
                    {product.stock === 0 ? "Sold Out" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}
