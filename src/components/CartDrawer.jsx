import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Sparkles,
  Truck,
  ArrowRight,
  Send,
  Tag,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_INFO } from '../data/products';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    calculations,
    promoCode,
    setPromoCode,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    setIsCheckoutOpen,
  } = useCart();

  const [promoMessage, setPromoMessage] = useState(null);

  if (!isCartOpen) return null;

  const handleApplyCode = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    const res = applyPromoCode(promoCode);
    setPromoMessage(res);
    setTimeout(() => setPromoMessage(null), 4000);
  };

  const getWhatsAppOrderUrl = () => {
    const itemsList = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (${item.product.unit}) x ${item.quantity} = ₹${
            item.product.price * item.quantity
          }`
      )
      .join('\n');

    const message = `*🛒 NAYA KIRANA ORDER - Kirana Cart*\n----------------------------\n${itemsList}\n----------------------------\n*Items Total:* ₹${calculations.subtotal}\n*Delivery Fee:* ${
      calculations.isFreeDelivery ? 'FREE' : '₹' + calculations.deliveryFee
    }\n*Total Bachat:* ₹${calculations.totalSavings}\n*Grand Total To Pay:* ₹${
      calculations.grandTotal
    }\n\nKripya order confirm karke delivery bhej dijiye! Dhanyawad.`;

    return `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  const freeDeliveryPercent = Math.min(
    100,
    Math.round((calculations.subtotal / calculations.freeDeliveryThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-emerald-800 text-white">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <div>
                <h2 className="font-extrabold text-base sm:text-lg">
                  Aapka Thela (Cart)
                </h2>
                <p className="text-xs text-emerald-200">
                  {calculations.totalItemsCount} {calculations.totalItemsCount === 1 ? 'item' : 'items'} in basket
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-emerald-200 hover:text-white underline px-2 py-1"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {cart.length > 0 && (
            <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-900 mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-700" />
                  {calculations.isFreeDelivery ? (
                    <span className="text-emerald-700 font-bold">
                      🎉 Badhai ho! Free Delivery unlocked!
                    </span>
                  ) : (
                    <span>
                      Add <strong>₹{calculations.amountNeededForFreeDelivery}</strong> more for <strong>FREE Delivery</strong>
                    </span>
                  )}
                </div>
                <span>{freeDeliveryPercent}%</span>
              </div>
              <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${freeDeliveryPercent}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  Aapka Thela Khali Hai!
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                  Aapne abhi tak koi samaan add nahi kiya. Mandi ke taaza samaan dekhne ke liye catalog browse karein.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/25 transition active:scale-95"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 transition shadow-sm"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-gray-50 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-gray-400">
                      {item.product.unit}
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-extrabold text-sm text-gray-900">
                        ₹{item.product.price * item.quantity}
                      </span>
                      {item.product.mrp > item.product.price && (
                        <span className="text-[11px] text-gray-400 line-through">
                          ₹{item.product.mrp * item.quantity}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-gray-100 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded-lg hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 transition shadow-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-bold text-xs min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded-lg hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 transition shadow-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-red-500 p-1 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-3">
              <form onSubmit={handleApplyCode} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. KIRANA10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs uppercase font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-bold transition"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="flex items-center justify-between text-xs bg-emerald-100/70 text-emerald-800 px-3 py-1.5 rounded-lg font-medium">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{appliedPromo.label}</span>
                    </div>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-xs font-bold text-emerald-900 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {promoMessage && (
                  <div
                    className={`text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 ${
                      promoMessage.success
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {promoMessage.success ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    )}
                    <span>{promoMessage.message}</span>
                  </div>
                )}
              </form>

              <div className="bg-white p-3 rounded-2xl border border-gray-100 text-xs space-y-1.5">
                <div className="flex justify-between text-gray-500">
                  <span>Item Total (MRP)</span>
                  <span>₹{calculations.totalMrp}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Product Discount</span>
                  <span>-₹{calculations.productSavings}</span>
                </div>
                {calculations.promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Coupon Discount</span>
                    <span>-₹{calculations.promoDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>Delivery Fee</span>
                  <span>
                    {calculations.isFreeDelivery ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${calculations.deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="border-t border-dashed border-gray-200 pt-2 flex justify-between text-sm font-extrabold text-gray-900">
                  <span>To Pay (Grand Total)</span>
                  <span className="text-emerald-700 text-base">
                    ₹{calculations.grandTotal}
                  </span>
                </div>
                <div className="bg-emerald-50 text-emerald-800 text-[11px] font-bold p-1.5 rounded-lg text-center">
                  🎉 Total Savings: ₹{calculations.totalSavings}!
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/25 active:scale-95 transition"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Order On WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
