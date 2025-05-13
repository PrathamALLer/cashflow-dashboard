import { useState, useEffect } from "react";
import { FiHome, FiUsers, FiLayers, FiSettings, FiChevronLeft, FiChevronRight, FiLogOut } from "react-icons/fi";
import Image from "next/image";

const navItems = [
  { label: "Overview", icon: <FiHome size={22} />, active: true },
  { label: "All Clients", icon: <FiUsers size={22} />, active: false },
  { label: "All Plans", icon: <FiLayers size={22} />, active: false },
];

interface SidebarProps {
  onToggle?: (collapsed: boolean) => void;
}

export default function Sidebar({ onToggle }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  // Notify parent component when collapsed state changes
  useEffect(() => {
    if (onToggle) {
      onToggle(collapsed);
    }
  }, [collapsed, onToggle]);

  const toggleCollapsed = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <aside
      className={`flex flex-col justify-between h-screen bg-[#111322] transition-all duration-300 ${collapsed ? "w-20" : "w-64"} fixed left-0 top-0 z-20`}
    >
      <div>
        {/* Logo and toggle */}
        <div className={`flex items-center justify-between ${collapsed ? 'px-3' : 'px-6'} py-6 relative`}>
          <div className={`flex items-center ${collapsed ? 'justify-center w-full' : 'gap-2'}`} style={collapsed ? {width: '100%'} : {}}>
            <div className={collapsed ? 'w-[90%] flex justify-center' : ''}>
              <Image
                src="/zugo-logo-white.png"
                alt="Zugo Logo"
                width={collapsed ? 44 : 56}
                height={collapsed ? 44 : 56}
                className="object-contain"
                style={collapsed ? { width: '90%', height: 'auto' } : {}}
                priority
              />
            </div>
          </div>
          {!collapsed ? (
            <button
              className="text-gray-400 hover:text-white transition ml-2"
              onClick={toggleCollapsed}
              aria-label="Toggle sidebar"
            >
              <FiChevronLeft size={22} />
            </button>
          ) : null}
          {collapsed ? (
            <button
              className="text-gray-400 hover:text-white transition absolute top-1/2 right-[-18px] -translate-y-1/2 bg-[#111322] rounded-full shadow-lg border border-white/10 z-30 p-1"
              onClick={toggleCollapsed}
              aria-label="Expand sidebar"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
            >
              <FiChevronRight size={22} />
            </button>
          ) : null}
        </div>
        {/* Navigation */}
        <nav className={`mt-8 flex flex-col gap-1 ${collapsed ? '' : 'px-3'}`}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg font-semibold text-white transition-colors ${
                item.active
                  ? "bg-white/10 text-white"
                  : "hover:bg-white/5 text-gray-200"
              } ${collapsed ? "justify-center px-0" : ""}`}
            >
              {item.icon}
              {!collapsed && <span className="ml-1">{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>
      <div className={`flex flex-col gap-4 mb-6 ${collapsed ? 'px-2' : 'px-5'}`}>
        {/* Settings */}
        <a
          href="#"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors bg-black text-white hover:bg-gray-900 ${collapsed ? "justify-center px-0" : ""}`}
        >
          <FiSettings size={22} />
          {!collapsed && <span>Settings</span>}
        </a>
        
        {/* User profile and logout */}
        <div className={`border-t border-white/10 pt-4 flex items-center gap-3 ${collapsed ? "flex-col border-none pt-0" : ""}`}>
          <Image
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User avatar"
            width={collapsed ? 36 : 40}
            height={collapsed ? 36 : 40}
            className="rounded-full"
          />
          {!collapsed && (
            <div className="flex-1">
              <div className="font-semibold text-white text-sm leading-tight">Olivia Rhye</div>
              <div className="text-xs text-gray-400">olivia@zugo.com</div>
            </div>
          )}
          {!collapsed && (
            <button className="ml-auto text-gray-400 hover:text-white">
              <FiLogOut size={18} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}