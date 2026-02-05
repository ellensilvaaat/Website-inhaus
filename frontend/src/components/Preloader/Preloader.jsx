import React, { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ finishLoading }) => {
  const [percentage, setPercentage] = useState(0);
  // Sua logo do ImageKit com otimização de largura
  const logoUrl = "https://ik.imagekit.io/ijsd2xvnc/Inhaus/public/Logo%20(2).svg?tr=w-300";

  useEffect(() => {
    // Velocidade do progresso (25ms = aprox 2.5 segundos de loading)
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