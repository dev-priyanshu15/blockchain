import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import Mobile from "./Mobile";
import Navbar from "./Navbar";
import { Header1 } from "../SVG/index";

const Header = ({
  openMenu,
  setOpenMenu,
  setOpenSend,
  setAuthComponent,
  activeUser,
  onHandleSearch,
  onClearSearch,
}) => {
  const [cookieValue, setCookieValue] = useState("");
  useEffect(() => {
    const storedCookieValue = Cookies.get("token");
    if (storedCookieValue) {
      setCookieValue(storedCookieValue);
      setAuthComponent(true);
    }
  }, []);

  //FILTER
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchItem), 1000);
    return () => clearTimeout(timer);
  }, [searchItem]);

  useEffect(() => {
    if (search) {
      onHandleSearch(search);
    } else {
      onClearSearch();
    }
  }, [search]);

  return (
    <header className="top-0 z-header mx-auto relative md:flex">
      <div className="mx-auto w-full px-4 py-4 md:px-6 md:py-5 dt:max-w-content">
        <div className="hidden md:block">
          <div className="c-kEurEn">
            <div className="c-kwkTWz">
              <div className="c-cKdKOf">
                <div className="c-gYAfAA c-gYAfAA-fyicCh-main-true c-gYAfAA-cgJpuH-isBlurBackground-false c-gYAfAA-eAHnRQ-isGreyBackground-true">
                  <div className="search-icon">
                    <Header1 />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for anything on Sound"
                    className="c-gmlcKr c-gmlcKr-eCmJmb-isBlurBackground-false"
                    onChange={(e) => setSearchItem(e.target.value)}
                    value={searchItem}
                  />
                </div>
              </div>
            </div>
            <nav className="ml-auto">
              <div style={{ position: "relative" }}>
                {cookieValue && (
                  <Navbar
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                    activeUser={activeUser}
                  />
                )}
              </div>
            </nav>
          </div>
        </div>
        <Mobile />
      </div>
    </header>
  );
};

export default Header;
