import React, { useState } from 'react';
import { X, CheckCircle, Truck, Clock, CreditCard, Banknote, BookOpen, Sparkles, MapPin, Phone, User } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { STORE_INFO } from '../data/products';

export default function CheckoutModal() {
  const {
    cart,
    calculations,
    isCheckoutOpen,
    setIsCheckoutOpen,
    setIsInvoiceOpen,
    setLastCompletedOrder,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    landmark: '',
    slot: '30mins',
    paymentMethod: 'cod',
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Kripya apna Naam, Phone number aur Delivery Address bharein!');
      return;
    }

    setSubmitting(true);

    const orderData = {
      orderId: 'KC-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      customer: { ...formData },
      items: [...cart],
      bill: { ...calculations },
    };

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.log('Confetti not available', err);
    }

    setTimeout(() => {
      setLastCompletedOrder(orderData);
      clearCart();
      setSubmitting(false);
      setIsCheckoutOpen(false);
      setIsInvoiceOpen(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-emerald-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 flex items-center justify-center text-amber-300">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">Delivery Details</h2>
              <p className="text-xs text-emerald-200">Aapka Kirana Order Ghar Tak!</p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handlePlaceOrder} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Grahak Ki Jankari (Customer Info)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Pura Naam *
                </label>
                <input
                  type="text"
                  required
                  name="name"
                  placeholder="e.g. Ramesh Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  name="phone"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Ghar ka Pata / Flat / Gali No. *
              </label>
              <textarea
                required
                rows={2}
                name="address"
                placeholder="House No., Street/Gali, Society or Mohalla, Sector..."
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Prasiddh Landmark
                </label>
                <input
                  type="text"
                  name="landmark"
                  placeholder="e.g. Shiv Mandir ke paas"
                  value={formData.landmark}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Delivery Slot
                </label>
                <select
                  name="slot"
                  value={formData.slot}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
                >
                  <option value="30mins">⚡ Instant 30 Mins (Express)</option>
                  <option value="evening">🌆 Aaj Shaam (6 PM - 8 PM)</option>
                  <option value="morning">🌅 Kal Subah (8 AM - 10 AM)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>Bhugtan Ka Tarika (Payment Mode)</span>
            </h3>

            <div className="grid grid-cols-3 gap-2">
              <label
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border cursor-pointer text-center transition ${
                  formData.paymentMethod === 'cod'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <Banknote className="w-5 h-5 mb-1 text-emerald-700" />
                <span className="text-xs font-bold">Cash on Delivery</span>
                <span className="text-[10px] text-gray-400">Ghar par nagad</span>
              </label>

              <label
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border cursor-pointer text-center transition ${
                  formData.paymentMethod === 'upi'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <CreditCard className="w-5 h-5 mb-1 text-blue-600" />
                <span className="text-xs font-bold">UPI / GPay / Paytm</span>
                <span className="text-[10px] text-gray-400">QR Code on Delivery</span>
              </label>

              <label
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border cursor-pointer text-center transition ${
                  formData.paymentMethod === 'khata'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="khata"
                  checked={formData.paymentMethod === 'khata'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <BookOpen className="w-5 h-5 mb-1 text-amber-600" />
                <span className="text-xs font-bold">Dukaan Khata</span>
                <span className="text-[10px] text-gray-400">Mahine ka hisab</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Dukandar ke liye koi note ya sandesh?
            </label>
            <input
              type="text"
              name="notes"
              placeholder="e.g. Bell mat bajana, gate par rakh dena"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 block">Total Amount to Pay</span>
              <span className="text-xl font-black text-gray-900">
                ₹{calculations.grandTotal}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
                Savings: ₹{calculations.totalSavings}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
          >
            {submitting ? (
              <span>Confirming Order...</span>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Confirm & Place Order (₹{calculations.grandTotal})</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
