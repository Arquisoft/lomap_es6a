import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface SliderProps {
  images: string[];
  delay: number;
}

const Slider: React.FC<SliderProps> = ({ images, delay }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, delay);

    return () => clearInterval(intervalId);
  }, [currentImageIndex, delay, images]);

  const handlePrevClick = () => {
    const index = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(index);
  };

  const handleNextClick = () => {
    const index = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(index);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        height: 'calc(100vh - 113.6px)',
        overflow: 'hidden',
      }}
    >
      <img 
        src={images[currentImageIndex]}
        alt="Slider"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'cover',
        }}
      />
      <button
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'transparent',
          border: 'none',
          fontSize: '2rem',
          cursor: 'pointer',
        }}
        onClick={handlePrevClick}
        aria-label="Previous Image"
      >
        <FaChevronLeft />
      </button>
      <button
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'transparent',
          border: 'none',
          fontSize: '2rem',
          cursor: 'pointer',
        }}
        onClick={handleNextClick}
        aria-label="Next Image"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Slider;