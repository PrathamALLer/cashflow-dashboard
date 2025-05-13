import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "../components/Sidebar";
import OverviewMainSection from "../components/OverviewMainSection";
import EditUsersPlan from "../components/EditUsersPlan";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onToggle={handleSidebarToggle} />
      <div 
        className={`flex-1 transition-all duration-300 bg-[#10101a] min-h-screen ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <div className="p-4 md:p-6">
          <OverviewMainSection />
          <div className="pb-8">
            <EditUsersPlan />
          </div>
        </div>
      </div>
    </div>
  );
}
