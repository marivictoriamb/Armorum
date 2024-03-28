import React, { useState, useEffect } from 'react';
import styles from "./Slider.module.css";

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
        <img src={images[currentImageIndex]} alt={`unimet${currentImageIndex + 1}`} />
        <div className={styles.overlay}>
            <p>¿Quieres ser parte de las agrupaciones estudiantiles de la UNIMET?</p>
            <button onClick={goToCarruselSection}>Conocer más</button>
        </div>
      </div>
    </div>
  );
};
          
     
  

export default Slider;

