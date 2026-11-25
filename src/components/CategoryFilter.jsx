import React from 'react';
import { CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';
import { Store, Wheat, Soup, Flame, Droplets, Coffee, Sparkles } from 'lucide-react';

const ICON_MAP = {
  Store,
  Wheat,
  Soup,
  Flame,
  Droplets,
  Coffee,
  Sparkles,
};

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>Categories</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            विस्तृत श्रेणियां
          </span>
        </h2>
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORIES.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || Store;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 border shrink-0 ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 scale-[1.02]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'
              }`}
            >
              <IconComponent
                className={`w-4 h-4 ${
                  isSelected ? 'text-white' : 'text-emerald-600'
                }`}
              />
              <div className="text-left">
                <div>{cat.name}</div>
                <div
                  className={`text-[10px] font-normal ${
                    isSelected ? 'text-emerald-100' : 'text-gray-400'
                  }`}
                >
                  {cat.labelHi}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
