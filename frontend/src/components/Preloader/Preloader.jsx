import React, { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ finishLoading }) => {
  const [percentage, setPercentage] = useState(0);
  const logoUrl = "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Logo%20(2).svg?tr=w-300";

  // Lista de todas as Heros que queremos "esquentar" o cache
  // Usamos as versões que o navegador realmente vai pedir (Desktop e Mobile)
  const imagesToPreload = [
    // Home Hero
    "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/peter-muniz-4oRw53kmhy8-unsplash.jpg?tr=w-1600,f-webp,q-80",
    "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/peter-muniz-4oRw53kmhy8-unsplash.jpg?tr=w-800,f-webp,q-80",
    // Services Hero
    "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/macro-jr-jfw8TSvSMp0-unsplash.jpg?tr=w-1600,f-webp,q-80",
    "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/macro-jr-jfw8TSvSMp0-unsplash.jpg?tr=w-800,f-webp,q-80",
    // Projects Hero
    "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-2g6aRZE9S8s-unsplash.jpg?tr=w-1600,f-webp,q-80",
    "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/lisa-anna-2g6aRZE9S8s-unsplash.jpg?tr=w-800,f-webp,q-80",
    // About Hero
    "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/michael-alake-Ys1Yo1kxxCE-unsplash.jpg?tr=w-1600,f-webp,q-80",
    "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/michael-alake-Ys1Yo1kxxCE-unsplash.jpg?tr=w-800,f-webp,q-80"
  ];

  useEffect(() => {
    // 1. Lógica de Preload de Imagens
    imagesToPreload.forEach((url) => {
      const img = new Image();
      img.src = url;
    });

    // 2. Lógica do Contador (Sua original mantida)
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return 100;
      });
    }, 25);

    if (percentage === 100) {
      const timer = setTimeout(() => {
        finishLoading();
      }, 600);
      return () => clearTimeout(timer);
    }

    return () => clearInterval(interval);
  }, [percentage, finishLoading]);

  return (
    <div className="preloader">
      <div className="preloader__content">
        <div className="preloader__logo-container">
          <img 
            src={logoUrl} 
            alt="Inhaus Logo" 
            className="preloader__logo-img"
            loading="eager"
          />
        </div>
        
        <div className="preloader__bar-container">
          <div className="preloader__bar" style={{ width: `${percentage}%` }}></div>
        </div>
        <div className="preloader__text">{percentage}%</div>
      </div>
    </div>
  );
};

export default Preloader;