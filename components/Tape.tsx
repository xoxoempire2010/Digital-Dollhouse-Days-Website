import React from 'react';

interface TapeProps {
  color?: string;
  rotation?: string;
  className?: string;
}

export const Tape: React.FC<TapeProps> = ({ 
  color = 'bg-pink-300/80', 
  rotation = '-rotate-3',
  className = ''
}) => {
  return (
    <div className={`absolute h-8 w-32 ${color} ${rotation} shadow-sm backdrop-blur-sm z-20 ${className} opacity-90`} 
         style={{ clipPath: 'polygon(2% 0%, 98% 0%, 100% 100%, 0% 100%, 5% 50%)' }}>
      <div className="w-full h-full opacity-30 bg-white/20"></div>
    </div>
  );
};