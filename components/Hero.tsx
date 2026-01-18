import React, { useRef } from 'react';

interface HeroProps {
  images: Record<number, string>;
  onUpdateImage: (index: number, url: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ images, onUpdateImage }) => {
  const fileRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateImage(index, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderImageSlot = (index: number, label: string, rotation: string, labelColor: string, labelBg: string) => (
    <div 
      className={`relative group cursor-pointer ${index === 1 ? 'md:mt-12' : ''}`} 
      onClick={() => fileRefs[index].current?.click()}
    >
      <input 
        type="file" 
        ref={fileRefs[index]} 
        className="hidden" 
        accept="image/*" 
        onChange={(e) => handleFileChange(index, e)} 
      />
      
      <div className={`w-full h-64 border-4 border-white shadow-lg transform group-hover:-translate-y-2 transition-transform bg-gray-100 flex flex-col items-center justify-center overflow-hidden relative`}>
        {images[index] ? (
          <img src={images[index]} alt="User Upload" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center text-gray-300">
            <span className="text-4xl mb-2">+</span>
            <span className="font-['Quicksand'] text-xs font-bold uppercase tracking-wider">Upload Photo</span>
          </div>
        )}
      </div>

      <div className={`absolute ${index === 1 ? '-top-4 -left-4' : (index === 2 ? '-bottom-4 left-4' : '-bottom-4 -right-4')} ${labelBg} px-4 py-2 font-bold ${labelColor} shadow-md ${rotation} font-['Quicksand'] pointer-events-none`}>
        {label}
      </div>
    </div>
  );

  return (
    <div className="relative w-full min-h-[85vh] flex items-center justify-center p-8 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse delay-700"></div>

      <div className="relative bg-white/60 backdrop-blur-md p-1 border-4 border-pink-400 max-w-4xl w-full shadow-2xl transform rotate-1 transition-transform hover:rotate-0 duration-500">
        <div className="border-2 border-pink-300 p-8 flex flex-col items-center text-center">
          
          <div className="w-full flex justify-between items-center text-rose-500 font-bold tracking-widest text-xs uppercase mb-6 border-b-2 border-rose-200 pb-2">
            <span>Vol. 01</span>
            <span>Est. 2026</span>
            <span>The Nostalgia Issue</span>
          </div>

          <h1 className="font-['Playfair_Display'] text-6xl md:text-8xl italic text-rose-600 mb-4 leading-tight drop-shadow-sm">
            Digital <br/>
            <span className="not-italic font-normal text-rose-500">Dollhouse</span> <br/>
            Days
          </h1>

          <p className="font-['Dancing_Script'] text-3xl text-gray-600 mt-4 mb-8 rotate-[-2deg]">
            Explore the archives of girlhood & dreams
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8">
             {renderImageSlot(0, 'New Decor!', 'rotate-3', 'text-rose-500', 'bg-yellow-100')}
             {renderImageSlot(1, 'Scrapbook', '-rotate-3', 'text-blue-500', 'bg-blue-100')}
             {renderImageSlot(2, 'Archive', 'rotate-2', 'text-purple-500', 'bg-purple-100')}
          </div>
        </div>
      </div>
    </div>
  );
};