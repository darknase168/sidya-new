import React, { useState, useMemo } from 'react';
import { BoardMember, OrgChartNode } from '../types';
import { ChevronDown, ChevronUp, Edit, Phone, Mail, LinkedinIcon } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface OrganizationalChartProps {
  members: BoardMember[];
  onMemberClick: (member: BoardMember) => void;
}

const buildOrgTree = (members: BoardMember[]): OrgChartNode[] => {
  const memberMap = new Map<string, OrgChartNode>();
  
  // Initialize all nodes
  members.forEach(member => {
    memberMap.set(member.id, {
      ...member,
      children: []
    });
  });

  // Build tree hierarchy
  const roots: OrgChartNode[] = [];
  memberMap.forEach((node) => {
    if (!node.parentId) {
      roots.push(node);
    } else {
      const parent = memberMap.get(node.parentId);
      if (parent) {
        parent.children.push(node);
      }
    }
  });

  // Sort by order
  const sortByOrder = (nodes: OrgChartNode[]) => {
    nodes.sort((a, b) => a.order - b.order);
    nodes.forEach(node => sortByOrder(node.children));
  };
  
  roots.sort((a, b) => a.order - b.order);
  roots.forEach(root => sortByOrder(root.children));

  return roots;
};

interface NodeRendererProps {
  node: OrgChartNode;
  onMemberClick: (member: BoardMember) => void;
  isEditMode: boolean;
}

const NodeRenderer: React.FC<NodeRendererProps> = ({ node, onMemberClick, isEditMode }) => {
  return (
    <div
      onClick={() => onMemberClick(node)}
      className="cursor-pointer group relative flex flex-col items-center"
    >
      {/* Foto lebih besar */}
      <div className={`
        relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden
        ring-[6px] ring-offset-4 transition-all duration-300 shadow-lg
        ${node.level === 0 ? 'ring-red-500' : 
          node.level === 1 ? 'ring-amber-500' :
          'ring-teal-500'}
        hover:shadow-2xl hover:scale-110
      `}>
        <img
          src={node.photo}
          alt={node.name}
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
          }}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <p className="text-white text-sm font-bold text-center line-clamp-3">
            {node.name}
          </p>
        </div>
      </div>

      {/* Badge dengan text lebih besar */}
      <div className={`
        mt-3 px-4 py-2 rounded-full text-center text-xs lg:text-sm font-bold whitespace-nowrap text-white max-w-[200px]
        ${node.level === 0 ? 'bg-red-500' : 
          node.level === 1 ? 'bg-amber-500' :
          'bg-teal-500'}
      `}>
        <div className="line-clamp-2 text-xs lg:text-sm leading-tight font-semibold">
          {node.title}
        </div>
      </div>
    </div>
  );
};

export const OrganizationalChart: React.FC<OrganizationalChartProps> = ({
  members,
  onMemberClick
}) => {
  const { isEditMode } = useCms();
  
  const orgTree = useMemo(() => {
    const membersWithLevels = members.map((m) => ({
      ...m,
      level: m.level ?? 0
    }));
    return buildOrgTree(membersWithLevels);
  }, [members]);

  if (members.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        Belum ada data jajaran pengurus
      </div>
    );
  }

  return (
    <div className="w-full bg-white py-12 overflow-x-auto">
      <div className="inline-flex flex-col items-center gap-24 px-8 min-w-full">
        {/* CEO Level */}
        {orgTree.map((root) => (
          <div key={root.id} className="flex flex-col items-center gap-24 w-full">
            {/* Level 0 - CEO/Komisaris (Center) */}
            <div className="flex justify-center">
              <NodeRenderer
                node={root}
                onMemberClick={onMemberClick}
                isEditMode={isEditMode}
              />
            </div>

            {/* Connector: Vertical line down + horizontal line + directors */}
            {root.children.length > 0 && (
              <svg 
                className="w-full h-96" 
                style={{ 
                  minHeight: '400px',
                  viewBox: '0 0 1200 400',
                  preserveAspectRatio: 'none'
                }}
              >
                {/* Vertical line from CEO down */}
                <line x1="600" y1="0" x2="600" y2="60" stroke="#9ca3af" strokeWidth="3" />
                
                {/* Horizontal line connecting directors */}
                {root.children.length > 1 && (
                  <line 
                    x1={150} 
                    y1="60" 
                    x2={1050} 
                    y2="60" 
                    stroke="#9ca3af" 
                    strokeWidth="3" 
                  />
                )}
                
                {/* Vertical lines from horizontal to each director */}
                {root.children.map((_, idx) => {
                  const x = 150 + (900 / (root.children.length - 1 || 1)) * idx;
                  return (
                    <line 
                      key={`dir-${idx}`}
                      x1={x} 
                      y1="60" 
                      x2={x} 
                      y2="120" 
                      stroke="#9ca3af" 
                      strokeWidth="3" 
                    />
                  );
                })}
              </svg>
            )}

            {/* Level 1 - Directors (Horizontal) */}
            {root.children.length > 0 && (
              <div className="flex items-start justify-center gap-24 flex-wrap w-full px-8">
                {root.children.map((director, dirIdx) => (
                  <div key={director.id} className="flex flex-col items-center gap-20">
                    {/* Director Node */}
                    <NodeRenderer
                      node={director}
                      onMemberClick={onMemberClick}
                      isEditMode={isEditMode}
                    />

                    {/* Staff under this director */}
                    {director.children.length > 0 && (
                      <svg 
                        className="w-full" 
                        style={{ 
                          minWidth: `${director.children.length * 180}px`,
                          height: '280px',
                          viewBox: `0 0 ${director.children.length * 200} 280`,
                          preserveAspectRatio: 'none'
                        }}
                      >
                        {/* Vertical line from director down */}
                        <line 
                          x1={director.children.length * 100} 
                          y1="0" 
                          x2={director.children.length * 100} 
                          y2="40" 
                          stroke="#d1d5db" 
                          strokeWidth="2" 
                        />
                        
                        {/* Horizontal line for staff */}
                        {director.children.length > 1 && (
                          <line 
                            x1="50" 
                            y1="40" 
                            x2={director.children.length * 200 - 50} 
                            y2="40" 
                            stroke="#d1d5db" 
                            strokeWidth="2" 
                          />
                        )}
                        
                        {/* Vertical lines from horizontal to each staff */}
                        {director.children.map((_, staffIdx) => {
                          const x = 50 + ((director.children.length * 200 - 100) / (director.children.length - 1 || 1)) * staffIdx;
                          return (
                            <line 
                              key={`staff-${staffIdx}`}
                              x1={x} 
                              y1="40" 
                              x2={x} 
                              y2="90" 
                              stroke="#d1d5db" 
                              strokeWidth="2" 
                            />
                          );
                        })}
                      </svg>
                    )}

                    {/* Staff nodes under this director */}
                    {director.children.length > 0 && (
                      <div className="flex items-start justify-center gap-16 flex-wrap">
                        {director.children.map((staff) => (
                          <NodeRenderer
                            key={staff.id}
                            node={staff}
                            onMemberClick={onMemberClick}
                            isEditMode={isEditMode}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Member Profile Modal that stays visible
interface MemberProfileModalProps {
  member: BoardMember | null;
  onClose: () => void;
  onEdit: () => void;
}

export const MemberProfileModal: React.FC<MemberProfileModalProps> = ({
  member,
  onClose,
  onEdit
}) => {
  if (!member) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 w-96 max-w-[calc(100vw-2rem)] animate-slide-up">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header with photo */}
        <div className="relative h-32 bg-gradient-to-r from-emerald-600 to-emerald-700">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-white rounded-lg text-slate-600"
          >
            ✕
          </button>
        </div>

        {/* Photo */}
        <div className="px-6 -mt-16 relative z-10 mb-4">
          <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg">
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {member.name}
            </h3>
            <p className="text-sm font-semibold text-emerald-700">
              {member.title}
            </p>
            {member.department && (
              <p className="text-xs text-slate-500 mt-1">
                {member.department}
              </p>
            )}
          </div>

          {/* Bio */}
          {member.bio && (
            <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
              {member.bio}
            </p>
          )}

          {/* Contact Info */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-2 text-xs text-slate-700 hover:text-emerald-700 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate">{member.email}</span>
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-slate-700 hover:text-emerald-700 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>View LinkedIn</span>
              </a>
            )}
          </div>

          {/* Edit Button */}
          <button
            onClick={onEdit}
            className="w-full mt-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Edit className="w-3.5 h-3.5" />
            Edit Profil
          </button>
        </div>
      </div>
    </div>
  );
};
