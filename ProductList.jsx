import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";
import CartItem from "./CartItem";
import "./ProductList.css";

const img = (id) => `https://images.unsplash.com/${id}?w=400`;

const plantsArray = [
  {
    category: "Air Purifying Plants",
    plants: [
      { name: "Snake Plant", image: img("photo-1593482892290-f54927ae1bb6"), description: "Produces oxygen at night and removes toxins.", cost: "$15" },
      { name: "Spider Plant", image: img("photo-1572688484438-313a6e50c333"), description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
      { name: "Peace Lily", image: img("photo-1593691509543-c55fb32d8de5"), description: "Removes mold spores and purifies the air.", cost: "$18" },
      { name: "Boston Fern", image: img("photo-1598880940371-c756e015fea1"), description: "Natural humidifier that removes pollutants.", cost: "$14" },
      { name: "Rubber Plant", image: img("photo-1598880513655-a7c5e7e2e0f0"), description: "Absorbs airborne toxins with large glossy leaves.", cost: "$20" },
      { name: "Areca Palm", image: img("photo-1545241047-6083a3684587"), description: "Adds moisture and clears indoor air.", cost: "$22" },
    ],
  },
  {
    category: "Aromatic Fragrant Plants",
    plants: [
      { name: "Lavender", image: img("photo-1499002238440-d264edd596ec"), description: "Calming scent used in aromatherapy.", cost: "$20" },
      { name: "Jasmine", image: img("photo-1592729645009-b96d1e63d14b"), description: "Sweet fragrance that promotes a calm mood.", cost: "$18" },
      { name: "Mint", image: img("photo-1628556270448-4d4e4148e1b1"), description: "Refreshing aroma, great for cooking and tea.", cost: "$8" },
      { name: "Rosemary", image: img("photo-1515586000433-45406d8e6662"), description: "Woody scent that boosts alertness.", cost: "$12" },
      { name: "Lemon Balm", image: img("photo-1471943311424-646960669fbc"), description: "Lemony aroma that eases stress.", cost: "$10" },
      { name: "Basil", image: img("photo-1618164435735-413d3b066c9a"), description: "Fragrant herb for kitchens and windowsills.", cost: "$9" },
    ],
  },
  {
    category: "Low Maintenance Plants",
    plants: [
      { name: "Aloe Vera", image: img("photo-1509423350716-97f9360b4e09"), description: "Soothing gel, needs very little water.", cost: "$14" },
      { name: "Cactus", image: img("photo-1459411552884-841db9b3cc2a"), description: "Thrives on minimal watering and sunlight.", cost: "$10" },
      { name: "ZZ Plant", image: img("photo-1632207691143-643e2a9a9361"), description: "Tolerates low light and irregular watering.", cost: "$25" },
      { name: "Jade Plant", image: img("photo-1509937528035-ad76254b0356"), description: "Succulent that stores water in its leaves.", cost: "$16" },
      { name: "Pothos", image: img("photo-1485955900006-10f4d324d411"), description: "Hardy trailing vine that grows almost anywhere.", cost: "$13" },
      { name: "Echeveria", image: img("photo-1463320726281-696a485928c7"), description: "Compact rosette succulent, very easy to care for.", cost: "$11" },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  // Re-enable the button if a plant is removed from the cart
  useEffect(() => {
    setAddedToCart((prev) => {
      const next = {};
      cartItems.forEach((item) => {
        if (prev[item.name]) next[item.name] = true;
      });
      return next;
    });
  }, [cartItems]);

  const calculateTotalQuantity = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div>
      {/* Navbar: shown on both Product Listing and Cart pages */}
      <div className="navbar">
        <div className="brand">
          <h3>Paradise Nursery</h3>
          <i>Where Green Meets Serenity</i>
        </div>
        <div className="nav-links">
          <a href="#home" onClick={(e) => { e.preventDefault(); if (onHomeClick) onHomeClick(); }}>
            Home
          </a>
          <a href="#plants" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>
            Plants
          </a>
          <a href="#cart" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
            Cart
            <span className="cart-icon">
              🛒
              <span className="cart-count">{calculateTotalQuantity()}</span>
            </span>
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid" id="plants">
          {plantsArray.map((group) => (
            <div className="product-list" key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="plant-row">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-price">{plant.cost}</p>
                    <button
                      className="product-button"
                      disabled={addedToCart[plant.name]}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
