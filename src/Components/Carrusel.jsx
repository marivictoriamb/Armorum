import { useState, useRef, useEffect } from "react"
import styles from "./Carrusel.module.css"

export function Carrusel(){
  const [selectedRadio, setSelectedRadio] = useState('');
  const firstElementRef = useRef(null);

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.id);
  };

  const updateMargin = () => {
    const element = firstElementRef.current;
    if (element) {
      let newMargin = '0px'; // Default margin

      switch (selectedRadio) {
        case 'radio2':
          newMargin = '-20%';
          break;
        case 'radio3':
          newMargin = '-40%';
          break;
        default:
          break;
      }

      element.style.marginLeft = newMargin;
    }
  };

  useEffect(() => {
    updateMargin(); // Update margin initially
  }, []);

  useEffect(() => {
    updateMargin(); // Update margin on radio change
  }, [selectedRadio]);

  return (
    <div className={styles.All}>
    <div className={styles.slider}>
      <div className={styles.slide}>
        <input
          type="radio"
          className={styles.radioBtn}
          id="radio1"
          checked={selectedRadio === 'radio1'}
          onChange={handleRadioChange}
        />
        <input
          type="radio"
          className={styles.radioBtn}
          id="radio2"
          checked={selectedRadio === 'radio2'}
          onChange={handleRadioChange}
        />
        <input
          type="radio"
          className={styles.radioBtn}
          id="radio3"
          checked={selectedRadio === 'radio3'}
          onChange={handleRadioChange}
        />

        <div className={styles.Img} id={styles.first} ref={firstElementRef}>
          <img alt="carousel" src="/1.png" className={styles.img} />
        </div>

        <div className={styles.Img} >
          <img alt="carousel" src="/2.png" className={styles.img} />
        </div>

        <div className={styles.Img} >
          <img alt="carousel" src="/3.png" className={styles.img} />
        </div>

        <div className={styles.navAuto}>
          <div className={`${styles.a1} ${selectedRadio === 1 ? styles.active : ''}`} />
          <div className={`${styles.a2} ${selectedRadio === 2 ? styles.active : ''}`} />
          <div className={`${styles.a3} ${selectedRadio === 3 ? styles.active : ''}`} />
        </div>

        <div className={styles.navM}>
          <label htmlFor="radio1" className={styles.mBtn} />
          <label htmlFor="radio2" className={styles.mBtn} />
          <label htmlFor="radio3" className={styles.mBtn} />
        </div>
      </div>
    </div>
    </div>
  );
}