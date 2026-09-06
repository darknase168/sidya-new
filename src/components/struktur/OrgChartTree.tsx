import React from 'react';
import { EmployeeNode, ViewMode } from '../../types';
import { OrgNodeCard } from './OrgNodeCard';

interface OrgChartTreeProps {
  nodes: EmployeeNode[];
  viewMode: ViewMode;
  selectedNodeId?: string | null;
  highlightedIds?: string[];
  onSelectNode: (node: EmployeeNode) => void;
}

export const OrgChartTree: React.FC<OrgChartTreeProps> = ({
  nodes,
  viewMode,
  selectedNodeId,
  highlightedIds = [],
  onSelectNode,
}) => {
  // Helper to get node by id
  const getNode = (id: string) => nodes.find((n) => n.id === id);

  const ceo = getNode('ceo');
  const mgr1 = getNode('mgr-1');
  const mgr2 = getNode('mgr-2');
  const frmA = getNode('frm-a');
  const frmB = getNode('frm-b');
  const slsA = getNode('sls-a');
  const slsB = getNode('sls-b');
  const wrk1 = getNode('wrk-1');
  const wrk2 = getNode('wrk-2');
  const wrk3 = getNode('wrk-3');
  const wrk4 = getNode('wrk-4');
  const slr1 = getNode('slr-1');
  const slr2 = getNode('slr-2');

  if (!ceo) return null;

  return (
    <div className="relative w-full min-w-[940px] max-w-6xl mx-auto flex flex-col items-center py-6 px-4">
      {/* ================= LEVEL 1: CEO ================= */}
      <div className="relative flex flex-col items-center z-20">
        <OrgNodeCard
          node={ceo}
          viewMode={viewMode}
          isSelected={selectedNodeId === ceo.id}
          isHighlighted={highlightedIds.includes(ceo.id)}
          onClick={onSelectNode}
        />

        {/* Orthogonal connector line going down and branching to Level 2 Managers */}
        <div className="w-[1px] h-8 border-l-2 border-dashed border-slate-400" />
      </div>

      {/* Horizontal Branch from CEO to Manager 1 & Manager 2 */}
      <div className="relative w-[560px] flex justify-between items-start -mt-[1px]">
        {/* Horizontal Line connecting managers */}
        <div className="absolute top-0 left-0 right-0 h-[1px] border-t-2 border-dashed border-slate-400" />

        {/* Left Drop to Manager 1 */}
        <div className="flex flex-col items-center">
          <div className="w-[1px] h-8 border-l-2 border-dashed border-slate-400" />
        </div>

        {/* Right Drop to Manager 2 */}
        <div className="flex flex-col items-center">
          <div className="w-[1px] h-8 border-l-2 border-dashed border-slate-400" />
        </div>
      </div>

      {/* ================= LEVEL 2: MANAGERS (2 COLUMNS) ================= */}
      <div className="w-full flex justify-between items-start gap-12 sm:gap-20 z-20">
        {/* ===== LEFT SUBTREE: MANAGER 1 (OPERATIONS) ===== */}
        <div className="flex-1 flex flex-col items-center">
          {mgr1 && (
            <div className="flex flex-col items-center">
              <OrgNodeCard
                node={mgr1}
                viewMode={viewMode}
                isSelected={selectedNodeId === mgr1.id}
                isHighlighted={highlightedIds.includes(mgr1.id)}
                onClick={onSelectNode}
              />
              {/* Connector line down from Manager 1 to Foremen */}
              <div className="w-[1px] h-8 border-l-2 border-dashed border-slate-400" />
            </div>
          )}

          {/* Horizontal crossbar for Foreman A & Foreman B */}
          <div className="relative w-[270px] sm:w-[310px] flex justify-between items-start -mt-[1px]">
            <div className="absolute top-0 left-0 right-0 h-[1px] border-t-2 border-dashed border-slate-400" />
            <div className="w-[1px] h-8 border-l-2 border-dashed border-slate-400" />
            <div className="w-[1px] h-8 border-l-2 border-dashed border-slate-400" />
          </div>

          {/* ===== LEVEL 3: FOREMAN A & FOREMAN B ===== */}
          <div className="w-full flex justify-between items-start gap-6 sm:gap-10">
            {/* Foreman A Branch */}
            <div className="flex-1 flex flex-col items-center">
              {frmA && (
                <div className="flex flex-col items-center">
                  <OrgNodeCard
                    node={frmA}
                    viewMode={viewMode}
                    isSelected={selectedNodeId === frmA.id}
                    isHighlighted={highlightedIds.includes(frmA.id)}
                    onClick={onSelectNode}
                  />
                  {/* Stem down to Worker 1 & 2 */}
                  <div className="w-[1px] h-8 border-l-2 border-dashed border-slate-400" />
                </div>
              )}

              {/* Crossbar for Worker 1 & 2 */}
              <div className="relative w-[130px] sm:w-[150px] flex justify-between items-start -mt-[1px]">
                <div className="absolute top-0 left-0 right-0 h-[1px] border-t-2 border-dashed border-slate-400" />
                <div className="w-[1px] h-8 border-l-2 border-dashed border-slate-400" />
                <div className="w-[1px] h-8 border-l-2 border-dashed border-slate-400" />
              </div>

              {/* Level 4: Worker 1 & Worker 2 */}
              <div className="flex justify-center gap-3 sm:gap-5 mt-1">
                {wrk1 && (
                  <OrgNodeCard
                    node={wrk1}
                    viewMode={viewMode}
                    isSelected={selectedNodeId === wrk1.id}
                    isHighlighted={highlightedIds.includes(wrk1.id)}
                    onClick={onSelectNode}
                  />
                )}
                {wrk2 && (
                  <OrgNodeCard
                    node={wrk2}
                    viewMode={viewMode}
                    isSelected={selectedNodeId === wrk2.id}
                    isHighlighted={highlightedIds.includes(wrk2.id)}
                    onClick={onSelectNode}
                  />
                )}
              </div>
            </div>

            {/* Foreman B Branch */}
            <div className="flex-1 flex flex-col items-center">
              {frmB && (
                <div className="flex flex-col items-center">
                  <OrgNodeCard
                    node={frmB}
                    viewMode={viewMode}
                    isSelected={selectedNodeId === frmB.id}
                    isHighlighted={highlightedIds.includes(frmB.id)}
                    onClick={onSelectNode}
                  />
                  {/* Stem down to Worker 3 & 4 */}
                  <div className="w-[1px] h-8 border-l-2 border-dashed border-slate-400" />
                </div>
              )}

              {/* Crossbar for Worker 3 & 4 */}
              <div className="relative w-[130px] sm:w-[150px] flex justify-between items-start -mt-[1px]">
                <div className="absolute top-0 left-0 right-0 h-[1px] border-t-2 border-dashed border-slate-400" />
                <div className="w-[1px] h-8 border-l-2 border-dashed border-slate-400" />
                <div className="w-[1px] h-8 border-l-2 border-dashed border-slate-400" />
              </div>

              {/* Level 4: Worker 3 & Worker 4 */}
              <div className="flex justify-center gap-3 sm:gap-5 mt-1">
                {wrk3 && (
                  <OrgNodeCard
                    node={wrk3}
                    viewMode={viewMode}
                    isSelected={selectedNodeId === wrk3.id}
                    isHighlighted={highlightedIds.includes(wrk3.id)}
                    onClick={onSelectNode}
                  />
                )}
                {wrk4 && (
                  <OrgNodeCard
                    node={wrk4}
                    viewMode={viewMode}
                    isSelected={selectedNodeId === wrk4.id}
                    isHighlighted={highlightedIds.includes(wrk4.id)}
                    onClick={onSelectNode}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===== RIGHT SUBTREE: MANAGER 2 (SALES & MARKETING) ===== */}
        <div className="flex-1 flex flex-col items-center">
          {mgr2 && (
            <div className="flex flex-col items-center">
              <OrgNodeCard
                node={mgr2}
                viewMode={viewMode}
                isSelected={selectedNodeId === mgr2.id}
                isHighlighted={highlightedIds.includes(mgr2.id)}
                onClick={onSelectNode}
              />
              {/* Connector line down from Manager 2 to Sales Officers */}
              <div className="w-[1px] h-8 border-l-2 border-dashed border-slate-400" />
            </div>
          )}

          {/* Horizontal crossbar for Sales Officer A & Sales Officer B */}
          <div className="relative w-[270px] sm:w-[310px] flex justify-between items-start -mt-[1px]">
            <div className="absolute top-0 left-0 right-0 h-[1px] border-t-2 border-dashed border-slate-400" />
            <div className="w-[1px] h-8 border-l-2 border-dashed border-slate-400" />
            <div className="w-[1px] h-8 border-l-2 border-dashed border-slate-400" />
          </div>

          {/* ===== LEVEL 3: SALES OFFICER A & SALES OFFICER B ===== */}
          <div className="w-full flex justify-between items-start gap-6 sm:gap-10">
            {/* Sales Officer A Branch */}
            <div className="flex-1 flex flex-col items-center">
              {slsA && (
                <div className="flex flex-col items-center">
                  <OrgNodeCard
                    node={slsA}
                    viewMode={viewMode}
                    isSelected={selectedNodeId === slsA.id}
                    isHighlighted={highlightedIds.includes(slsA.id)}
                    onClick={onSelectNode}
                  />
                  {/* Straight vertical dashed line down to Saler 1 (as in image) */}
                  <div className="w-[1px] h-9 border-l-2 border-dashed border-slate-400" />
                </div>
              )}

              {/* Level 4: Saler 1 */}
              <div className="flex justify-center mt-1">
                {slr1 && (
                  <OrgNodeCard
                    node={slr1}
                    viewMode={viewMode}
                    isSelected={selectedNodeId === slr1.id}
                    isHighlighted={highlightedIds.includes(slr1.id)}
                    onClick={onSelectNode}
                  />
                )}
              </div>
            </div>

            {/* Sales Officer B Branch */}
            <div className="flex-1 flex flex-col items-center">
              {slsB && (
                <div className="flex flex-col items-center">
                  <OrgNodeCard
                    node={slsB}
                    viewMode={viewMode}
                    isSelected={selectedNodeId === slsB.id}
                    isHighlighted={highlightedIds.includes(slsB.id)}
                    onClick={onSelectNode}
                  />
                  {/* Straight vertical dashed line down to Saler 2 (as in image) */}
                  <div className="w-[1px] h-9 border-l-2 border-dashed border-slate-400" />
                </div>
              )}

              {/* Level 4: Saler 2 */}
              <div className="flex justify-center mt-1">
                {slr2 && (
                  <OrgNodeCard
                    node={slr2}
                    viewMode={viewMode}
                    isSelected={selectedNodeId === slr2.id}
                    isHighlighted={highlightedIds.includes(slr2.id)}
                    onClick={onSelectNode}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
