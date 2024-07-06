import React from "react";

import {
  FooterHome,
  FooterMusic,
  FooterSearch,
  FooterNotification,
} from "../SVG/index";

const Footer = ({ setopenComponent }) => {
  return (
    <div
      className="fixed bottom-0 z-mobileNav flex h-[calc(68px+env(safe-area-inset-bottom))] w-screen items-center justify-center border-t border-base100 bg-white px-0 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 md:hidden"
      id="MobileNav"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div className="flex w-full justify-between gap-1">
        <a
          className="appearance-[button] flex-1 text-base900 no-underline active:scale-[0.98]"
          href="/"
        >
          <div
            className="flex min-h-[43px] flex-col items-center justify-center gap-1 data-[state=active]:text-base900 data-[state=inactive]:text-base600 data-[state=active]:font-semibold data-[state=inactive]:font-medium relative"
            data-state="active"
          >
            <div className="flex h-[25px] w-[27px] flex-shrink-0 items-center justify-center [&_svg]:h-5">
              <FooterHome />
            </div>
            <span className="home-label font-base text-base-xs">Home</span>
          </div>
        </a>
        <a
          className="appearance-[button] flex-1 text-base900 no-underline active:scale-[0.98]"
          href="#"
          onClick={() => setopenComponent("Profile")}
        >
          <div
            className="flex min-h-[43px] flex-col items-center justify-center gap-1 data-[state=active]:text-base900 data-[state=inactive]:text-base600 data-[state=active]:font-semibold data-[state=inactive]:font-medium relative"
            data-state="inactive"
          >
            <div className="flex h-[25px] w-[27px] flex-shrink-0 items-center justify-center [&_svg]:h-5">
              <FooterMusic />
            </div>
            <span className="home-label font-base text-base-xs">Profile</span>
          </div>
        </a>
        <a
          className="appearance-[button] flex-1 text-base900 no-underline active:scale-[0.98]"
          href="#"
          onClick={() => setopenComponent("Explore")}
        >
          <div
            className="flex min-h-[43px] flex-col items-center justify-center gap-1 data-[state=active]:text-base900 data-[state=inactive]:text-base600 data-[state=active]:font-semibold data-[state=inactive]:font-medium relative"
            data-state="inactive"
          >
            <div className="flex h-[25px] w-[27px] flex-shrink-0 items-center justify-center [&_svg]:h-5">
              <FooterSearch />
            </div>
            <span className="home-label font-base text-base-xs">Search</span>
          </div>
        </a>
        <a
          className="appearance-[button] flex-1 text-base900 no-underline active:scale-[0.98]"
          href="#"
          onClick={() => setopenComponent("Notifications")}
        >
          <div
            className="flex min-h-[43px] flex-col items-center justify-center gap-1 data-[state=active]:text-base900 data-[state=inactive]:text-base600 data-[state=active]:font-semibold data-[state=inactive]:font-medium relative"
            data-state="inactive"
          >
            <div className="flex h-[25px] w-[27px] flex-shrink-0 items-center justify-center [&_svg]:h-5">
              <FooterNotification />
            </div>
            <span className="home-label font-base text-base-xs">
              Notifications
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Footer;
