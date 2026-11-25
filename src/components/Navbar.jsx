import React from 'react';
import { ShoppingBag, Search, MapPin, Heart, Phone, Sparkles, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_INFO } from '../data/products';

export default function Navbar() {
  const {
    cart,
    wishlist,
    searchQuery,
    setSearchQuery,
    calculations,
    setIsCartOpen,
  } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-700 text-emerald-100">
              ⚡ 30 MIN EXPRESS
            </span>
            <span className="hidden sm:inline">Order before 9 PM for guaranteed same-day delivery!</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hello%20Kirana%20Cart!%20I%20want%20to%20order%20groceries.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: {STORE_INFO.phone}</span>
            </a>
            <span className="hidden md:inline text-emerald-400">•</span>
            <span className="hidden md:inline">Open: {STORE_INFO.openingHours}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 sm:gap-6">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900">
                Kirana<span className="text-emerald-600">Cart</span>
              </span>
              <span className="hidden xs:inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-md">
                किराना
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
              <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="truncate max-w-[130px] sm:max-w-[200px]">
                Deliver to: <strong className="text-gray-700">110001 (Sec 14, Delhi)</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-2 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Atta, Dal, Oil, Ghee, Masala, Tea, Detergent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="relative hidden sm:flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 transition">
            <Heart className="w-5 h-5 text-gray-600" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 sm:gap-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-3 sm:px-4 py-2.5 rounded-xl font-semibold shadow-md shadow-emerald-600/25 transition-all"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {calculations.totalItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-gray-900 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-emerald-600 shadow-sm animate-pulse-subtle">
                  {calculations.totalItemsCount}
                </span>
              )}
            </div>
            <div className="text-left hidden sm:block leading-tight">
              <div className="text-[11px] font-medium text-emerald-100 uppercase tracking-wider">
                {calculations.totalItemsCount} {calculations.totalItemsCount === 1 ? 'item' : 'items'}
              </div>
              <div className="text-sm font-bold">
                ₹{calculations.grandTotal}
              </div>
            </div>
            <span className="sm:hidden text-sm font-bold">
              ₹{calculations.grandTotal}
            </span>
          </button>
        </div>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Atta, Dal, Oil, Masala..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
