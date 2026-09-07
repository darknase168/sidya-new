-- SIDYA Catalog Database Schema
-- Run this script in phpMyAdmin to create the katalog tables
-- NOTE: Database harus sudah dibuat sebelumnya. Script ini hanya membuat tables.

-- Create catalog items table
CREATE TABLE IF NOT EXISTS katalog_items (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description LONGTEXT NOT NULL,
  image LONGTEXT,
  customLogoAvailable BOOLEAN DEFAULT 1,
  minOrder VARCHAR(100),
  specifications JSON,
  popularBadge VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create katalog audit log
CREATE TABLE IF NOT EXISTS katalog_audit (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_id VARCHAR(50),
  action VARCHAR(50),
  changed_fields JSON,
  changed_by VARCHAR(255),
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_item_id (item_id),
  INDEX idx_changed_at (changed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default catalog items
INSERT INTO katalog_items (id, name, category, description, image, customLogoAvailable, minOrder, specifications, popularBadge) VALUES
('kat-koper-01', 'Koper Hardcase Premium', 'koper', 'Koper hardcase dengan material ABS berkualitas tinggi, tahan lama dan tersedia dalam berbagai warna. Dilengkapi dengan kunci TSA dan roda 360 derajat untuk kemudahan mobilitas.', 'https://images.unsplash.com/photo-1519231411-8e6e1e6d52e5?auto=format&fit=crop&w=600&q=80', 1, '20 unit', '["Material: ABS Premium","Ukuran: 20 inch / 24 inch / 28 inch","Kapasitas: 40L - 120L","Berat: 2.5 - 4 kg","Warna: Hitam, Biru, Merah, Silver"]', 'BESTSELLER'),
('kat-koper-02', 'Koper Softcase Fleksibel', 'koper', 'Koper dengan material softcase yang fleksibel dan ringan, cocok untuk mudik dan perjalanan singkat. Tersedia dengan berbagai kompartemen dan fitur ekspandable.', 'https://images.unsplash.com/photo-1605491446875-26f3e5a8ebc9?auto=format&fit=crop&w=600&q=80', 1, '15 unit', '["Material: Polyester 600D","Ukuran: 20 inch / 24 inch","Kapasitas: 35L - 60L","Berat: 1.8 - 2.8 kg","Fitur: Expandable +15%"]', NULL),
('kat-tas-01', 'Tas Travel Praktis', 'koper', 'Tas travel multifungsi dengan desain ergonomis dan banyak kompartemen. Ideal untuk kebutuhan sehari-hari dan perjalanan medium.', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80', 1, '25 unit', '["Material: Nylon 600D","Kapasitas: 40L - 50L","Berat: 1.2 kg","Fitur: Laptop compartment, USB charging port"]', NULL),
('kat-ihram-01', 'Kain Ihram Premium Cotton', 'ihram_mukena', 'Kain ihram dari katun 100% berkualitas tinggi, nyaman digunakan, dan mudah dirawat. Tersedia dalam berbagai ukuran standar ihram.', 'https://images.unsplash.com/photo-1556821552-5b51e8993291?auto=format&fit=crop&w=600&q=80', 1, '50 meter', '["Material: Cotton 100%","Lebar: 1.5m (standar)","Gramasi: 220 GSM","Warna: Putih, Krem"]', 'POPULER'),
('kat-ihram-02', 'Kain Ihram Katun Lembut', 'ihram_mukena', 'Kain ihram dengan tekstur lebih lembut dan halus, memberikan kenyamanan maksimal selama menjalankan ibadah umroh.', 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80', 1, '30 meter', '["Material: Katun Sutra Campuran","Lebar: 1.5m","Gramasi: 250 GSM","Warna: Putih, Krem, Abu-abu"]', NULL),
('kat-mukena-01', 'Mukena Set Komplet', 'ihram_mukena', 'Set mukena lengkap dengan dompet ihram, sarung tangan, dan sandal kain. Cocok untuk gift paket umroh.', 'https://images.unsplash.com/photo-1548690596-f1bbb7d1a5e3?auto=format&fit=crop&w=600&q=80', 1, '20 set', '["Isi: Mukena + Dompet + Sarung Tangan + Sandal","Material: Cotton + Polyester","Warna: Pilihan warna tersedia"]', 'PROMO'),
('kat-seragam-01', 'Batik Premium Pria', 'seragam', 'Batik pria dengan desain eksklusif motif Sidya, menggunakan bahan katun pilihan dengan jahitan rapih. Perfect untuk acara formal dan resepsi.', 'https://images.unsplash.com/photo-1591047990197-e59f237d9eb0?auto=format&fit=crop&w=600&q=80', 1, '10 pcs', '["Material: Katun Premium 100%","Ukuran: XS - XXXXL","Jahitan: Double stitch, berkualitas tinggi","Logo: Bisa customize dengan embroidery"]', 'EKSKLUSIF'),
('kat-seragam-02', 'Batik Premium Wanita', 'seragam', 'Batik wanita elegan dengan potongan modern dan motif ekslusif. Tersedia dalam berbagai pilihan warna dan ukuran.', 'https://images.unsplash.com/photo-1578932750294-708b20a12f93?auto=format&fit=crop&w=600&q=80', 1, '10 pcs', '["Material: Katun Premium 100%","Ukuran: XS - XXXXL","Desain: Modern dengan potongan feminim","Logo: Custom embroidery tersedia"]', NULL),
('kat-aksesoris-01', 'Gelang ID Silikon', 'aksesoris', 'Gelang ID dari silikon berkualitas food-grade dengan data nama dan kontak tercetak di atasnya. Praktis dan aman untuk perjalanan.', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80', 1, '100 pcs', '["Material: Silikon Food-grade","Ukuran: S / M / L","Warna: Pilihan 10+ warna","Custom: Nama + Nomor Telepon"]', 'BEST VALUE'),
('kat-aksesoris-02', 'Tag Koper Kulit', 'aksesoris', 'Tag koper dari kulit asli dengan design minimalis dan elegant. Dilengkapi dengan slot kartu identitas dan alamat hotel.', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80', 1, '50 pcs', '["Material: Kulit Asli","Ukuran: 10cm x 6cm","Warna: Cokelat, Hitam, Merah","Custom: Logo atau Inisial Nama"]', NULL),
('kat-paket-01', 'Paket Bundling Umroh Basic', 'paket_kbih', 'Paket bundling lengkap untuk umroh mencakup koper, kain ihram, mukena set, batik, dan gelang ID. Harga spesial untuk pembelian paket.', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80', 1, '1 paket', '["Isi: Koper + Ihram + Mukena Set + Batik + Gelang ID","Target: KBIH / Travel 20+ orang","Harga: Special bundle rate","Custom: Logo KBIH bisa ditambahkan"]', 'POPULER'),
('kat-paket-02', 'Paket Bundling Umroh Premium', 'paket_kbih', 'Paket premium dengan semua item berkualitas terbaik plus tambahan aksesoris premium seperti tag koper kulit dan dompet ihram ekstra.', 'https://images.unsplash.com/photo-1586688220869-30e7b0a43512?auto=format&fit=crop&w=600&q=80', 1, '1 paket', '["Isi: Semua item basic + Tag kulit + Dompet ekstra + Sandal premium","Target: KBIH / Travel eksklusif","Harga: Premium rate","Bonus: Packing dan shipping ke lokasi"]', 'EKSKLUSIF');
