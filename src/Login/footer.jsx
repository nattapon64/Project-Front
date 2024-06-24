import React from 'react';

export default function Footer() {
  return (
    <footer className="flex justify-between px-10 footer bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 py-8 text-center text-white">
      <div className="text-2xl font-bold mb-4">ช่องทางการติดต่อ</div>
      <div className="text-sm mb-2">Nattapon Nupao SNRU</div>
      <div className="flex justify-center gap-4">
        <a href="https://www.facebook.com" target='_blank' className="text-white hover:text-gray-300 transition-all duration-300">
          <i className="fab fa-facebook-square text-3xl"></i>
        </a>
        <a href="#" className="text-white hover:text-gray-300 transition-all duration-300">
          <i className="fab fa-instagram-square text-3xl"></i>
        </a>
      </div>
    </footer>
  );
}
