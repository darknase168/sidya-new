import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export default function PremiumFooter() {
  const { data } = useCms();
  const { company, contact } = data;

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-800">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold">
                S
              </div>
              <div>
                <div className="font-bold text-white">SIDYA</div>
                <p className="text-[10px] text-emerald-400">Distribusi Haji & Umroh</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Platform ekosistem rantai pasok terdepan untuk perlengkapan haji dan umroh yang amanah dan terpercaya.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Halaman</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/profil" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Profil Perusahaan
                </Link>
              </li>
              <li>
                <Link to="/katalog" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Katalog
                </Link>
              </li>
              <li>
                <Link to="/pengurus" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Jajaran Pengurus
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Layanan */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Layanan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/aplikasi" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Aplikasi Mobile
                </Link>
              </li>
              <li>
                <Link to="/mitra" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Solusi Mitra
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Kustomisasi Logo
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontak */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Hubungi Kami</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <a href={`tel:${contact.phone}`} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <a href={`mailto:${contact.email}`} className="text-slate-400 hover:text-emerald-400 transition-colors break-all">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-slate-400 text-xs">{contact.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Media */}
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 bg-slate-800 hover:bg-emerald-700 rounded-lg text-slate-400 hover:text-white transition-all">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-slate-800 hover:bg-emerald-700 rounded-lg text-slate-400 hover:text-white transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-slate-800 hover:bg-emerald-700 rounded-lg text-slate-400 hover:text-white transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-slate-800 hover:bg-emerald-700 rounded-lg text-slate-400 hover:text-white transition-all">
              <Twitter className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {company.companyName}. Hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
