import React, { useState } from 'react';
import '../CSS/splash.css';
import { Link } from 'react-router-dom';

const Splash = () => {
  const [isTextShifted, setIsTextShifted] = useState(false);

  const applyHoverEffect = () => {
    setIsTextShifted(true);
  };

  return (
    <div className="container-splash">
      <div className={`content ${isTextShifted ? 'text-shifted' : ''}`} data-tilt>
        <div className="heading">
          <h1>Are you hungry?</h1>
        </div>
        <div className="text">
          <p>Order food from favorite restaurants near you.</p>
        </div>
        {isTextShifted && (
          <div className="new-content">
            <h1>New Heading</h1>
            <p>New text content.</p>
          </div>
        )}
        <button className="btn-splash" >
          <Link to="/home">Get food in 30 minutes!</Link>
        </button>
        <button className="btn-next"onClick={applyHoverEffect} >
          <Link to="#">next</Link>
        </button>
      </div>
    </div>
  );
};

export default Splash;
