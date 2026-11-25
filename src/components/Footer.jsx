import React from 'react';
import { ShoppingBag, Heart, Phone, Mail, Clock, MapPin, ShieldCheck, Truck } from 'lucide-react';
import { STORE_INFO } from '../data/products';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16 pt-12 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Kirana<span className="text-emerald-500">Cart</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Aapki apni local Kirana Dukaan ab online. Ghar ka rashan, dal, chawal, tel, masala, aur daily needs taaza aur sahi daam par.
            </p>
            <div className="flex items-center gap-2 pt-1 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Shuddh Aur Bharosemand</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Sampark Karein (Contact)
            </h4>
            <div className="flex items-start gap-2 text-gray-400">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{STORE_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{STORE_INFO.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{STORE_INFO.openingHours}</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Top Categories
            </h4>
            <ul className="space-y-1.5 text-gray-400">
              <li className="hover:text-emerald-400 cursor-pointer transition">Fresh Whole Wheat Atta & Basmati Rice</li>
              <li className="hover:text-emerald-400 cursor-pointer transition">Unpolished Dals & Pulses</li>
              <li className="hover:text-emerald-400 cursor-pointer transition">Pure Desi Ghee & Mustard Oil</li>
              <li className="hover:text-emerald-400 cursor-pointer transition">Whole Spices & Blended Masala</li>
              <li className="hover:text-emerald-400 cursor-pointer transition">Daily Household & Cleaning</li>
            </ul>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Payment & Delivery
            </h4>
            <p className="text-gray-400 leading-relaxed">
              Cash on Delivery (COD), UPI (Google Pay, PhonePe, Paytm), and Dukaan Khata accepted.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 bg-gray-800 rounded-lg text-emerald-400 font-bold text-[11px] border border-gray-700">
                BHIM UPI
              </span>
              <span className="px-2.5 py-1 bg-gray-800 rounded-lg text-white font-bold text-[11px] border border-gray-700">
                GPay
              </span>
              <span className="px-2.5 py-1 bg-gray-800 rounded-lg text-purple-400 font-bold text-[11px] border border-gray-700">
                PhonePe
              </span>
              <span className="px-2.5 py-1 bg-gray-800 rounded-lg text-amber-400 font-bold text-[11px] border border-gray-700">
                Cash On Delivery
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
          <div>
            © {new Date().getFullYear()} Kirana Cart. All rights reserved. Made for Indian Kirana & Grocery stores.
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <span>Powered by</span>
            <span className="text-emerald-400 font-semibold">Kirana Cart Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
