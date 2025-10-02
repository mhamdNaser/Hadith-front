import React from 'react';
import LeftSection from './Components/LeftSection';
import CenterSection from './Components/CenterSection';
import RightTopSection from './Components/RightTopSection';
import RightBottomSection from './Components/RightBottomSection';

export default function Home() {
  return (
    <div className="flex w-full gap-4 p-4 h-screen overflow-y-hidden">
      {/* Left */}
      <div className="w-1/4">
        <LeftSection />
      </div>

      {/* Center */}
      <div className="w-2/4">
        <CenterSection />
      </div>

      {/* Right */}
      <div className="w-1/4 h-screen overflow-hidden">
        <RightTopSection />
        <RightBottomSection />
      </div>
    </div>
  );
}
