import React from 'react';
import { Plus, Minus, Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const {
    addToCart,
    updateQuantity,
    getItemQuantity,
    toggleWishlist,
    isWishlisted,
  } = useCart();

  const quantity = getItemQuantity(product.id);
  const wishlisted = isWishlisted(product.id);
  const discountPercent = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100
  );

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5 transition-all duration-300 flex flex-col overflow-hidden relative">
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
        {product.badge ? (
          <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            {product.badge}
          </span>
        ) : (
          <span />
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            wishlisted
              ? 'bg-red-50 text-red-500 shadow-sm'
              : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white shadow-sm'
          }`}
          title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 ${wishlisted ? 'fill-current text-red-500' : ''}`}
          />
        </button>
      </div>

      <div className="relative pt-[80%] bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {discountPercent > 0 && (
          <div className="absolute bottom-2 left-2 bg-amber-500 text-white font-extrabold text-[10px] px-1.5 py-0.5 rounded-md shadow-sm">
            {discountPercent}% OFF
          </div>
        )}
      </div>

      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mb-1.5">
            {product.unit}
          </div>

          <h3 className="font-bold text-sm text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-500 line-clamp-1 font-medium mt-0.5">
            {product.hindiName}
          </p>

          <div className="flex items-center gap-1 mt-2 text-xs text-gray-600">
            <div className="flex items-center text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded font-bold text-[11px]">
              <Star className="w-3 h-3 fill-current mr-0.5" />
              <span>{product.rating}</span>
            </div>
            <span className="text-[11px] text-gray-400">({product.reviewsCount})</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-gray-900">
                ₹{product.price}
              </span>
              {product.mrp > product.price && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.mrp}
                </span>
              )}
            </div>
            <div className="text-[10px] text-emerald-600 font-semibold">
              Bachat: ₹{product.mrp - product.price}
            </div>
          </div>

          {quantity === 0 ? (
            <button
              onClick={() => addToCart(product)}
              className="flex items-center justify-center gap-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-300 hover:border-emerald-600 px-3 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          ) : (
            <div className="flex items-center bg-emerald-600 text-white rounded-xl shadow-md shadow-emerald-600/20 px-1 py-1">
              <button
                onClick={() => updateQuantity(product.id, -1)}
                className="w-6 h-6 flex items-center justify-center hover:bg-emerald-700 rounded-lg active:scale-90 transition"
                title="Decrease"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 font-black text-xs min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => updateQuantity(product.id, 1)}
                className="w-6 h-6 flex items-center justify-center hover:bg-emerald-700 rounded-lg active:scale-90 transition"
                title="Increase"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
