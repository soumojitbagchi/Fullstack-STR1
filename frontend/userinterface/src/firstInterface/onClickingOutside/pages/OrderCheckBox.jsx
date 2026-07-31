import React, { useState } from 'react';
import { useSearch } from '../hooks/useDashboard';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { Check } from 'lucide-react';
import './OrderCheckBox.css';

// 3D Success Checkmark Component
const SuccessCheckmark = () => {
  const meshRef = React.useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 2;
  });

  return (
    <Float speed={5} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        <torusGeometry args={[1.5, 0.4, 16, 32]} />
        <meshStandardMaterial color="#6ee7b7" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#c084fc" metalness={0.8} roughness={0.1} />
      </mesh>
    </Float>
  );
};

const OrderCheckBox = () => {
  const { orderList } = useSearch();
  const navigate = useNavigate();
  const [isPlaced, setIsPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setIsPlaced(true);
    // Navigate back to dashboard after animation
    setTimeout(() => {
      navigate('/');
    }, 3500);
  };

  // Calculate totals
  const subtotal = orderList.reduce((sum, item) => sum + ((item.product?.price || 0) * (item.quantity || 1)), 0);
  const shipping = subtotal > 0 ? 0 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <>
      <div className="order-checkout-wrapper">
        <div className="order-checkout-container">
          <h1 className="order-checkout-title">Checkout</h1>

          <div className="order-checkout-grid">

            <div className="checkout-left">

              {/* 1. Shipping Address */}
              <div className="checkout-section">
                <div className="checkout-section-header">
                  <span>1</span> Shipping Address
                </div>
                <div className="address-details">
                  <p><strong>Jane Doe</strong></p>
                  <p>1234 Web Developer Lane</p>
                  <p>Suite 404</p>
                  <p>San Francisco, CA 94107</p>
                  <p>United States</p>
                </div>
              </div>

              {/* 2. Payment Method */} // dummy
              <div className="checkout-section">
                <div className="checkout-section-header">
                  <span>2</span> Payment Method
                </div>
                <div className="address-details">
                  <p><strong>Visa</strong> ending in 4242</p>
                  <p>Billing address: Same as shipping address</p>
                </div>
              </div>

              {/* 3. Review Items */}
              <div className="checkout-section">
                <div className="checkout-section-header">
                  <span>3</span> Review Items
                </div>
                <div className="checkout-items-list">
                  {orderList.map((item) => (
                    <div className="checkout-item" key={item.product?._id || Math.random()}>
                      <div className="checkout-item-img">
                        {item.product?.image ? (
                          <img src={item.product.image} alt="product" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                        ) : null}
                      </div>
                      <div className="checkout-item-info">
                        <h4 className="checkout-item-name">{item.product?.name || "Unknown Item"}</h4>
                        <p className="checkout-item-desc">
                          {item.product?.description?.substring(0, 50)}...
                        </p>
                        <p style={{ color: '#999', fontSize: '13px', margin: '4px 0 0 0' }}>Qty: {item.quantity || 1}</p>
                      </div>
                      <div className="checkout-item-price">
                        ${Number(item.product?.price || 0).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  {orderList.length === 0 && (
                    <p style={{ color: '#999' }}>No items in order.</p>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary  //need to fixed*/}
            <div className="checkout-right">
              <div className="order-summary-box">
                <h2 className="summary-title">Order Summary</h2>

                <div className="summary-row">
                  <span>Items ({orderList.length}):</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping & handling:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Estimated tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="summary-total">
                  <span>Order Total:</span>
                  <span className="summary-total-price">${total.toFixed(2)}</span>
                </div>

                <button
                  className="place-order-btn"
                  onClick={handlePlaceOrder}
                  disabled={orderList.length === 0}
                >
                  Place Your Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <AnimatePresence>
        {isPlaced && (
          <motion.div
            className="order-success-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 12, stiffness: 100 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div className="canvas-container">
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <ambientLight intensity={1.5} />
                  <pointLight position={[10, 10, 10]} intensity={2} />
                  <pointLight position={[-10, -10, -10]} color="#c084fc" intensity={2} />
                  <SuccessCheckmark />
                </Canvas>
              </div>
              <motion.h2
                className="success-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Order Placed Successfully!
              </motion.h2>
              <motion.p
                className="success-submessage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Redirecting to dashboard...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OrderCheckBox;