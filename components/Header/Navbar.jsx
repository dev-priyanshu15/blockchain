import React from "react";

const Navbar = ({ setOpenMenu, openMenu, activeUser }) => {
  return (
    <ul className="flex list-none items-center">
      <div className="flex-end ml-4 flex h-10 w-full items-center gap-3">
        <button type="button">
          <div className="h-7 w-7 md:h-10 md:w-10">
            <div className="relative w-[40px]">
              <div className="c-hrywGi c-hrywGi-iloIMzw-css">
                <img
                  onClick={() =>
                    openMenu ? setOpenMenu(false) : setOpenMenu(true)
                  }
                  alt="profilePicture"
                  width={40}
                  height={40}
                  src={activeUser?.profilePicture || "theblockchaincoders.jpg"}
                  style={{
                    color: "transparent",
                    borderRadius: "1000px",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        </button>
      </div>
    </ul>
  );
};

export default Navbar;
