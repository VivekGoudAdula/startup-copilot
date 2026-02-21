import React from 'react';
import Lottie from 'lottie-react';
import catAnimation from '../public/animations/Cat Animation.json';

interface AnimatedCatProps {
  className?: string;
}

export const AnimatedCat: React.FC<AnimatedCatProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <Lottie
        animationData={catAnimation}
        loop={true}
        className="w-full h-full"
      />
    </div>
  );
};
