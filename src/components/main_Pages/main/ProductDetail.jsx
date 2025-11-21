import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import "../css/ProductDetail.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CartSidebar from "../Layouts/SidebarCheckout";
// Solid icons
import { faTruck, faClock, faCreditCard, faMobileAlt, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

// Brand icons
import { faWhatsapp, faFacebookF, faTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

// FontAwesome React component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductDetail() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/medicine/get/${id}/`)
      .then((res) => res.json())
      .then((data) => setMedicine(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleBuyNow = () => {
    addToCart(medicine, quantity);
    // optionally open sidebar here
    setSidebarOpen(true);
  };

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => quantity > 1 && setQuantity(quantity - 1);

  if (!medicine) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <div className="product-detail-wrapper">
        <div className="product-detail-container">
          {/* Product Image */}
          <div className="product-image">
            <img src={medicine.image_url} alt={medicine.name} />
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1 className="product-name">{medicine.name}</h1>
            <p className="product-price">Rs {medicine.price}</p>
            <p><strong>Power:</strong> {medicine.power}</p>
            <p><strong>Category:</strong> {medicine.category}</p>
            <p><strong>Type:</strong> {medicine.type}</p>
            <p><strong>Stock:</strong> {medicine.stock}</p>

            {/* Quantity selector */}
            <div className="quantity-selector">
              <button onClick={decreaseQty}>-</button>
              <span>{quantity}</span>
              <button onClick={increaseQty}>+</button>
            </div>

            {/* Action Buttons + Social Icons */}
            <div className="action-buttons">
             

              <div className="share-btn-wrapper">
                <button className="share-btn">Share</button>
                <div className="social-icons">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a href={`https://wa.me/?text=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </a>
                  <a href={`https://www.linkedin.com/shareArticle?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </a>
                </div>
              </div>

                 <button className="checkout-btn" onClick={handleBuyNow}>Buy Now</button>

            </div>
          </div>

          {/* Delivery & Payment Card */}
          <div className="delivery-card">
            <h2>Delivery Options</h2>
            <p><FontAwesomeIcon icon={faTruck} /> Delivery Fee: Minimum 150*</p>
            <p><FontAwesomeIcon icon={faClock} /> Delivery Time: 24 - 48 hours</p>

            <h2>Payment Options</h2>
            <p><FontAwesomeIcon icon={faCreditCard} /> Instant Order</p>
            <p><FontAwesomeIcon icon={faMobileAlt} /> Cash on Delivery</p>
            <p><FontAwesomeIcon icon={faMobileAlt} /> Mobile Wallet (EasyPaisa/JazzCash)</p>

            <h2><FontAwesomeIcon icon={faCheckCircle} /> 100% Authentic Medicines</h2>
            <p>Delivered to your doorstep</p>
            <p><FontAwesomeIcon icon={faWhatsapp} /> Whatsapp Your Prescription and let us handle the rest!</p>
          </div>
        </div>
      </div>
            <CartSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Footer />
    </>
  );
}
