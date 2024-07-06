import React from "react";

const Profile4 = () => {
  return (
    <div className="mb-7 mt-8 hidden md:block">
      <div className="flex w-full items-center gap-2 md:gap-4">
        <div className="flex-shrink-0 rounded-full h-10 w-10 md:h-12 md:w-12">
          <div className="relative w-[48px]">
            <a>
              <div className="c-hrywGi c-hrywGi-igLQzAt-css">
                <img
                  alt="Daulat Hussain"
                  loading="lazy"
                  width={48}
                  height={48}
                  src="https://www.sound.xyz/_next/image?url=https%3A%2F%2Fd16zqvkniqf1rn.cloudfront.net%2Fplaceholders%2Favatars%2Fv2%2F3.jpg&w=3840&q=75"
                  style={{
                    color: "transparent",
                    borderRadius: "50%",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                  }}
                />
              </div>
            </a>
          </div>
        </div>
        <button className="relative flex flex-1 items-center rounded-md bg-base100 px-3 py-2 text-base-l text-neutral500 ring-inset ring-base300 hover:bg-neutral50 hover:ring-1">
          <div className="line-clamp-1 flex-1 text-left">
            What's on your mind?
          </div>
        </button>
        <button className="c-bPnuSX c-bPnuSX-SFeiM-size-S c-bPnuSX-kiaVWo-variant-primary bg-base800/30' bottom-0 right-0 flex h-10 items-center justify-center !rounded-[100px]">
          Post
        </button>
      </div>
      <div className="hidden md:block">
        <div className="flex h-[1px] w-full flex-col items-center justify-center overflow-visible py-5">
          <div className="h-[1px] w-full flex-shrink-0 bg-base200" />
        </div>
      </div>
    </div>
  );
};

export default Profile4;
