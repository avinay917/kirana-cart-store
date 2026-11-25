import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { STORE_INFO } from '../data/products';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'kirana_cart_items_v1';
const WISHLIST_STORAGE_KEY = 'kirana_wishlist_items_v1';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const getItemQuantity = (productId) => {
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
    setPromoCode('');
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  const applyPromoCode = (code) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'KIRANA10') {
      setAppliedPromo({ code: 'KIRANA10', discountPercent: 10, label: '10% OFF on Kirana special' });
      return { success: true, message: '🎉 KIRANA10 applied! 10% discount added.' };
    } else if (trimmed === 'BACHATPAY') {
      setAppliedPromo({ code: 'BACHATPAY', flatDiscount: 50, label: '₹50 Flat Bachat' });
      return { success: true, message: '🎉 BACHATPAY applied! ₹50 extra discount.' };
    } else {
      return { success: false, message: 'Invalid coupon code. Try KIRANA10 or BACHATPAY.' };
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  const calculations = useMemo(() => {
    const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const totalMrp = cart.reduce((acc, item) => acc + item.product.mrp * item.quantity, 0);
    const productSavings = Math.max(0, totalMrp - subtotal);

    let promoDiscount = 0;
    if (appliedPromo) {
      if (appliedPromo.discountPercent) {
        promoDiscount = Math.round((subtotal * appliedPromo.discountPercent) / 100);
      } else if (appliedPromo.flatDiscount) {
        promoDiscount = Math.min(subtotal, appliedPromo.flatDiscount);
      }
    }

    const freeDeliveryThreshold = STORE_INFO.freeDeliveryThreshold;
    const isFreeDelivery = subtotal >= freeDeliveryThreshold || subtotal === 0;
    const deliveryFee = isFreeDelivery ? 0 : STORE_INFO.deliveryFee;
    const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

    const grandTotal = Math.max(0, subtotal - promoDiscount + deliveryFee);
    const totalSavings = productSavings + promoDiscount;

    return {
      totalItemsCount,
      subtotal,
      totalMrp,
      productSavings,
      promoDiscount,
      deliveryFee,
      isFreeDelivery,
      freeDeliveryThreshold,
      amountNeededForFreeDelivery,
      grandTotal,
      totalSavings,
    };
  }, [cart, appliedPromo]);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        promoCode,
        setPromoCode,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        addToCart,
        removeFromCart,
        updateQuantity,
        getItemQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        calculations,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isInvoiceOpen,
        setIsInvoiceOpen,
        lastCompletedOrder,
        setLastCompletedOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
