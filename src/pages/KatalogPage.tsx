import React from 'react';
import { useCms } from '../context/CmsContext';
import { ShoppingCart, Star, Package } from 'lucide-react';

export default function KatalogPage() {
  const { data } = useCms();

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900">
            Katalog <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">Perlengkapan</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Koleksi lengkap perlengkapan haji dan umroh berkualitas tinggi dengan harga terjangkau
          </p>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.catalog.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all group border border-slate-200">
              {/* Image */}
              <div className="relative overflow-hidden bg-slate-100 h-64">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {item.popularBadge && (
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {item.popularBadge}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
                    {item.category}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                  <p className="text-sm text-slate-600 mt-2 line-clamp-2">{item.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Min Order:</span>
                    <span className="font-bold text-slate-900">{item.minOrder}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Custom Logo:</span>
                    <span className="font-bold text-emerald-700">
                      {item.customLogoAvailable ? 'Tersedia' : 'Tidak'}
                    </span>
                  </div>
                </div>

                <button className="w-full py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Detail Produk
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
