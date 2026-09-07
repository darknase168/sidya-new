import React from 'react';
import { useCms } from '../context/CmsContext';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function KontakPage() {
  const { data } = useCms();
  const { contact } = data;
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900">
            Hubungi <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">Kami</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Kami siap membantu menjawab pertanyaan dan kebutuhan Anda
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Phone className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="font-bold text-slate-900">Telepon</h3>
            </div>
            <p className="text-slate-600 mb-2">{contact.phone}</p>
            <p className="text-sm text-slate-500">Hubungi kami pada jam kerja</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="font-bold text-slate-900">Email</h3>
            </div>
            <p className="text-slate-600 mb-2">{contact.email}</p>
            <p className="text-sm text-slate-500">Kirim pertanyaan via email</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-bold text-slate-900">Lokasi</h3>
            </div>
            <p className="text-slate-600 text-sm mb-2">{contact.address}</p>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-8 border border-emerald-200 mb-16">
          <div className="flex items-center gap-4 mb-4">
            <Clock className="w-8 h-8 text-emerald-700" />
            <h3 className="text-2xl font-bold text-slate-900">Jam Operasional</h3>
          </div>
          <p className="text-lg text-slate-700">{contact.operatingHours}</p>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Kirim Pesan Kami</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <input
              type="tel"
              placeholder="Nomor Telepon"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />

            <input
              type="text"
              placeholder="Subjek"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />

            <textarea
              placeholder="Pesan Anda"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
