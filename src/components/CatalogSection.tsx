import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { CatalogItem } from '../types';
import { 
  Package, 
  Sparkles, 
  Check, 
  Plus, 
  ShieldCheck, 
  ShoppingBag, 
  ArrowRight,
  Edit3,
  SlidersHorizontal
} from 'lucide-react';

export const CatalogSection: React.FC = () => {
  const { data, isEditMode, setIsCmsModalOpen, setActiveCmsTab, saveCatalogItem } = useCms();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Perlengkapan' },
    { id: 'koper', label: 'Koper & Tas Bagasi' },
    { id: 'ihram_mukena', label: 'Kain Ihram & Mukena' },
    { id: 'seragam', label: 'Batik & Seragam' },
    { id: 'aksesoris', label: 'Aksesoris & ID' },
    { id: 'paket_kbih', label: 'Paket Bundling KBIH' },
  ];

  const filteredItems = data.catalog.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="katalog-perlengkapan" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Geometric Balance Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
            Product Inventory &amp; Supply
          </h2>
          <div className="h-[1px] flex-1 mx-6 bg-slate-200"></div>
          <div className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
            B2B Equipment Catalog
          </div>
        </div>

        {/* Section Header Content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
              <Package className="w-3 h-3 text-emerald-700" />
              <span>Katalog Distribusi Perlengkapan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
              Standar Kualitas Tertinggi <span className="font-bold text-emerald-700 italic">Jamaah Indonesia</span>
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl leading-relaxed">
              Seluruh produk diproduksi dengan material pilihan, jahitan kuat bergaransi, dan siap dipersonalisasi dengan branding logo resmi travel atau KBIH Anda.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isEditMode && (
              <button
                onClick={() => {
                  setActiveCmsTab('katalog');
                  setIsCmsModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-sm shadow-sm transition-all uppercase tracking-wider"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Kelola Katalog (CMS)</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-2 font-bold uppercase tracking-wider">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Kategori:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-emerald-600/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Product Image */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden border-b border-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  {item.popularBadge && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm bg-amber-500 text-slate-950 shadow">
                        {item.popularBadge}
                      </span>
                    </div>
                  )}

                  {item.customLogoAvailable && (
                    <div className="absolute bottom-2.5 right-2.5">
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-sm bg-slate-900/80 text-emerald-300 backdrop-blur-sm border border-slate-700 uppercase tracking-wider">
                        Kustom Logo KBIH
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span className="font-bold text-[10px] uppercase tracking-wider text-emerald-700">
                      Min. Order: {item.minOrder}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {item.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Specifications list */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    {item.specifications.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-5 pt-0">
                <a
                  href={`https://wa.me/6281288997439?text=Assalamu'alaikum%20Admin%20Sidya,%20saya%20tertarik%20dengan%20katalog%20${encodeURIComponent(item.name)}%20untuk%20KBIH/Travel%20kami.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-sm bg-slate-50 hover:bg-emerald-700 hover:text-white border border-slate-200 hover:border-emerald-700 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm uppercase tracking-wider"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white" />
                  <span>Konsultasi Pemesanan</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
