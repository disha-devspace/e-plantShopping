import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";
import CartItem from "./CartItem";
import "./ProductList.css";

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=400",
          description: "Produces oxygen at night and removes toxins from the air.",
          cost: "$15",
        },
        {
          name: "Spider Plant",
          image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12",
        },
        {
          name: "Peace Lily",
          image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400",
          description: "Removes mold spores and purifies the air.",
          cost: "$18",
        },
      ],
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=400",
          description: "Calming scent, used in aromatherapy and relaxation.",
          cost: "$20",
        },
        {
          name: "Jasmine",
          image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=400",
          description: "Sweet fragrance that promotes a calm mood.",
          cost: "$18",
        },
        {
          name: "Mint",
          image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400",
          description: "Refreshing aroma, also useful in cooking and tea.",
          cost: "$8",
        },
      ],
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        {
          name: "Aloe Vera",
          image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400",
          description: "Soothing gel for skin care, needs very little water.",
          cost: "$14",
        },
        {
          name: "Cactus",
          image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400",
          description: "Thrives with minimal watering and lots of sunlight.",
          cost: "$10",
        },
        {
          name: "ZZ Plant",
          image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400",
          description: "Tolerates low light and irregular watering.",
          cost: "$25",
        },
      ],
    },
  ];

  const calculateTotalQuantity = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="brand">
          <h3>Paradise Nursery</h3>
          <i>Where Green Meets Serenity</i>
        </div>
        <div className="nav-links">
          <a href="#plants" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>
            Plants
          </a>
          <a href="#cart" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
            <span className="cart-icon">
              🛒
              <span className="cart-count">{calculateTotalQuantity()}</span>
            </span>
          </a>
        </div>
      </div>

      {/* Product listing */}
      {!showCart ? (
        <div className="product-grid" id="plants">
          {plantsArray.map((group) => (
            <div key={group.category}>
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
