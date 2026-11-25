import React, { useMemo } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import InvoiceModal from './components/InvoiceModal';
import Footer from './components/Footer';
import { PRODUCTS, STORE_INFO } from './data/products';
import { useCart } from './context/CartContext';
import { ShoppingBag, ArrowRight, MessageCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    calculations,
    setIsCartOpen,
  } = useCart();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.hindiName.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />

      <main className="flex-1 pb-20 sm:pb-12">
        <Banner />
        <CategoryFilter />

        <div className="max-w-7xl mx-auto px-4 mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                {selectedCategory === 'all'
                  ? 'Taaza Kirana Samaan'
                  : 'Filtered Items'}
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                {filteredProducts.length}{' '}
                {filteredProducts.length === 1 ? 'item available' : 'items available'} in stock
              </p>
            </div>

            {(selectedCategory !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Show All Items</span>
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 my-8 shadow-sm">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Koi samaan nahi mila!
              </h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                "<strong>{searchQuery}</strong>" ke liye koi product match nahi hua. Kripya alag naam search karein ya categories browse karein.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <CartDrawer />
      <CheckoutModal />
      <InvoiceModal />

      {calculations.totalItemsCount > 0 && (
        <div className="fixed bottom-3 left-4 right-4 z-30 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white px-4 py-3 rounded-2xl shadow-xl shadow-emerald-900/30 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-xs">
                {calculations.totalItemsCount}
              </div>
              <div className="text-left">
                <div className="text-xs font-medium text-emerald-200">
                  {calculations.totalItemsCount} items added
                </div>
                <div className="text-sm font-black">
                  ₹{calculations.grandTotal}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider bg-white/10 px-3 py-1.5 rounded-xl">
              <span>View Cart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      )}

      <a
        href={`https://wa.me/${STORE_INFO.whatsapp}?text=Hello%20Kirana%20Cart!%20I%20want%20to%20order%20groceries.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-30 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white px-3.5 py-2.5 rounded-full shadow-lg shadow-green-600/30 font-bold text-xs hover:scale-105 active:scale-95 transition-all"
        title="Direct WhatsApp Helpline"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline">WhatsApp Order</span>
      </a>

      <Footer />
    </div>
  );
}
