import React from 'react';
import { Truck, ShieldCheck, Zap, Tag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_INFO } from '../data/products';

export default function Banner() {
  const { applyPromoCode, setPromoCode } = useCart();

  const handleQuickCoupon = (code) => {
    setPromoCode(code);
    applyPromoCode(code);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-4 sm:pt-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 text-white p-6 sm:p-10 shadow-xl shadow-emerald-950/10">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold backdrop-blur-sm border border-emerald-400/30 mb-4">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Shuddh Desi Kirana • Direct Mandi Freshness</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Ghar Ka Rashan, <br />
            <span className="text-amber-300">Seedha Aapke Ghar Tak!</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-xl">
            Pure Chakki Atta, Unpolished Dals, Desi Ghee & Daily Essentials at Wholesale Mandi Prices. Free delivery on orders above ₹{STORE_INFO.freeDeliveryThreshold}.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl text-xs sm:text-sm">
              <Tag className="w-4 h-4 text-amber-300" />
              <span>Use Code:</span>
              <button
                onClick={() => handleQuickCoupon('KIRANA10')}
                className="font-bold text-amber-300 hover:underline uppercase tracking-wide ml-1 bg-amber-400/20 px-2 py-0.5 rounded"
              >
                KIRANA10 (10% OFF)
              </button>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl text-xs sm:text-sm">
              <Tag className="w-4 h-4 text-emerald-300" />
              <span>Code:</span>
              <button
                onClick={() => handleQuickCoupon('BACHATPAY')}
                className="font-bold text-emerald-300 hover:underline uppercase tracking-wide ml-1 bg-emerald-400/20 px-2 py-0.5 rounded"
              >
                BACHATPAY (₹50 OFF)
              </button>
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-4">
        <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-gray-900">30 Mins Delivery</div>
            <div className="text-[11px] text-gray-500">Free above ₹{STORE_INFO.freeDeliveryThreshold}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-gray-900">100% Asli Samaan</div>
            <div className="text-[11px] text-gray-500">Unpolished & Pure</div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-gray-900">Mandi Rate Pricing</div>
            <div className="text-[11px] text-gray-500">Save up to 25% daily</div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-gray-900">WhatsApp Khata</div>
            <div className="text-[11px] text-gray-500">Easy ordering & billing</div>
          </div>
        </div>
      </div>
    </div>
  );
}
