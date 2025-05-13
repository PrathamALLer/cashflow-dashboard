import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "../components/Sidebar";
import OverviewMainSection from "../components/OverviewMainSection";
import EditUsersPlan from "../components/EditUsersPlan";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-20 sm:ml-64 transition-all duration-300 bg-[#10101a] min-h-screen">
        <OverviewMainSection />
        <div className="px-4 pb-8">
          <EditUsersPlan />
        </div>
      </div>
    </div>
  );
}
