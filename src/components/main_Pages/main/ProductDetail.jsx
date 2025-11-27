import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/ProductDetail.css";
import { CartContext } from "../../context/CartContext";
import CartSidebar from "../Layouts/SidebarCheckout";
import {
  faTruck,
  faClock,
  faCreditCard,
  faMobileAlt,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../Layouts/Loading";

export default function ProductDetail() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [relatedMedicines, setRelatedMedicines] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Fetch selected product
    fetch(`http://127.0.0.1:8000/medicine/get/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setMedicine(data);

        // Fetch all medicines and filter by same category excluding current product
        fetch("http://127.0.0.1:8000/medicine/get/all")
          .then((res) => res.json())
          .then((allData) => {
            const related = allData.filter(
              (m) => m.category === data.category && m.id !== data.id
            );
            setRelatedMedicines(related);
          });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleBuyNow = () => {
    addToCart(medicine, quantity);
    setSidebarOpen(true);
  };

  const increaseQty = () => {
    if (quantity < medicine.stock) setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (!medicine) return <Loading />;

  return (
    <>
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
            <p>
              <strong>Power:</strong> {medicine.power}
            </p>
            <p>
              <strong>Category:</strong> {medicine.category}
            </p>
            <p>
              <strong>Type:</strong> {medicine.type}
            </p>
            <p>
              <strong>Stock:</strong> {medicine.stock}
            </p>

            {/* Quantity selector */}
            <div className="quantity-selector">
              <button onClick={decreaseQty} disabled={quantity <= 1}>
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={increaseQty}
                disabled={quantity >= medicine.stock}
              >
                +
              </button>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="checkout-btn" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>

          {/* Delivery & Payment Card */}
          <div className="delivery-card">
            <h2>Delivery Options</h2>
            <p>
              <FontAwesomeIcon icon={faTruck} /> Delivery Fee: Minimum 150*
            </p>
            <p>
              <FontAwesomeIcon icon={faClock} /> Delivery Time: 24 - 48 hours
            </p>
            <h2>Payment Options</h2>
            <p>
              <FontAwesomeIcon icon={faCreditCard} /> Instant Order
            </p>
            <p>
              <FontAwesomeIcon icon={faMobileAlt} /> Cash on Delivery
            </p>
            <p>
              <FontAwesomeIcon icon={faMobileAlt} /> Mobile Wallet
              (EasyPaisa/JazzCash)
            </p>
            <h2>
              <FontAwesomeIcon icon={faCheckCircle} /> 100% Authentic Medicines
            </h2>
            <p>Delivered to your doorstep</p>
          </div>
        </div>
        {/* Related Products */}
        {relatedMedicines.length > 0 && (
          <div
            className="related-products-section"
            style={{ marginTop: "40px" }}
          >
            <h2>Other products in {medicine.category}</h2>

            <div className="store-container">
              {relatedMedicines.slice(0, 5).map(
                (
                  med // <-- slice first 10 items
                ) => (
                  <Link to={`/product/${med.id}`} key={med.id} className="card">
                    <div className="product-image-box">
                      <img src={med.image_url} alt={med.name} />
                    </div>
                    <p className="name">{med.name}</p>
                    <p className="price">Rs {med.price}</p>
                    <div className="checkout-btn">Buy Now</div>
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>

      <CartSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
