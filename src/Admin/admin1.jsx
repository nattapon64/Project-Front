import React from 'react';
import { Link } from 'react-router-dom';
import Slibaradmin from './Slibaradmin';  // ตรวจสอบให้แน่ใจว่าเส้นทางนี้ถูกต้อง

export default function Admin1() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden m-4">Open drawer</label>
          <div className="carousel w-full max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden">
            <div id="slide1" className="carousel-item relative w-full">
              <img src="https://picsum.photos/id/175/800/400" className="w-full object-cover" alt="Slide 1" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">❮</a>
                <a href="#slide2" className="btn btn-circle">❯</a>
              </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
              <img src="https://picsum.photos/id/128/800/400" className="w-full object-cover" alt="Slide 2" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">❮</a>
                <a href="#slide3" className="btn btn-circle">❯</a>
              </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
              <img src="https://picsum.photos/id/29/800/400" className="w-full object-cover" alt="Slide 3" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle">❮</a>
                <a href="#slide4" className="btn btn-circle">❯</a>
              </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
              <img src="https://picsum.photos/id/237/800/400" className="w-full object-cover" alt="Slide 4" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">❮</a>
                <a href="#slide1" className="btn btn-circle">❯</a>
              </div>
            </div>
          </div>
        </div>
        <Slibaradmin />
      </div>
    </div>
  );
}
