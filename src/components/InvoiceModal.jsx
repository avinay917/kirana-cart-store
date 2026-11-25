import React from 'react';
import { X, Printer, Share2, CheckCircle2, ShoppingBag, Store, MapPin, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_INFO } from '../data/products';

export default function InvoiceModal() {
  const {
    isInvoiceOpen,
    setIsInvoiceOpen,
    lastCompletedOrder,
  } = useCart();

  if (!isInvoiceOpen || !lastCompletedOrder) return null;

  const { orderId, date, customer, items, bill } = lastCompletedOrder;

  const handlePrint = () => {
    window.print();
  };

  const getWhatsAppReceiptUrl = () => {
    const itemsList = items
      .map(
        (it, idx) =>
          `${idx + 1}. ${it.product.name} (${it.product.unit}) x ${it.quantity} = ₹${
            it.product.price * it.quantity
          }`
      )
      .join('\n');

    const msg = `🧾 *KIRANA CART - ORDER RECEIPT*\n*Order ID:* ${orderId}\n*Date:* ${date}\n*Customer:* ${customer.name} (${customer.phone})\n*Address:* ${customer.address}\n\n*ITEMS:*\n${itemsList}\n\n*Items Total:* ₹${bill.subtotal}\n*Discount:* -₹${bill.totalSavings}\n*Delivery Fee:* ${
      bill.deliveryFee === 0 ? 'FREE' : '₹' + bill.deliveryFee
    }\n*Grand Total:* ₹${bill.grandTotal}\n*Payment Mode:* ${customer.paymentMethod.toUpperCase()}\n\nDhanyawad! Kirana Cart par dobara aaiye.`;

    return `https://wa.me/${customer.phone ? '91' + customer.phone.replace(/\D/g, '') : STORE_INFO.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-gray-100 flex flex-col">
        <div className="bg-gray-100 px-5 py-3 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs sm:text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Order Placed Successfully! (Order ID: {orderId})</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-xs font-semibold text-gray-700 shadow-xs transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Bill</span>
            </button>
            <button
              onClick={() => setIsInvoiceOpen(false)}
              className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 text-gray-900 bg-white" id="printable-bill">
          <div className="text-center border-b pb-4 border-dashed border-gray-300">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600 text-white mb-2">
              <Store className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-black uppercase tracking-tight text-gray-900">
              {STORE_INFO.name}
            </h1>
            <p className="text-xs text-gray-600 font-medium">{STORE_INFO.tagline}</p>
            <p className="text-[11px] text-gray-500 mt-1">{STORE_INFO.address}</p>
            <p className="text-[11px] text-gray-500">Helpline: {STORE_INFO.phone}</p>
            <div className="mt-2 inline-block px-3 py-0.5 rounded-full bg-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-700 border border-gray-200">
              Tax Invoice / Cash Memo (कच्चा बिल)
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
            <div>
              <p className="text-gray-400 font-semibold uppercase text-[10px]">Order No</p>
              <p className="font-bold text-gray-900">{orderId}</p>
              <p className="text-gray-400 font-semibold uppercase text-[10px] mt-2">Date & Time</p>
              <p className="font-medium text-gray-700">{date}</p>
            </div>
            <div>
              <p className="text-gray-400 font-semibold uppercase text-[10px]">Customer Details</p>
              <p className="font-bold text-gray-900">{customer.name}</p>
              <p className="text-gray-600">{customer.phone}</p>
              <p className="text-gray-500 text-[11px] line-clamp-2 mt-0.5">{customer.address}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
                  <th className="text-left pb-2">Item Name</th>
                  <th className="text-center pb-2">Unit</th>
                  <th className="text-center pb-2">Qty</th>
                  <th className="text-right pb-2">Rate</th>
                  <th className="text-right pb-2">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((it) => (
                  <tr key={it.product.id}>
                    <td className="py-2 font-medium text-gray-900">
                      <div>{it.product.name}</div>
                      <div className="text-[10px] text-gray-400">{it.product.hindiName}</div>
                    </td>
                    <td className="py-2 text-center text-gray-500">{it.product.unit}</td>
                    <td className="py-2 text-center font-bold text-gray-900">{it.quantity}</td>
                    <td className="py-2 text-right text-gray-600">₹{it.product.price}</td>
                    <td className="py-2 text-right font-bold text-gray-900">
                      ₹{it.product.price * it.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-dashed border-gray-300 pt-3 space-y-1.5 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal (Total Items)</span>
              <span>₹{bill.subtotal}</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-medium">
              <span>Total Bachat / Discount</span>
              <span>-₹{bill.totalSavings}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Charges</span>
              <span>{bill.deliveryFee === 0 ? 'FREE' : '₹' + bill.deliveryFee}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2 border-t border-gray-200">
              <span>Grand Total</span>
              <span className="text-emerald-700">₹{bill.grandTotal}</span>
            </div>
            <div className="text-right text-[11px] text-gray-500">
              Payment Mode: <strong className="uppercase text-gray-800">{customer.paymentMethod}</strong>
            </div>
          </div>

          <div className="text-center border-t border-gray-200 pt-4">
            <p className="text-xs font-bold text-emerald-800">
              Aapka Dhanyawad! Dobara Sewa Ka Mauka Dejiye! 🙏
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              Goods once sold can be returned within 24 hours if seals are intact.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <a
            href={getWhatsAppReceiptUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Bill on WhatsApp</span>
          </a>

          <button
            onClick={() => setIsInvoiceOpen(false)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
