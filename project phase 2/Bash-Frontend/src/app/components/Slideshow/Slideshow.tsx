import React, { useEffect, useState } from "react";
import styles from "./Slideshow.module.css";

const slides = [
  "../images/slideshow/1.png", 
  "../images/slideshow/2.png",
  "../images/slideshow/3.png",
];


const Slideshow: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
  
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };
  
    const prevSlide = () => {
      setCurrentSlide((prevSlide) =>
        prevSlide === 0 ? slides.length - 1 : prevSlide - 1
      );
    };
  
    useEffect(() => {
      const interval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
      return () => clearInterval(interval); // Clean up on unmount
    }, []);
  
    return (
      <div className={styles.slideshowContainer}>
        {slides.map((src, index) => (
          <div
            key={index}
            className={`${styles.slide} ${index === currentSlide ? styles.active : ""}`}
          >
            <img src={src} alt={`Slide ${index + 1}`} className={styles.fade} />
          </div>
        ))}
  
        {/* Next and previous buttons */}
        <a className={`${styles.slideshowButton} ${styles.prev}`} onClick={prevSlide}>
          &#10094;
        </a>
        <a className={`${styles.slideshowButton} ${styles.next}`} onClick={nextSlide}>
          &#10095;
        </a>
  
        {/* Slideshow indicators */}
        <div className={styles.slideshowIndicators}>
          {slides.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.active : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    );
  };
  
  export default Slideshow;