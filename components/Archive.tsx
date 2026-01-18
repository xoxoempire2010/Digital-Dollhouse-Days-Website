import React, { useState, useRef } from 'react';
import { ArchiveItem } from '../types';
import { Tape } from './Tape';

interface ArchiveProps {
  items: ArchiveItem[];
  onAddItem: (item: ArchiveItem) => void;
}

export const Archive: React.FC<ArchiveProps> = ({ items, onAddItem }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Partial<ArchiveItem>>({ category: 'Decor' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.title && newItem.price && newItem.imageUrl) {
      onAddItem({
        id: Date.now().toString(),
        title: newItem.title,
        price: newItem.price,
        description: newItem.description || '',
        category: newItem.category as any,
        imageUrl: newItem.imageUrl,
      });
      setIsAdding(false);
      setNewItem({ category: 'Decor' });
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
         <h2 className="font-['Playfair_Display'] text-5xl text-rose-600 italic inline-block relative">
            The Shop
            <div className="absolute -bottom-2 w-full h-3 bg-yellow-200 -z-10 -rotate-1"></div>
         </h2>
         <p className="font-['Quicksand'] text-gray-500 mt-4">Curated vintage finds & digital goods available for purchase.</p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        
        {/* ADD ITEM CARD */}
        <div className="break-inside-avoid relative group">
          <div className="border-4 border-dashed border-pink-200 bg-pink-50/50 p-6 rounded-lg min-h-[400px] flex flex-col justify-center items-center text-center hover:bg-pink-50 transition-colors">
            {!isAdding ? (
              <button 
                onClick={() => setIsAdding(true)}
                className="group flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-3xl text-pink-400 group-hover:scale-110 transition-transform">
                  +
                </div>
                <span className="font-['Quicksand'] font-bold text-pink-400 uppercase tracking-widest">List New Item</span>
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="w-full space-y-3 text-left">
                <h3 className="font-bold text-rose-500 text-center mb-4">New Listing</h3>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 bg-white border-2 border-dashed border-gray-300 rounded cursor-pointer flex items-center justify-center overflow-hidden"
                >
                  {newItem.imageUrl ? (
                    <img src={newItem.imageUrl} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-xs">Click to upload photo</span>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange}
                />

                <input 
                  type="text" 
                  placeholder="Item Name" 
                  className="w-full p-2 text-sm border-b border-pink-200 bg-transparent focus:outline-none focus:border-pink-400"
                  value={newItem.title || ''}
                  onChange={e => setNewItem({...newItem, title: e.target.value})}
                  required
                />
                
                <input 
                  type="text" 
                  placeholder="Price (e.g. $25.00)" 
                  className="w-full p-2 text-sm border-b border-pink-200 bg-transparent focus:outline-none focus:border-pink-400"
                  value={newItem.price || ''}
                  onChange={e => setNewItem({...newItem, price: e.target.value})}
                  required
                />

                <textarea 
                  placeholder="Description..." 
                  className="w-full p-2 text-sm border-b border-pink-200 bg-transparent focus:outline-none focus:border-pink-400"
                  value={newItem.description || ''}
                  onChange={e => setNewItem({...newItem, description: e.target.value})}
                />

                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setIsAdding(false)} className="text-xs text-gray-400 hover:text-gray-600">Cancel</button>
                  <button type="submit" className="bg-rose-400 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md hover:bg-rose-500">List Item</button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* LIST ITEMS */}
        {items.map((item, index) => (
          <div key={item.id} className="break-inside-avoid relative group">
            {/* Random tape positioning */}
            <Tape 
              className="top-[-10px] left-[50%] -translate-x-1/2" 
              color={index % 2 === 0 ? 'bg-pink-200' : 'bg-blue-200'}
              rotation={index % 2 === 0 ? '-rotate-2' : 'rotate-2'}
            />
            
            <div className="bg-white p-4 pb-6 shadow-lg rounded-sm transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
              <div className="overflow-hidden mb-4 border border-gray-100 relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-auto object-cover" 
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm text-sm font-bold text-rose-600">
                  {item.price}
                </div>
              </div>
              <div className="text-center px-2">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.category}</span>
                 <h3 className="font-['Playfair_Display'] text-xl text-gray-800 mt-1">{item.title}</h3>
                 <p className="font-['Dancing_Script'] text-lg text-gray-500 mt-2 mb-4 leading-tight">{item.description}</p>
                 
                 <button 
                  onClick={() => alert(`Added ${item.title} to cart!`)}
                  className="w-full bg-gray-900 text-white py-2 font-['Quicksand'] text-xs uppercase tracking-widest hover:bg-rose-500 transition-colors"
                 >
                   Add to Cart
                 </button>
              </div>
            </div>
            
            {/* Cute decorative sticker on hover */}
            <div className="absolute bottom-20 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-4xl transform rotate-12 pointer-events-none">
               🛍️
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};