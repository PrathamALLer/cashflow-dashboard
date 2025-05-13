import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

export default function CollapsibleSection({ 
  title, 
  children, 
  defaultCollapsed = true 
}: CollapsibleSectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className="bg-[#18101c] rounded-2xl p-6 shadow-lg border border-[#2a2236]">
      <div 
        className="flex items-center justify-between cursor-pointer mb-4"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h2 className="text-white text-xl font-semibold">{title}</h2>
        <div className="text-white">
          {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
        </div>
      </div>
      {!isCollapsed && (
        <div className="transition-all duration-300 ease-in-out">
          {children}
        </div>
      )}
    </div>
  );
} 