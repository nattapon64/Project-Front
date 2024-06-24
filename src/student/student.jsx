import React, { useState, useEffect } from 'react';
import SlibraSTD from './slibraSTD';

export default function Student() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide % totalSlides) + 1);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 1 ? totalSlides : prevSlide - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide % totalSlides) + 1);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SlibraSTD />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden m-4">
            Open drawer
          </label>
          <div className="carousel w-full max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden">
            <div id="slide1" className={`carousel-item relative w-full ${currentSlide === 1 ? 'block' : 'hidden'}`}>
              <img src="https://picsum.photos/id/175/800/400" className="w-full object-cover" alt="Slide 1" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button onClick={handlePrev} className="btn btn-circle">❮</button>
                <button onClick={handleNext} className="btn btn-circle">❯</button>
              </div>
            </div>
            <div id="slide2" className={`carousel-item relative w-full ${currentSlide === 2 ? 'block' : 'hidden'}`}>
              <img src="https://picsum.photos/id/128/800/400" className="w-full object-cover" alt="Slide 2" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button onClick={handlePrev} className="btn btn-circle">❮</button>
                <button onClick={handleNext} className="btn btn-circle">❯</button>
              </div>
            </div>
            <div id="slide3" className={`carousel-item relative w-full ${currentSlide === 3 ? 'block' : 'hidden'}`}>
              <img src="https://picsum.photos/id/29/800/400" className="w-full object-cover" alt="Slide 3" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button onClick={handlePrev} className="btn btn-circle">❮</button>
                <button onClick={handleNext} className="btn btn-circle">❯</button>
              </div>
            </div>
            <div id="slide4" className={`carousel-item relative w-full ${currentSlide === 4 ? 'block' : 'hidden'}`}>
              <img src="https://picsum.photos/id/237/800/400" className="w-full object-cover" alt="Slide 4" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button onClick={handlePrev} className="btn btn-circle">❮</button>
                <button onClick={handleNext} className="btn btn-circle">❯</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
