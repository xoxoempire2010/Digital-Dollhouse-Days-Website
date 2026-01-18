import React, { useRef } from 'react';
import { Tape } from './Tape';

interface ScrapbookProps {
  images: Record<number, string>;
  onUpdateImage: (index: number, url: string) => void;
}

export const Scrapbook: React.FC<ScrapbookProps> = ({ images, onUpdateImage }) => {
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

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

  return (
    <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] p-4 md:p-12 flex justify-center items-center">
      <div className="bg-[#fffdf5] w-full max-w-5xl min-h-[800px] shadow-2xl rounded-xl relative overflow-hidden border border-gray-200">
        
        {/* Book Binding */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-200 to-[#fffdf5] border-r border-gray-300 z-10 flex flex-col justify-around py-10 items-center">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-gray-300 shadow-inner"></div>
            ))}
        </div>

        <div className="ml-16 p-8 md:p-16 h-full relative">
          
          {/* Header Note */}
          <div className="absolute top-10 right-10 w-64 bg-yellow-100 p-4 shadow-md rotate-2 font-['Dancing_Script'] text-xl text-gray-700 leading-loose">
            <Tape className="-top-4 left-10" rotation="-rotate-3" color="bg-rose-200/80" />
            My Moodboard <br/>
            Collection inspirations and aesthetic goals for the upcoming season.
            <div className="text-right mt-2 text-sm font-sans text-gray-400">- 2026</div>
          </div>

          {/* Photo Collage - Interactive */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Slot 1 */}
            <div className="relative mt-10 md:mt-32 group cursor-pointer" onClick={() => fileInputRef1.current?.click()}>
                 <div className="absolute -top-6 -left-6 z-20">
                    <Tape className="relative" rotation="-rotate-12" color="bg-purple-200" />
                 </div>
                 <div className="bg-white p-2 pb-8 shadow-xl rotate-[-4deg] border border-gray-200 min-h-[300px] flex flex-col items-center justify-center relative">
                    {images[1] ? (
                      <img src={images[1]} className="w-full h-64 object-cover" />
                    ) : (
                      <div className="text-center text-gray-300 p-8 border-2 border-dashed border-gray-200 rounded w-full h-64 flex flex-col items-center justify-center">
                        <span className="text-4xl mb-2">+</span>
                        <span className="font-['Quicksand'] text-sm">Upload Photo</span>
                      </div>
                    )}
                    <p className="font-['Dancing_Script'] text-center mt-2 text-2xl text-gray-600">Dream #1</p>
                 </div>
                 <input type="file" ref={fileInputRef1} className="hidden" accept="image/*" onChange={(e) => handleFileChange(1, e)} />
                 <div className="absolute -bottom-8 -right-8 text-6xl drop-shadow-md rotate-12 group-hover:scale-110 transition-transform">🗝️</div>
            </div>

            {/* Slot 2 */}
            <div className="relative group cursor-pointer" onClick={() => fileInputRef2.current?.click()}>
                <Tape className="-top-3 right-12 z-20" rotation="rotate-2" color="bg-green-200" />
                <div className="bg-white p-2 pb-8 shadow-xl rotate-[3deg] border border-gray-200 min-h-[300px] flex flex-col items-center justify-center">
                    {images[2] ? (
                      <img src={images[2]} className="w-full h-64 object-cover" />
                    ) : (
                      <div className="text-center text-gray-300 p-8 border-2 border-dashed border-gray-200 rounded w-full h-64 flex flex-col items-center justify-center">
                         <span className="text-4xl mb-2">+</span>
                         <span className="font-['Quicksand'] text-sm">Upload Photo</span>
                      </div>
                    )}
                    <p className="font-['Dancing_Script'] text-center mt-2 text-2xl text-gray-600">Dream #2</p>
                 </div>
                 <input type="file" ref={fileInputRef2} className="hidden" accept="image/*" onChange={(e) => handleFileChange(2, e)} />
                 
                 <div className="mt-8 bg-pink-50 p-6 rounded-lg border-2 border-pink-200 border-dashed relative cursor-default" onClick={e => e.stopPropagation()}>
                    <h3 className="font-['Playfair_Display'] font-bold text-rose-500 mb-2">Shop Stickers</h3>
                    <div className="flex gap-4 text-4xl flex-wrap">
                        <span className="hover:scale-125 transition-transform cursor-pointer">🦋</span>
                        <span className="hover:scale-125 transition-transform cursor-pointer">🍄</span>
                        <span className="hover:scale-125 transition-transform cursor-pointer">🎻</span>
                        <span className="hover:scale-125 transition-transform cursor-pointer">🧴</span>
                    </div>
                 </div>
            </div>

          </div>

          {/* Bottom quote */}
          <div className="absolute bottom-12 left-20 max-w-sm">
            <p className="font-['Playfair_Display'] italic text-2xl text-gray-400 leading-relaxed border-l-4 border-rose-300 pl-4">
              "Curate your life like a gallery."
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};