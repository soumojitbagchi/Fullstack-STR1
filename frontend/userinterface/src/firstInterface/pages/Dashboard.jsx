import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  fetchAllProducts,
  fetchCategories,
  fetchProductsByCategory,
} from "../services/productApi";
import { useSearch } from "../searchbar/Hooks/useSearch";
import "./Dashboard.css";
import OutsideDashBoard from "../onClickingOutside/pages/OutsideDashBoard";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const {searchResultHandler }= useSearch()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [openSideBar, setopenSideBar] = useState(false);
  const [search, setSearch] = useState("");

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

  const searchHandler = (e) => {

    setLoading(true);
    try {
      searchResultHandler(search)
    } catch (error) {
      console.log("unable to doit", error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <h1 className="dashboard-title">Products</h1>
          <span className="dashboard-welcome">Welcome, {user.name}</span>
        </div>
        <div className="dashboard-component-right">
          <div className="search-bar">
            <input
              className="dashboard-search-input"
              type="text"
              placeholder="Enter product name"
            />
            <button
              className="search-icon-button"
              type="button"
              aria-label="Search"
              onClick={searchHandler}
              onChange={(e) => setSearch(e.target.value)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
              </svg>
            </button>
          </div>

          <div className="dashboard-outside">
            <img
              src="https://imgs.search.brave.com/aX7CEgdsXcExaNXt5jLIa8--8k0utAjO33xcdugux44/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kcmVh/bXBmcC5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjYvMDUv/RGVmYXVsdC1QZnAt/Ym95LTIud2VicA"
              alt=""
            />
          </div>
        </div>
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
          {products.map((product) => (
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
                  aria-label={
                    favorites[product.id]
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
                >
                  {product.stock === 0 ? "Sold Out" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
