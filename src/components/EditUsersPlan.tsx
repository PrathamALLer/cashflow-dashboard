import Image from "next/image";
import React, { useState, useRef, useEffect, useCallback } from "react";

type CapitalEventGoal = {
  id: number;
  name: string;
  amount: number;
  year: number;
  icon: string;
};

type RiskProfileType = {
  id: number;
  name: string;
  description: string;
};

// Mock data for capital events with various icons
const mockCapitalEvents: CapitalEventGoal[] = [
  { id: 1, name: "Daughter's University", amount: 30000, year: 2029, icon: "/3d-school-bag-icon.png" },
  { id: 2, name: "House Renovation", amount: 45000, year: 2025, icon: "/3d-icon-check-mark.png" },
  { id: 3, name: "World Trip", amount: 20000, year: 2027, icon: "/globe.svg" },
  { id: 4, name: "Son's Wedding", amount: 25000, year: 2030, icon: "/3d-school-bag-icon.png" },
  { id: 5, name: "New Car Purchase", amount: 35000, year: 2026, icon: "/3d-icon-check-mark.png" },
  { id: 6, name: "Vacation Home", amount: 120000, year: 2033, icon: "/3d-school-bag-icon.png" },
];

// Mock data for risk profiles
const riskProfiles: RiskProfileType[] = [
  { id: 1, name: "Conservative", description: "Low risk, stable returns" },
  { id: 2, name: "Moderately Conservative", description: "Lower risk, moderate returns" },
  { id: 3, name: "Balanced", description: "Medium risk, balanced returns" },
  { id: 4, name: "Growth", description: "Higher risk, higher potential returns" },
  { id: 5, name: "Aggressive", description: "High risk, maximum potential returns" },
];

const EditUsersPlan = () => {
  const [capitalEvents, setCapitalEvents] = useState<CapitalEventGoal[]>(mockCapitalEvents);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<CapitalEventGoal, 'id'>>({
    name: "",
    amount: 0,
    year: new Date().getFullYear() + 1,
    icon: "/3d-school-bag-icon.png"
  });

  // Function to add a new capital event
  const handleAddEvent = () => {
    if (!newEvent.name || newEvent.amount <= 0) return;
    
    const newId = capitalEvents.length > 0 
      ? Math.max(...capitalEvents.map(e => e.id)) + 1 
      : 1;
    
    setCapitalEvents([
      ...capitalEvents, 
      { 
        id: newId,
        ...newEvent
      }
    ]);
    
    // Reset form
    setNewEvent({
      name: "",
      amount: 0,
      year: new Date().getFullYear() + 1,
      icon: "/3d-school-bag-icon.png"
    });
    setShowAddForm(false);
  };

  // Function to delete a capital event
  const handleDeleteEvent = (id: number) => {
    setCapitalEvents(capitalEvents.filter(event => event.id !== id));
  };

  // Generate retirement age options (1-100)
  const ages = Array.from({ length: 100 }, (_, i) => i + 1);
  const [selectedAge, setSelectedAge] = useState<number>(60);
  const [selectedRiskProfile, setSelectedRiskProfile] = useState<number>(3); // Default to Balanced
  
  // Ref for the scroll container
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [isInitialized, setIsInitialized] = useState(false);

  // Debounce timer ref
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Function to center the selected age
  const centerSelectedAge = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const selectedElement = container.querySelector(`[data-age="${selectedAge}"]`);
    
    if (selectedElement) {
      const containerHeight = container.clientHeight;
      const selectedElementTop = (selectedElement as HTMLElement).offsetTop;
      const selectedElementHeight = (selectedElement as HTMLElement).clientHeight;
      
      // Calculate the scroll position to center the selected element
      const scrollTop = selectedElementTop - (containerHeight / 2) + (selectedElementHeight / 2);
      
      // Apply smooth scroll
      container.scrollTo({
        top: scrollTop,
        behavior: 'smooth' 
      });
    }
  }, [selectedAge]);

  // Effect to center selected age when it changes
  useEffect(() => {
    if (!isInitialized) return;
    centerSelectedAge();
  }, [selectedAge, isInitialized, centerSelectedAge]);

  // Initial scroll to center the default selected age
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const selectedElement = container.querySelector(`[data-age="${selectedAge}"]`);
        
        if (selectedElement) {
          const containerHeight = container.clientHeight;
          const selectedElementTop = (selectedElement as HTMLElement).offsetTop;
          const selectedElementHeight = (selectedElement as HTMLElement).clientHeight;
          
          // Calculate the scroll position to center the selected element
          const scrollTop = selectedElementTop - (containerHeight / 2) + (selectedElementHeight / 2);
          
          // Apply initial scroll without animation
          container.scrollTop = scrollTop;
          setIsInitialized(true);
        }
      }
    }, 100); // Small delay to ensure DOM is ready
    
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll events to update selected age when scrolling
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const containerMiddle = container.scrollTop + (container.clientHeight / 2);
    
    // Find the element closest to the middle of the container
    let closestDistance = Infinity;
    let newSelectedAge = selectedAge;
    
    Array.from(container.querySelectorAll('[data-age]')).forEach((element) => {
      const el = element as HTMLElement;
      const elementTop = el.offsetTop;
      const elementHeight = el.clientHeight;
      const elementMiddle = elementTop + (elementHeight / 2);
      const distance = Math.abs(containerMiddle - elementMiddle);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        const ageAttr = el.getAttribute('data-age');
        if (ageAttr) {
          const age = parseInt(ageAttr, 10);
          if (!isNaN(age)) {
            newSelectedAge = age;
          }
        }
      }
    });
    
    if (newSelectedAge !== selectedAge) {
      setSelectedAge(newSelectedAge);
    }
    
    // Clear any existing timeout
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }
    
    // Set a new timeout to center the selected age after scrolling stops
    scrollTimerRef.current = setTimeout(() => {
      centerSelectedAge();
    }, 150);
  };
  
  // Clean up the timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="p-6 bg-[#150107] rounded-2xl shadow-lg border border-[#2a2236] mt-6">
      <h2 className="text-white text-lg font-semibold mb-4">Edit users plan</h2>
      
      <div className="grid grid-cols-3 gap-5">
        {/* Capital Events Goal */}
        <div className="bg-[#150107] rounded-2xl p-5 border border-[#404968]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">Capital Events goal</h3>
            <button 
              className="text-[#FF0060] text-sm hover:text-[#ff3d85] transition-colors"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? 'Cancel' : '+ Add New'}
            </button>
          </div>
          
          {showAddForm && (
            <div className="mb-5 p-4 bg-[#2a1621] rounded-lg">
              <div className="mb-3">
                <label className="block text-white text-sm mb-1">Event Name</label>
                <input 
                  type="text"
                  className="w-full bg-[#150107] border border-[#3e0c16] rounded px-3 py-2 text-white focus:border-[#FF0060] outline-none"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="block text-white text-sm mb-1">Amount (£)</label>
                <input 
                  type="number"
                  className="w-full bg-[#150107] border border-[#3e0c16] rounded px-3 py-2 text-white focus:border-[#FF0060] outline-none"
                  value={newEvent.amount || ''}
                  onChange={(e) => setNewEvent({...newEvent, amount: Number(e.target.value)})}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm mb-1">Year</label>
                <input 
                  type="number"
                  className="w-full bg-[#150107] border border-[#3e0c16] rounded px-3 py-2 text-white focus:border-[#FF0060] outline-none"
                  value={newEvent.year}
                  onChange={(e) => setNewEvent({...newEvent, year: Number(e.target.value)})}
                />
              </div>
              <button 
                className="px-4 py-2 bg-[#FF0060] hover:bg-[#ff3d85] text-white rounded-lg w-full transition-colors"
                onClick={handleAddEvent}
              >
                Add Event
              </button>
            </div>
          )}
          
          <div className="relative overflow-hidden" style={{ maxHeight: '400px' }}>
            <div className="space-y-5 pr-4 overflow-y-auto custom-scrollbar" style={{ maxHeight: '400px' }}>
              {capitalEvents.map((event) => (
                <div 
                  key={event.id} 
                  style={{
                    padding: '2px 0',
                    borderRadius: '10px',
                    background: `
                      linear-gradient(90deg, rgba(62,9,33,0) 0%, #FF0060 50%, rgba(62,9,33,0) 100%),
                      linear-gradient(0deg, rgba(62,9,33,0) 0%, #FF0060 50%, rgba(62,9,33,0) 100%)
                    `,
                    backgroundSize: '100% 2px, 100% 2px',
                    backgroundPosition: 'top, bottom',
                    backgroundRepeat: 'no-repeat'
                  }}
                  className="mb-4 group"
                >
                  <div 
                    className="relative p-4 rounded-[9px] bg-[#150107]"
                  >
                    <div className="absolute top-4 left-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#310312] text-white text-sm">
                      {event.id}
                    </div>
                    <div className="ml-12 flex items-start gap-3">
                      <Image 
                        src={event.icon} 
                        alt={event.name}
                        width={45} 
                        height={45} 
                      />
                      <div>
                        <p className="text-white text-lg">{event.name}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="flex items-center text-[#FF7E7E] text-sm">
                            <span className="mr-1">£</span>
                            <span>-</span>
                            <span>{' ' + event.amount.toLocaleString()}</span>
                          </span>
                          <span className="flex items-center text-gray-400 text-sm">
                            <Image
                              src="/calendar-white-icon.png"
                              alt="Calendar"
                              width={14}
                              height={14}
                              className="mr-1"
                            />
                            {event.year}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-2 flex gap-2">
                      <button className="opacity-100 group-hover:opacity-100 transition-opacity">
                        <Image
                          src="/edit-pink.png"
                          alt="Edit"
                          width={22}
                          height={22}
                        />
                      </button>
                      <button 
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF0060]"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Retirement Age */}
        <div className="bg-[#150107] rounded-2xl p-5 border border-[#404968] relative">
          <h3 className="text-white font-medium mb-6 text-left">Retirement Age</h3>
          
          {/* Label for selected age */}
          <div className="absolute top-5 right-5">
            <span className="text-[#FF0060] text-sm font-medium">Selected Age</span>
          </div>
          
          {/* Scroll indicator mask - creates fading effect at top and bottom */}
          <div className="relative w-full h-[240px] flex items-center justify-center mt-2">
            {/* Top shadow overlay */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#150107] to-transparent z-10 pointer-events-none"></div>
            
            {/* Bottom shadow overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#150107] to-transparent z-10 pointer-events-none"></div>
            
            {/* Scale markers */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-40 flex flex-col justify-between z-0 opacity-50">
              <div className="w-3 h-[1px] bg-[#404968]"></div>
              <div className="w-3 h-[1px] bg-[#404968]"></div>
              <div className="w-3 h-[1px] bg-[#404968]"></div>
            </div>
            
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-40 flex flex-col justify-between z-0 opacity-50">
              <div className="w-3 h-[1px] bg-[#404968]"></div>
              <div className="w-3 h-[1px] bg-[#404968]"></div>
              <div className="w-3 h-[1px] bg-[#404968]"></div>
            </div>
            
            {/* Selection highlight */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-16 bg-[#81183F] bg-opacity-35 border border-[#E81A5F] rounded-lg z-0 pointer-events-none"></div>
            
            {/* Scrollable container */}
            <div 
              ref={scrollContainerRef}
              className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar px-8 snap-y snap-mandatory"
              style={{ 
                scrollPaddingTop: '100px',
                scrollPaddingBottom: '100px',
                scrollBehavior: 'smooth'
              }}
              onScroll={handleScroll}
            >
              {/* Extra padding at top and bottom to allow scrolling to first and last items */}
              <div className="h-[120px]"></div>
              
              {ages.map(age => (
                <div 
                  key={age} 
                  data-age={age}
                  className={`text-center cursor-pointer transition-all duration-200 h-14 flex items-center justify-center snap-center ${
                    age === selectedAge 
                      ? "text-[#E81A5F] text-4xl font-bold h-16 z-20 relative" 
                      : age >= selectedAge - 2 && age <= selectedAge + 2
                        ? "text-gray-300 text-lg"
                        : "text-gray-500 text-sm"
                  }`}
                  onClick={() => setSelectedAge(age)}
                >
                  {age}
                </div>
              ))}
              
              {/* Extra padding at bottom */}
              <div className="h-[120px]"></div>
            </div>
          </div>
          
          {/* Chosen retirement age display */}
          <div className="mt-4 text-center">
            <span className="text-gray-400 text-sm">You'll retire at age</span>
            <div className="text-[#E81A5F] text-2xl font-bold mt-1">{selectedAge}</div>
          </div>
        </div>
        
        {/* Risk Profile */}
        <div className="bg-[#150107] rounded-2xl p-5 border border-[#404968]">
          <h3 className="text-white font-medium mb-4">Risk Profile</h3>
          
          <div className="mb-5">
            <div className="grid grid-cols-5 gap-1 mb-4">
              {riskProfiles.map((profile) => (
                <div 
                  key={profile.id}
                  className={`relative cursor-pointer transition-all duration-200 ${
                    selectedRiskProfile === profile.id 
                      ? "opacity-100" 
                      : "opacity-50 hover:opacity-80"
                  }`}
                  onClick={() => setSelectedRiskProfile(profile.id)}
                >
                  <div className={`h-1 w-full bg-gradient-to-r ${
                    profile.id === 1 ? "from-green-400 to-green-500" :
                    profile.id === 2 ? "from-green-500 to-yellow-400" :
                    profile.id === 3 ? "from-yellow-400 to-orange-400" :
                    profile.id === 4 ? "from-orange-400 to-red-500" :
                    "from-red-500 to-red-600"
                  } mb-2 rounded-full`}></div>
                  <p className={`text-center text-xs truncate ${
                    selectedRiskProfile === profile.id
                      ? "text-[#FF0060] font-medium"
                      : "text-gray-400"
                  }`}>
                    {profile.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative">
              <Image
                src="/risk-profile-image.svg"
                alt="Risk Profile"
                width={200}
                height={120}
              />
              
              <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-[#191919] w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                  <div 
                    className="bg-[#9f7b42] w-[3px] h-8 rounded-full absolute transform origin-bottom"
                    style={{ 
                      transform: `rotate(${selectedRiskProfile === 1 ? '0deg' : 
                        selectedRiskProfile === 2 ? '22.5deg' : 
                        selectedRiskProfile === 3 ? '45deg' : 
                        selectedRiskProfile === 4 ? '67.5deg' : '90deg'
                      })` 
                    }}
                  ></div>
                  <div className="bg-white rounded-full w-2 h-2"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-[#FF0060] text-sm font-medium text-center">
              {riskProfiles.find(p => p.id === selectedRiskProfile)?.name}
            </h4>
            <p className="text-gray-400 text-xs text-center mt-1">
              {riskProfiles.find(p => p.id === selectedRiskProfile)?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUsersPlan; 