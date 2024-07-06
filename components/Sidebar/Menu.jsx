import React from "react";

const Menu = ({ icon, name, setopenComponent, path }) => {
  return (
    <a
      key={name}
      className="h-[46px] !pl-0"
      href={
        path == "/profileEdit"
          ? "/"
          : path == "/artist"
          ? "/"
          : path == "/create"
          ? "/"
          : path == "/creator"
          ? "/"
          : path == "/music/[music]"
          ? "/"
          : `#${name}`
      }
      onClick={() => setopenComponent(name)}
    >
      <div className="-mx-2 flex items-center gap-4 rounded-full p-2 pl-4 transition-colors duration-300 hover:bg-base100">
        <div className="relative flex w-7 justify-center">
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center [&_svg]:h-[22px]">
            {icon}
          </div>
        </div>
        <span className="flex items-center py-1 font-title text-title-m font-semibold tracking-wide text-base900">
          {name}
        </span>
      </div>
    </a>
  );
};

export default Menu;
