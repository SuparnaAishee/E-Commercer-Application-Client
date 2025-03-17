/* eslint-disable @typescript-eslint/no-unused-vars */
import TopHeader from "./TopHeader";

import HeadlineSlider from "./headlineSliders";
import AnnouncementBar from "./AnnoucementBar";
import MainHeader from "./Header";

export const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 shadow-sm bg-white">
      {/* Each section is now in its own div to prevent overlapping */}
      <div className="border-b border-gray-200">
        <AnnouncementBar />
      </div>
      <div className="border-b border-gray-200">
        <HeadlineSlider />
      </div>
      <div>
        <TopHeader />
      </div>
      <div className="border-t border-gray-200">
        <MainHeader />
      </div>
    </div>
  );
};
