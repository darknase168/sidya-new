import React, { useState, useMemo } from 'react';
import { EmployeeNode, ViewMode, FilterDepartment } from '../types';
import { INITIAL_ORG_DATA } from '../data/orgData';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/struktur/Header';
import { OrgChartTree } from '../components/struktur/OrgChartTree';
import { MemberDetailModal } from '../components/struktur/MemberDetailModal';

export default function PengurusPage() {
  const { isLoggedIn } = useAuth();
  const [nodes, setNodes] = useState<EmployeeNode[]>(() => {
    try {
      const saved = localStorage.getItem('org_chart_nodes_data_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading saved nodes', e);
    }
    return INITIAL_ORG_DATA;
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('org_chart_nodes_data_v2', JSON.stringify(nodes));
    } catch (e) {
      console.error('Error saving nodes', e);
    }
  }, [nodes]);

  const [viewMode, setViewMode] = useState<ViewMode>('image-literal');
  const [companyName, setCompanyName] = useState('PT Sidya Sadaya Sejahtera');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState<FilterDepartment>('all');
  const [activeTheme, setActiveTheme] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<EmployeeNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);

  // Filtered / Highlighted Nodes calculation
  const highlightedIds = useMemo(() => {
    let list = nodes;

    // Filter by department
    if (filterDept === 'executive') {
      list = list.filter((n) => n.department === 'Eksekutif');
    } else if (filterDept === 'management') {
      list = list.filter((n) => n.level === 2);
    } else if (filterDept === 'operations') {
      list = list.filter((n) => n.department === 'Operasional');
    } else if (filterDept === 'sales') {
      list = list.filter((n) => n.department.includes('Penjualan') || n.department.includes('Pemasaran'));
    }

    // Filter by color theme from legend
    if (activeTheme) {
      list = list.filter((n) => n.colorTheme === activeTheme);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (n) =>
          n.placeholderName.toLowerCase().includes(q) ||
          n.realisticName.toLowerCase().includes(q) ||
          n.roleLabel.toLowerCase().includes(q) ||
          n.officialTitle.toLowerCase().includes(q) ||
          n.code.toLowerCase().includes(q) ||
          n.department.toLowerCase().includes(q)
      );
    }

    return list.map((n) => n.id);
  }, [nodes, filterDept, activeTheme, searchQuery]);

  const handleUpdateNode = (updatedNode: EmployeeNode) => {
    setNodes((prev) => prev.map((n) => (n.id === updatedNode.id ? updatedNode : n)));
    setSelectedNode(updatedNode);
  };

  const handleResetData = () => {
    if (window.confirm('Kembalikan semua data ke versi default bagan diagram?')) {
      try {
        localStorage.removeItem('org_chart_nodes_data_v2');
      } catch {
        // ignore
      }
      setNodes(INITIAL_ORG_DATA);
      setSearchQuery('');
      setFilterDept('all');
      setActiveTheme(null);
      setZoomLevel(1);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header */}
      <Header
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterDept={filterDept}
        onFilterDeptChange={setFilterDept}
        zoomLevel={zoomLevel}
        onZoomIn={() => setZoomLevel((z) => Math.min(1.5, Math.round((z + 0.1) * 10) / 10))}
        onZoomOut={() => setZoomLevel((z) => Math.max(0.6, Math.round((z - 0.1) * 10) / 10))}
        onResetZoom={() => setZoomLevel(1)}
        onPrint={handlePrint}
        totalMembers={nodes.length}
        companyName={companyName}
        onUpdateCompanyName={setCompanyName}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col">

        {/* Legend Bar for Color Codes */}
        {/* Hidden - Legend removed per user request */}

        {/* Visual Chart Canvas */}
        <div
          ref={containerRef}
          id="chart-viewport"
          className="relative flex-1 min-h-[640px] bg-radial from-slate-50/70 via-white to-slate-100/50 rounded-3xl border border-slate-200/90 shadow-xs p-4 sm:p-8 overflow-x-auto overflow-y-auto"
        >
          {/* Subtle Grid Dot Pattern Background for visual polish */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.25]"
            style={{
              backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Interactive Scalable Tree */}
          <div
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s ease-out',
            }}
            className="w-full flex justify-center"
          >
            <OrgChartTree
              nodes={nodes}
              viewMode={viewMode}
              selectedNodeId={selectedNode?.id}
              highlightedIds={highlightedIds}
              onSelectNode={setSelectedNode}
            />
          </div>

          {/* Zoom hint badge at bottom right */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/80 text-[11px] font-medium text-slate-500 shadow-xs select-none pointer-events-none">
            Klik anggota untuk membuka detail & edit
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200/80 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">{companyName}</span>
            <span>•</span>
            <span>Sistem Tata Kelola & Struktur Organisasi Perusahaan</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode((m) => (m === 'image-literal' ? 'realistic' : 'image-literal'))}
              className="hover:text-indigo-600 transition-colors"
            >
              Mode: {viewMode === 'image-literal' ? 'Sesuai Gambar (NAME LASTNAME)' : 'Nama Riil Karyawan'}
            </button>
            <span>•</span>
            <button onClick={handlePrint} className="hover:text-indigo-600 transition-colors">
              Cetak Bagan
            </button>
          </div>
        </div>
      </footer>

      {/* Member Detail & Edit Modal */}
      {selectedNode && (
        <MemberDetailModal
          node={selectedNode}
          allNodes={nodes}
          viewMode={viewMode}
          onClose={() => setSelectedNode(null)}
          onSelectNode={(node) => setSelectedNode(node)}
          onUpdateNode={handleUpdateNode}
        />
      )}
    </div>
  );
}
