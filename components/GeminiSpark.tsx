import React, { useState } from 'react';
import { generateCreativePrompt } from '../services/geminiService';

export const GeminiSpark: React.FC = () => {
  const [prompt, setPrompt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('Room Decor');

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateCreativePrompt(theme);
    setPrompt(result);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative group">
        <button 
          onClick={() => setPrompt(null)} 
          className="bg-white border-2 border-pink-300 p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        >
           <span className="text-2xl">✨</span>
        </button>
        
        {/* Tooltip/Popup */}
        <div className={`absolute bottom-full right-0 mb-4 w-72 bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-blue-200 shadow-xl transform transition-all duration-300 origin-bottom-right ${prompt || loading ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`}>
          <h3 className="font-['Playfair_Display'] font-bold text-lg text-rose-500 mb-2">
            Creative Spark
          </h3>
          
          {!prompt && !loading && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Need inspiration? Pick a theme:</p>
              <div className="flex flex-wrap gap-2">
                {['Room Decor', 'Journaling', 'Outfit', 'Collage'].map((t) => (
                  <button 
                    key={t}
                    onClick={(e) => { e.stopPropagation(); setTheme(t); }}
                    className={`text-xs px-3 py-1 rounded-full border ${theme === t ? 'bg-pink-100 border-pink-300 text-pink-600' : 'border-gray-200 text-gray-500'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); handleGenerate(); }}
                className="w-full mt-2 bg-gradient-to-r from-pink-300 to-purple-300 text-white font-bold py-2 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                Spark Magic ✨
              </button>
            </div>
          )}

          {loading && (
             <div className="flex justify-center py-4">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-400"></div>
             </div>
          )}

          {prompt && !loading && (
            <div className="animate-fade-in">
              <p className="font-['Dancing_Script'] text-xl text-gray-700 leading-relaxed">
                "{prompt}"
              </p>
              <button 
                onClick={(e) => { e.stopPropagation(); setPrompt(null); }}
                className="text-xs text-gray-400 mt-4 underline hover:text-gray-600"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};