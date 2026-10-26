import React from "react";
import "./App.css";

function App() {
  const handleGetStarted = () => {
    alert("Welcome to Paradise Nursery!");
  };

  return (
    <div className="landing-page">
      <h1>Paradise Nursery</h1>
      <p>
        Bring nature home with our wide range of beautiful, healthy
        houseplants. Greener living starts here.
      </p>
      <button className="get-started-btn" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
}

export default App;
