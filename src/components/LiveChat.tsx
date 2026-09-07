import React, { useState } from 'react';
import { MessageCircle, X, Send, Phone, Mail } from 'lucide-react';

export const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: string; text: string; sender: 'user' | 'bot'; timestamp: Date }>>([
    {
      id: '1',
      text: 'Halo! 👋 Terima kasih telah menghubungi SIDYA. Kami siap membantu Anda. Ada yang bisa kami bantu?',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        text: inputValue,
        sender: 'user' as const,
        timestamp: new Date(),
      };
      setMessages([...messages, userMessage]);
      setInputValue('');

      // Simulate bot response
      setTimeout(() => {
        const botResponses = [
          'Terima kasih atas pertanyaan Anda. Tim kami sedang memproses pesan Anda.',
          'Untuk informasi lebih lanjut, silakan hubungi kami melalui WhatsApp atau email.',
          'Apakah ada yang lain yang bisa kami bantu?',
          'Kami akan merespons dalam waktu singkat. Terima kasih telah bersabar.',
        ];
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        const botMessage = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: 'bot' as const,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  const handleQuickReply = (text: string) => {
    setInputValue(text);
  };

  return (
    <>
      {/* Chat Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 z-40 flex items-center justify-center group"
        title="Open Live Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        )}
        {!isOpen && (
          <span className="absolute -top-10 left-0 bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Live Chat
          </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 w-80 max-h-96 bg-white rounded-xl shadow-2xl z-40 flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="font-bold">SIDYA Live Chat</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2.5 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-3 border-t border-gray-200 space-y-2">
            <p className="text-xs text-gray-600 font-medium">Pertanyaan Cepat:</p>
            <div className="space-y-2">
              <button
                onClick={() => handleQuickReply('Saya ingin informasi tentang katalog produk')}
                className="w-full text-left text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded transition-colors text-gray-700"
              >
                📦 Katalog Produk
              </button>
              <button
                onClick={() => handleQuickReply('Bagaimana cara pemesanan?')}
                className="w-full text-left text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded transition-colors text-gray-700"
              >
                🛒 Cara Pemesanan
              </button>
              <button
                onClick={() => handleQuickReply('Hubungi customer service')}
                className="w-full text-left text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded transition-colors text-gray-700"
              >
                ☎️ Customer Service
              </button>
            </div>
          </div>

          {/* Input Area */}
          <div className="px-4 py-3 border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ketik pesan..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Contact Info */}
          <div className="px-4 py-2 bg-blue-50 border-t border-gray-200 text-xs text-gray-600 rounded-b-xl">
            <p className="font-medium mb-1.5">Hubungi Kami Langsung:</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>+62 (belum ada nomor)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>info@sidya.id</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
