import Image from "next/image";
import { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  AreaChart, 
  Area, 
  CartesianGrid,
  ReferenceLine
} from "recharts";
import { FaCalendarAlt, FaBell, FaPoundSign, FaChartBar, FaPiggyBank } from "react-icons/fa";
import type { JSX as ReactJSX } from 'react';
import CollapsibleSection from './CollapsibleSection';
import FinancialDataTable from './FinancialDataTable';

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
  { age: 25, Total: 46250, ISA: 46250, Pension: 0, GIA: 0 },
  { age: 30, Total: 150000, ISA: 80000, Pension: 50000, GIA: 20000 },
  { age: 35, Total: 300000, ISA: 140000, Pension: 130000, GIA: 30000 },
  { age: 40, Total: 500000, ISA: 200000, Pension: 250000, GIA: 50000 },
  { age: 45, Total: 800000, ISA: 280000, Pension: 460000, GIA: 60000 },
  { age: 50, Total: 1200000, ISA: 380000, Pension: 720000, GIA: 100000 },
  { age: 55, Total: 1600000, ISA: 480000, Pension: 1000000, GIA: 120000 },
  { age: 60, Total: 2200000, ISA: 580000, Pension: 1500000, GIA: 120000 },
  { age: 65, Total: 2800000, ISA: 680000, Pension: 2000000, GIA: 120000 },
  { age: 70, Total: 3200000, ISA: 780000, Pension: 2300000, GIA: 120000 },
  { age: 75, Total: 3600000, ISA: 880000, Pension: 2600000, GIA: 120000 },
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

// Add this mock data for the financial table
const mockFinancialData = [
  {
    age: 25,
    starting_value: 72000,
    pension_starting_value: 40000,
    isa_starting_value: 20000,
    gia_starting_value: 12000,
    total_money_out: 0,
    isa_money_out: 0,
    pension_money_out: 0,
    gia_money_out: 0,
    general_growth: 3600,
    pension_confirmed_money_in: 12000,
    total_accumulation_money_in: 24000,
    isa_contribution: 8000,
    isa_ending_value: 28000,
    pension_money_in: 12000,
    pension_ending_value: 52000,
    gia_contribution: 4000,
    gia_ending_value: 16000,
    decumulation_achieved_successfully: true,
    total_ending_value: 96000,
  },
  {
    age: 25,
    starting_value: 72000,
    pension_starting_value: 40000,
    isa_starting_value: 20000,
    gia_starting_value: 12000,
    total_money_out: 0,
    isa_money_out: 0,
    pension_money_out: 0,
    gia_money_out: 0,
    general_growth: 3600,
    pension_confirmed_money_in: 12000,
    total_accumulation_money_in: 24000,
    isa_contribution: 8000,
    isa_ending_value: 28000,
    pension_money_in: 12000,
    pension_ending_value: 52000,
    gia_contribution: 4000,
    gia_ending_value: 16000,
    decumulation_achieved_successfully: true,
    total_ending_value: 96000,
  },
  {
    age: 25,
    starting_value: 72000,
    pension_starting_value: 40000,
    isa_starting_value: 20000,
    gia_starting_value: 12000,
    total_money_out: 0,
    isa_money_out: 0,
    pension_money_out: 0,
    gia_money_out: 0,
    general_growth: 3600,
    pension_confirmed_money_in: 12000,
    total_accumulation_money_in: 24000,
    isa_contribution: 8000,
    isa_ending_value: 28000,
    pension_money_in: 12000,
    pension_ending_value: 52000,
    gia_contribution: 4000,
    gia_ending_value: 16000,
    decumulation_achieved_successfully: true,
    total_ending_value: 96000,
  },
  {
    age: 25,
    starting_value: 72000,
    pension_starting_value: 40000,
    isa_starting_value: 20000,
    gia_starting_value: 12000,
    total_money_out: 0,
    isa_money_out: 0,
    pension_money_out: 0,
    gia_money_out: 0,
    general_growth: 3600,
    pension_confirmed_money_in: 12000,
    total_accumulation_money_in: 24000,
    isa_contribution: 8000,
    isa_ending_value: 28000,
    pension_money_in: 12000,
    pension_ending_value: 52000,
    gia_contribution: 4000,
    gia_ending_value: 16000,
    decumulation_achieved_successfully: true,
    total_ending_value: 96000,
  },
  // Add more mock data as needed
];

const defaultVisibleColumns = [
  'age',
  'starting_value',
  'total_money_out',
  'total_accumulation_money_in',
  'total_ending_value',
  'decumulation_achieved_successfully'
];

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

function PlanOptimisationSection() {
  const optimisations = [
    {
      title: "Reduce Non-Essential Spending",
      icon: "/pencil-edit-icon.png",
      button: "Apply",
      description: "Update Monthly Non-Essential Expenses from £5,000 to £3,500 read more",
      value: "5,000",
      valueLabel: "Cash Flow Change",
      valueChange: "+£1,500/month",
      valueChangeColor: "text-green-400",
      infoLabel: "Savings Increase",
      info: "Significant increase due to compounded returns over time.",
      infoColor: "text-green-300",
      valueBoxColor: "border-pink-400",
      headerColor: "bg-[#2a2236] border-pink-400",
      headerTextColor: "text-white",
      iconBg: "bg-pink-500",
    },
    {
      title: "Increase Pension Contributions",
      icon: "/pencil-edit-icon.png",
      button: "Apply",
      description: "Update Net Annual Pension Contribution from £7,000 to £17,000 read more",
      value: "7,000",
      valueLabel: "Cash Flow Change",
      valueChange: "Potentially negative in the short term due to reduced take-home pay, but highly positive in the long term.",
      valueChangeColor: "text-red-400",
      infoLabel: "",
      info: "",
      infoColor: "",
      valueBoxColor: "border-pink-400",
      headerColor: "bg-[#2a2236] border-pink-400",
      headerTextColor: "text-white",
      iconBg: "bg-pink-500",
    },
    {
      title: "Reduce Non-Essential Spending",
      icon: "/pencil-edit-icon.png",
      button: "Apply",
      description: "Update Monthly Non-Essential Expenses from £5,000 to £3,500 read more",
      value: "5,000",
      valueLabel: "Cash Flow Change",
      valueChange: "+£1,500/month",
      valueChangeColor: "text-green-400",
      infoLabel: "Savings Increase",
      info: "Significant increase due to compounded returns over time.",
      infoColor: "text-green-300",
      valueBoxColor: "border-pink-400",
      headerColor: "bg-[#2a2236] border-pink-400",
      headerTextColor: "text-white",
      iconBg: "bg-pink-500",
    },
    {
      title: "Increase Pension Contributions",
      icon: "/pencil-edit-icon.png",
      button: "Apply",
      description: "Update Net Annual Pension Contribution from £7,000 to £17,000 read more",
      value: "7,000",
      valueLabel: "Cash Flow Change",
      valueChange: "Potentially negative in the short term due to reduced take-home pay, but highly positive in the long term.",
      valueChangeColor: "text-red-400",
      infoLabel: "",
      info: "",
      infoColor: "",
      valueBoxColor: "border-pink-400",
      headerColor: "bg-[#2a2236] border-pink-400",
      headerTextColor: "text-white",
      iconBg: "bg-pink-500",
    },
    {
      title: "Reduce Non-Essential Spending",
      icon: "/pencil-edit-icon.png",
      button: "Apply",
      description: "Update Monthly Non-Essential Expenses from £5,000 to £3,500 read more",
      value: "5,000",
      valueLabel: "Cash Flow Change",
      valueChange: "+£1,500/month",
      valueChangeColor: "text-green-400",
      infoLabel: "Savings Increase",
      info: "Significant increase due to compounded returns over time.",
      infoColor: "text-green-300",
      valueBoxColor: "border-pink-400",
      headerColor: "bg-[#2a2236] border-pink-400",
      headerTextColor: "text-white",
      iconBg: "bg-pink-500",
    },
    {
      title: "Increase Pension Contributions",
      icon: "/pencil-edit-icon.png",
      button: "Apply",
      description: "Update Net Annual Pension Contribution from £7,000 to £17,000 read more",
      value: "7,000",
      valueLabel: "Cash Flow Change",
      valueChange: "Potentially negative in the short term due to reduced take-home pay, but highly positive in the long term.",
      valueChangeColor: "text-red-400",
      infoLabel: "",
      info: "",
      infoColor: "",
      valueBoxColor: "border-pink-400",
      headerColor: "bg-[#2a2236] border-pink-400",
      headerTextColor: "text-white",
      iconBg: "bg-pink-500",
    },
  ];
  return (
    <div className="w-full">
      <div className="font-semibold text-white text-xl mb-4">Plan Optimisation</div>
      <div
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#E81A5F] scrollbar-track-[#18101c] scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
        style={{ scrollbarColor: '#E81A5F #18101c', scrollbarWidth: 'thin' }}
      >
        {optimisations.map((opt, idx) => (
          <OptimisationCard key={idx} {...opt} />
        ))}
      </div>
    </div>
  );
}

function OptimisationCard({
  title,
  icon,
  button,
  description,
  value,
  valueLabel,
  valueChange,
  valueChangeColor,
  infoLabel,
  info,
  infoColor,
  valueBoxColor,
  headerColor,
  headerTextColor,
  iconBg,
}: any) {
  const [stepperValue, setStepperValue] = useState(Number(value.replace(/,/g, '')));
  const [descExpanded, setDescExpanded] = useState(false);
  const maxDescLength = 60;
  const descTruncated = description.length > maxDescLength && !descExpanded;
  const descToShow = descTruncated ? description.slice(0, maxDescLength) + '...' : description;

  const handleDecrement = () => setStepperValue((v: number) => Math.max(0, v - 1000));
  const handleIncrement = () => setStepperValue((v: number) => v + 1000);

  return (
    <div style={{backgroundColor: '#FFFFFF1F'}} className="min-w-[520px] max-w-[540px] rounded-2xl p-5 flex flex-col gap-4 shadow-lg border border-[#2a2236]">
      <div className="flex items-center justify-between gap-3 mb-2 min-h-[48px]">
        <div className="flex-1">
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 border"
            style={{
              background: '#FFFFFF1F',
              border: '2px solid #E81A5F',
              borderRadius: '0.75rem',
              overflow: 'hidden',
            }}
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-500">
              <Image src={icon} alt="icon" width={18} height={18} />
            </div>
            <span className="font-semibold text-base text-white">{title}</span>
          </div>
        </div>
        <button
          className="ml-2 px-6 py-2.5 rounded-xl font-bold text-white text-base border"
          style={{
            background: 'linear-gradient(0deg, #80153B, #80153B), linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
            borderColor: '#E81A5F',
            borderWidth: 2,
          }}
        >
          {button}
        </button>
      </div>
      <div className="text-base text-white/80 mb-2 min-h-[48px] flex items-center">
        <span>
          {descToShow}
          {descTruncated && (
            <button className="ml-1 text-pink-400 underline text-sm inline" onClick={() => setDescExpanded(true)}>
              read more
            </button>
          )}
          {descExpanded && description.length > maxDescLength && (
            <button className="ml-1 text-pink-400 underline text-sm inline" onClick={() => setDescExpanded(false)}>
              show less
            </button>
          )}
        </span>
      </div>
      <div className="flex items-center gap-3 mb-3 min-h-[56px]">
        <div
          className="flex items-center justify-between w-full rounded-2xl border border-[#E81A5F] overflow-hidden"
          style={{ minWidth: 180, maxWidth: 220, height: 52 }}
        >
          <button
            onClick={handleDecrement}
            className="flex items-center justify-center w-14 h-full border-none outline-none bg-transparent cursor-pointer group"
            style={{ borderRight: '2px solid #E81A5F' }}
          >
            <span className="rounded-full border-2 border-[#E81A5F] w-8 h-8 flex items-center justify-center text-[1.25rem] text-[#E81A5F] group-hover:bg-[#E81A5F] group-hover:text-white transition">
              –
            </span>
          </button>
          <span className="flex-1 text-center text-white text-lg font-bold select-none">
            {stepperValue.toLocaleString()}
          </span>
          <button
            onClick={handleIncrement}
            className="flex items-center justify-center w-14 h-full border-none outline-none bg-transparent cursor-pointer group"
            style={{ borderLeft: '2px solid #E81A5F' }}
          >
            <span className="rounded-full border-2 border-[#E81A5F] w-8 h-8 flex items-center justify-center text-[1.25rem] text-[#E81A5F] group-hover:bg-[#E81A5F] group-hover:text-white transition">
              +
            </span>
          </button>
        </div>
      </div>
      
      {/* Two-column layout for Cash Flow Change and Savings Increase */}
      <div className="grid grid-cols-2 gap-4 mt-1">
        {/* Cash Flow Change Column */}
        <div className="bg-[#FFFFFF0F] p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Image src="/dollar-icon.png" alt="dollar" width={20} height={20} />
            <span className="font-semibold text-base text-white">Cash Flow Change</span>
          </div>
          <div className={`text-base font-bold ${valueChangeColor}`}>{valueChange}</div>
        </div>
        
        {/* Savings Increase Column */}
        <div className="bg-[#FFFFFF0F] p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Image src="/bar-chart-icon.png" alt="bar chart" width={20} height={20} />
            <span className="font-semibold text-base text-white">Savings Impact</span>
          </div>
          <div className={`text-base font-bold ${infoColor || valueChangeColor}`}>
            {info || "Long-term positive impact"}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlanStatusCard({ planStatus }: { planStatus: PlanStatus }) {
  if (!planStatus.onTrack) {
    return <PlanOptimisationSection />;
  }
  return (
    <div className="col-span-3 bg-[#18101c] rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg border border-[#2a2236] min-h-[180px]">
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
        <Image src="/3d-icon-check-mark.png" alt="Plan on track" width={104} height={104} className="relative z-10" />
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

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    // Map series names to their colors
    const colorMap: Record<string, string> = {
      Total: "#1E7A33",
      ISA: "#53AE98",
      Pension: "#9E71A2",
      GIA: "#BFDB80"
    };
    
    return (
      <div className="bg-[#150107] p-4 rounded-lg border border-[#404968] shadow-lg">
        <p className="text-white font-medium mb-2">Age {label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`tooltip-${index}`} className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: colorMap[entry.name] || entry.color }}
              ></div>
              <span className="text-white text-sm">{entry.name}</span>
            </div>
            <span className="text-white text-sm font-medium ml-4">
              £{Number(entry.value).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function ChartSection({ tab, setTab, chartData }: { tab: string; setTab: (tab: string) => void; chartData: ChartDatum[] }) {
  return (
    <div className="bg-[#150107] rounded-2xl p-6 shadow-lg border border-[#404968] flex flex-col gap-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${tab === "portfolio" ? "bg-[#FF0060] text-white" : "bg-[#2a2236] text-gray-300 hover:bg-pink-900/30"}`}
            onClick={() => setTab("portfolio")}
          >
            Portfolio Growth
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${tab === "moneyflow" ? "bg-[#FF0060] text-white" : "bg-[#2a2236] text-gray-300 hover:bg-pink-900/30"}`}
            onClick={() => setTab("moneyflow")}
          >
            Money Flow
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#1E7A33] mr-2"></div>
            <span className="text-white text-sm">Total</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#53AE98] mr-2"></div>
            <span className="text-white text-sm">ISA</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#9E71A2] mr-2"></div>
            <span className="text-white text-sm">Pension</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#BFDB80] mr-2"></div>
            <span className="text-white text-sm">GIA</span>
          </div>
        </div>
      </div>
      {tab === "portfolio" ? (
        <div className="relative">
          <div className="flex items-center justify-end mb-4">
            <div className="flex items-center">
              <span className="text-white text-sm mr-2">45</span>
              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#1E7A33]"></div>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E7A33" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1E7A33" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorISA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#53AE98" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#53AE98" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPension" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9E71A2" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#9E71A2" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGIA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#BFDB80" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#BFDB80" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="age" 
                stroke="#404968" 
                tick={{ fill: '#fff', fontSize: 12 }}
                axisLine={{ stroke: '#404968' }}
                tickLine={{ stroke: '#404968' }}
              />
              <YAxis 
                stroke="#404968" 
                tick={{ fill: '#fff', fontSize: 12 }}
                tickFormatter={(value) => `£${(value / 1000000).toFixed(1)}M`}
                axisLine={{ stroke: '#404968' }}
                tickLine={{ stroke: '#404968' }}
              />
              <CartesianGrid stroke="#404968" strokeDasharray="3 3" vertical={false} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine x={45} stroke="#fff" strokeWidth={1} />
              <Area 
                type="monotone" 
                dataKey="Total" 
                stroke="#1E7A33" 
                strokeWidth={3} 
                fillOpacity={1}
                fill="url(#colorTotal)" 
                activeDot={{ r: 8, fill: '#1E7A33', stroke: '#fff', strokeWidth: 2 }}
              />
              <Area 
                type="monotone" 
                dataKey="ISA" 
                stroke="#53AE98" 
                strokeWidth={2} 
                fillOpacity={1}
                fill="url(#colorISA)" 
                activeDot={{ r: 6, fill: '#53AE98', stroke: '#fff', strokeWidth: 2 }}
              />
              <Area 
                type="monotone" 
                dataKey="Pension" 
                stroke="#9E71A2" 
                strokeWidth={2} 
                fillOpacity={1}
                fill="url(#colorPension)" 
                activeDot={{ r: 6, fill: '#9E71A2', stroke: '#fff', strokeWidth: 2 }}
              />
              <Area 
                type="monotone" 
                dataKey="GIA" 
                stroke="#BFDB80" 
                strokeWidth={2} 
                fillOpacity={1}
                fill="url(#colorGIA)" 
                activeDot={{ r: 6, fill: '#BFDB80', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="text-white text-lg font-semibold text-center py-20">Money Flow Graph (Coming Soon)</div>
      )}
    </div>
  );
}

export default function OverviewMainSection() {
  const [tab, setTab] = useState("portfolio");
  const showPlanOptimisation = true; // Set to true to show Plan Optimisation section

  return (
    <div className="flex flex-col gap-6 w-full p-2 sm:p-3 md:p-4">
      {/* Top Section */}
      <div className="grid grid-cols-5 gap-4 md:gap-6">
        <UserDetailsCard user={user} infoCards={infoCards} />
        {showPlanOptimisation ? (
          <div className="col-span-3 bg-[#310312] rounded-2xl p-6 flex flex-col gap-4 shadow-lg border border-[#2a2236]">
            <div className="col-span-3"><PlanOptimisationSection /></div>
          </div>
        ) : (
          <PlanStatusCard planStatus={{ ...planStatus, onTrack: true }} />
        )}
      </div>
      <ChartSection tab={tab} setTab={setTab} chartData={chartData} />
      
      {/* Financial Data Table Section */}
      <CollapsibleSection title="Financial Data Details">
        <FinancialDataTable 
          data={mockFinancialData} 
          visibleColumns={defaultVisibleColumns} 
        />
      </CollapsibleSection>
    </div>
  );
} 