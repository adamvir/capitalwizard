export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* iPhone 16 Pro Max frame */}
      <div className="relative w-[450px] h-[920px] bg-slate-900 rounded-[60px] p-3 shadow-2xl">
        {/* Inner bezel */}
        <div className="relative w-full h-full bg-black rounded-[48px] overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full z-30 border border-slate-800"></div>
          
          {/* Screen content */}
          <div className="relative w-full h-full bg-white overflow-hidden">
            {children}
          </div>
        </div>

        {/* Side buttons */}
        {/* Volume buttons */}
        <div className="absolute left-0 top-[180px] w-1 h-[50px] bg-slate-800 rounded-r-sm"></div>
        <div className="absolute left-0 top-[240px] w-1 h-[50px] bg-slate-800 rounded-r-sm"></div>
        
        {/* Power button */}
        <div className="absolute right-0 top-[200px] w-1 h-[80px] bg-slate-800 rounded-l-sm"></div>
        
        {/* Action button */}
        <div className="absolute left-0 top-[150px] w-1 h-[30px] bg-slate-800 rounded-r-sm"></div>
      </div>
    </div>
  );
}
