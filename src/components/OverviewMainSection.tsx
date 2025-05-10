import Image from "next/image";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FaCalendarAlt, FaBell, FaPoundSign, FaChartBar, FaPiggyBank } from "react-icons/fa";
import type { JSX as ReactJSX } from 'react';

const user = {
  name: "Jhon Doe",
  profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
  currentAge: 25,
  retirementAge: 55,
  monthlySurplus: 2218,
  financialIndependence: 70,
  incomeDuringRetirement: 80000,
  currentSavings: 72000,
};

const planStatus = {
  onTrack: true,
  retireAge: 50,
  portfolio: "£2,887,789",
  annualIncome: "£65,260",
  legacy: "£4,538,003.209",
};

const chartData = [
  { age: 25, Total: 40, ISA: 30, Pension: 20, GIA: 10 },
  { age: 30, Total: 45, ISA: 32, Pension: 22, GIA: 12 },
  { age: 35, Total: 50, ISA: 35, Pension: 25, GIA: 15 },
  { age: 40, Total: 55, ISA: 38, Pension: 28, GIA: 18 },
  { age: 45, Total: 60, ISA: 40, Pension: 30, GIA: 20 },
  { age: 50, Total: 70, ISA: 50, Pension: 40, GIA: 25 },
  { age: 55, Total: 80, ISA: 60, Pension: 50, GIA: 30 },
  { age: 60, Total: 90, ISA: 70, Pension: 60, GIA: 35 },
  { age: 65, Total: 100, ISA: 80, Pension: 70, GIA: 40 },
  { age: 70, Total: 110, ISA: 90, Pension: 80, GIA: 45 },
  { age: 75, Total: 120, ISA: 100, Pension: 90, GIA: 50 },
];

const infoCards = [
  {
    label: "Current Age",
    value: `${user.currentAge} years`,
    icon: <Image src="/calendar-icon.png" alt="Calendar" width={24} height={24} />,
  },
  {
    label: "Target Retirement Age",
    value: `${user.retirementAge} years`,
    icon: <Image src="/rocket-icon.png" alt="Rocket" width={24} height={24} />,
  },
  {
    label: "Monthly Surplus",
    value: `£${user.monthlySurplus.toLocaleString()}`,
    icon: <Image src="/pound-icon.png" alt="Pound" width={24} height={24} />,
  },
  {
    label: "Financial Independence",
    value: user.financialIndependence,
    icon: <Image src="/bar-chart-icon.png" alt="Bar Chart" width={24} height={24} />,
  },
  {
    label: "Income During Retirement",
    value: `£${user.incomeDuringRetirement.toLocaleString()}`,
    icon: <Image src="/pound-icon.png" alt="Pound" width={24} height={24} />,
  },
  {
    label: "Current Savings",
    value: `£${user.currentSavings.toLocaleString()}`,
    icon: <Image src="/pound-icon.png" alt="Pound" width={24} height={24} />,
  },
];

type InfoCard = {
  label: string;
  value: string | number;
  icon: ReactJSX.Element;
};

type User = typeof user;
type PlanStatus = typeof planStatus;
type ChartDatum = typeof chartData[number];

function UserDetailsCard({ user, infoCards }: { user: User; infoCards: InfoCard[] }) {
  return (
    <div className="col-span-2 bg-[#310312] rounded-2xl p-6 flex flex-col gap-4 shadow-lg border border-[#2a2236]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Image src={user.profilePic} alt="User" width={40} height={40} className="rounded-full border-2 border-pink-500" />
          <span className="text-base font-semibold text-white">{user.name}</span>
        </div>
        <button
          className="text-white font-semibold px-5 py-2 rounded-lg text-sm flex items-center gap-2 shadow-md transition border-0"
          style={{ background: 'linear-gradient(140deg, #ec4899 0%, #db2777 100%)' }}
        >
          <Image src="/pencil-edit-icon.png" alt="Pencil" width={18} height={18} className="inline-block mr-1" />
          Customize Financial Plan
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {infoCards.map((card: InfoCard, idx: number) => (
          <div
            key={idx}
            className="bg-[#62092B] rounded-2xl shadow-md flex flex-col justify-between"
            style={{ width: '190px', height: '95px', padding: '14px 18px' }}
          >
            <div className="text-pink-100 mb-1" style={{ fontSize: '12px', fontWeight: 400 }}>{card.label}</div>
            <div className="flex flex-row items-center gap-2 mt-1">
              <span className="text-pink-200 text-2xl flex items-center" style={{ color: '#FF3F8A' }}>{card.icon}</span>
              <span className="text-white font-bold ml-2" style={{ fontSize: '24px', fontWeight: 400 }}>{card.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlanStatusCard({ planStatus }: { planStatus: PlanStatus }) {
  return (
    <div className="col-span-3 bg-[#310312] rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg border border-[#2a2236] min-h-[180px]">
      <div className="relative flex items-center justify-center mb-2" style={{ minHeight: 80 }}>
        <div
          className="absolute"
          style={{
            width: 220,
            height: 220,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(34,197,94,0.35) 0%, rgba(34,197,94,0.15) 60%, transparent 100%)',
            filter: 'blur(24px)',
            borderRadius: '50%',
            zIndex: 0,
          }}
        />
        <Image src="/3d-icon-check-mark.png" alt="Plan on track" width={64} height={64} className="relative z-10" />
      </div>
      <div className="text-green-400 font-bold text-lg mb-1">Plan on track!</div>
      <div className="text-white text-sm text-center mb-1">
        You can retire at age <span className="font-bold text-green-400">{planStatus.retireAge}</span> with a portfolio of <span className="font-bold">{planStatus.portfolio}</span>, your estimated annual income will be <span className="font-bold">{planStatus.annualIncome}</span>.
      </div>
      <div className="text-green-300 text-xs text-center">
        Estimated legacy: <span className="font-bold">{planStatus.legacy}</span> at age {planStatus.retireAge}
      </div>
    </div>
  );
}

function ChartSection({ tab, setTab, chartData }: { tab: string; setTab: (tab: string) => void; chartData: ChartDatum[] }) {
  return (
    <div className="bg-[#18101c] rounded-2xl p-6 shadow-lg border border-[#2a2236] flex flex-col gap-4">
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${tab === "portfolio" ? "bg-pink-500 text-white" : "bg-[#2a2236] text-gray-300 hover:bg-pink-900/30"}`}
          onClick={() => setTab("portfolio")}
        >
          Portfolio Growth
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${tab === "moneyflow" ? "bg-pink-500 text-white" : "bg-[#2a2236] text-gray-300 hover:bg-pink-900/30"}`}
          onClick={() => setTab("moneyflow")}
        >
          Money Flow
        </button>
      </div>
      {tab === "portfolio" ? (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="age" stroke="#fff" tick={{ fontSize: 12 }} />
            <YAxis stroke="#fff" tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ background: '#2a2236', border: 'none', color: '#fff' }} labelStyle={{ color: '#fff' }} />
            <Legend wrapperStyle={{ color: '#fff' }} />
            <Line type="monotone" dataKey="Total" stroke="#f472b6" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="ISA" stroke="#818cf8" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Pension" stroke="#34d399" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="GIA" stroke="#fbbf24" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-white text-lg font-semibold text-center py-20">Money Flow Graph (Coming Soon)</div>
      )}
    </div>
  );
}

export default function OverviewMainSection() {
  const [tab, setTab] = useState("portfolio");

  return (
    <div className="flex flex-col gap-6 w-full p-2 sm:p-3 md:p-4">
      {/* Top Section */}
      <div className="grid grid-cols-5 gap-4 md:gap-6">
        <UserDetailsCard user={user} infoCards={infoCards} />
        <PlanStatusCard planStatus={planStatus} />
      </div>
      <ChartSection tab={tab} setTab={setTab} chartData={chartData} />
    </div>
  );
} 