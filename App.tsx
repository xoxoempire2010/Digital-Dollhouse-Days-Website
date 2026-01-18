import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Archive } from './components/Archive';
import { Scrapbook } from './components/Scrapbook';
import { GeminiSpark } from './components/GeminiSpark';
import { ViewState, ArchiveItem } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  
  // State for Shop Items
  const [archiveItems, setArchiveItems] = useState<ArchiveItem[]>([]);
  
  // State for Scrapbook Images (index based for slots)
  const [scrapbookImages, setScrapbookImages] = useState<Record<number, string>>({});

  // State for Hero/Cover Images
  const [heroImages, setHeroImages] = useState<Record<number, string>>({});

  // Load from local storage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem('ddd_archive_items');
    const savedScrapbook = localStorage.getItem('ddd_scrapbook_images');
    const savedHero = localStorage.getItem('ddd_hero_images');
    
    if (savedItems) setArchiveItems(JSON.parse(savedItems));
    if (savedScrapbook) setScrapbookImages(JSON.parse(savedScrapbook));
    if (savedHero) setHeroImages(JSON.parse(savedHero));
  }, []);

  const addItem = (item: ArchiveItem) => {
    const newItems = [item, ...archiveItems];
    setArchiveItems(newItems);
    localStorage.setItem('ddd_archive_items', JSON.stringify(newItems));
  };

  const updateScrapbookImage = (index: number, url: string) => {
    const newImages = { ...scrapbookImages, [index]: url };
    setScrapbookImages(newImages);
    localStorage.setItem('ddd_scrapbook_images', JSON.stringify(newImages));
  };

  const updateHeroImage = (index: number, url: string) => {
    const newImages = { ...heroImages, [index]: url };
    setHeroImages(newImages);
    localStorage.setItem('ddd_hero_images', JSON.stringify(newImages));
  };

  const renderView = () => {
    switch (view) {
      case ViewState.HOME:
        return <Hero images={heroImages} onUpdateImage={updateHeroImage} />;
      case ViewState.ARCHIVE:
        return <Archive items={archiveItems} onAddItem={addItem} />;
      case ViewState.SCRAPBOOK:
        return <Scrapbook images={scrapbookImages} onUpdateImage={updateScrapbookImage} />;
      default:
        return <Hero images={heroImages} onUpdateImage={updateHeroImage} />;
    }
  };

  return (
    <div className="min-h-screen text-gray-800 selection:bg-pink-200">
      {/* Sticky Magazine Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b-2 border-pink-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex-shrink-0 cursor-pointer" 
              onClick={() => setView(ViewState.HOME)}
            >
              <span className="font-['Playfair_Display'] font-bold text-2xl tracking-tighter text-rose-500">
                DDD<span className="text-pink-300">.</span>
              </span>
            </div>
            
            <nav className="flex space-x-8">
              {[
                { label: 'Cover', value: ViewState.HOME },
                { label: 'Shop', value: ViewState.ARCHIVE },
                { label: 'Scrapbook', value: ViewState.SCRAPBOOK },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setView(item.value)}
                  className={`relative px-3 py-2 text-sm font-medium font-['Quicksand'] uppercase tracking-widest transition-colors
                    ${view === item.value ? 'text-rose-500' : 'text-gray-500 hover:text-rose-400'}
                  `}
                >
                  {item.label}
                  {view === item.value && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-400 transform -skew-x-12"></span>
                  )}
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
               <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-400 font-['Quicksand']">Cart (0)</span>
                  <span className="font-bold text-rose-500 text-sm">$0.00</span>
               </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        <div className="animate-fade-in-up">
           {renderView()}
        </div>
      </main>

      {/* Decorative Footer */}
      <footer className="bg-white border-t border-pink-200 mt-20 pb-20">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
           <div className="flex justify-center space-x-6 mb-8 text-2xl">
              <span>🎀</span>
              <span>🧸</span>
              <span>🦢</span>
              <span>🩰</span>
           </div>
           <p className="mt-8 text-center text-base text-gray-400 font-['Playfair_Display'] italic">
            &copy; 2026 Digital Dollhouse Days. Shop the nostalgia.
          </p>
        </div>
      </footer>

      <GeminiSpark />
    </div>
  );
};

export default App;