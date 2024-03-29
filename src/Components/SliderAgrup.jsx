import React, { useState, useEffect } from 'react';
import styles from "./SliderAgrup.module.css";

const Slider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  const goToCarruselSection = () => {
    document.getElementById("carruselSection").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        <img style={{objectFit:"contain"}}src={images[currentImageIndex]} alt={`unimet${currentImageIndex + 1}`} />
      </div>
    </div>
  );
};
          
export default Slider;
