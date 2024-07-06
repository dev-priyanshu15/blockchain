import React, { useState, useEffect, useContext } from "react";

///IMPORTING CONTRCT DATA
import { MusicNFTContext } from "../../context/context";
import axios from "axios";
import { shortenAddress } from "../../utils/utils";

const ProfileMenu = ({
  setOpenSend,
  setTokenICO,
  activeUser,
  setopenComponent,
}) => {
  const { musicICO, buyToken, currency, network } = useContext(MusicNFTContext);

  const [icoToken, setIcoToken] = useState();

  useEffect(() => {
    musicICO().then((items) => {
      setIcoToken(items);
    });
  }, []);
  ///LOGOUT
  const LOGOUT = async (caption, fileURL) => {
    try {
      const res = await axios({
        method: "GET",
        url: `/api/auth/logout`,
        withCredentials: true,
      });

      if (res.status === 200) {
        console.log(res.data);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      style={{
        position: "fixed",
        left: "0px",
        top: "0px",
        transform: "translate3d(1168px, 60px, 0px)",
        minWidth: "max-content",
        zIndex: 1300,
      }}
    >
      <div
        className="text-base relative top-2.5 z-header flex h-fit w-[238px] flex-col rounded-md bg-white text-base-l shadow-primary"
        tabIndex={-1}
        style={{ outline: "none", pointerEvents: "auto" }}
      >
        <div className="c-kNeObI c-kNeObI-jfhyso-desktopNavHeader-true">
          <div className="c-gQgaEb">
            <div className="relative w-[32px]">
              <a>
                <div className="c-hrywGi c-hrywGi-iloIMzw-css">
                  <img
                    alt="profile"
                    width={32}
                    height={32}
                    src={
                      activeUser?.profilePicture || "theblockchaincoders.jpg"
                    }
                    style={{
                      color: "transparent",
                      borderRadius: "1000px",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </a>
            </div>
          </div>
          <div className="c-lmqlYv">
            <h1>
              <a>{activeUser?.fullName}</a>
            </h1>
            <div className="c-bKKKhl">
              <div
                className="cursor-pointer copy-trigger flex items-center gap-1.5"
                data-state="closed"
              >
                <p
                  onClick={() =>
                    navigator.clipboard.writeText(activeUser?.address)
                  }
                  className="publicAddr publicAddress margin-0 cursor-pointer"
                >
                  {shortenAddress(activeUser?.address)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-base200 h-[1px] w-full mb-4 !mb-0" />
        <div className="flex w-full flex-col gap-2">
          <div className="outline-none focus:outline-none" tabIndex={-1}>
            <div className="flex h-11 w-full cursor-pointer flex-col gap-y-1 md:h-[54px] md:px-3 md:pt-2 md:hover:bg-neutral50">
              <p className="min-h-[16px] text-left text-base-m text-base400 md:text-base-s">
                {network}
              </p>
              <div className="flex w-full items-center justify-between font-base text-base900">
                <h3 className="font-title text-title-m font-medium ">
                  {icoToken?.maticBal.slice(0, 8)} {currency}{" "}
                  {activeUser?.address.toLowerCase() == icoToken?.address
                    ? "(Yes)"
                    : `(NO)`}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex max-md:gap-4 md:gap-2 md:px-2 pb-3">
            <div className="flex-1">
              <button
                onClick={() => setTokenICO(true)}
                className="c-bPnuSX c-bPnuSX-cTUqzc-fullWidth-true c-bPnuSX-SFeiM-size-S c-bPnuSX-iRULOu-variant-tertiary"
              >
                Token ICO
              </button>
            </div>
            <div className="flex-1">
              <button
                onClick={() => setOpenSend(true)}
                className="c-bPnuSX c-bPnuSX-cTUqzc-fullWidth-true c-bPnuSX-SFeiM-size-S c-bPnuSX-iRULOu-variant-tertiary"
              >
                Send
              </button>
            </div>
          </div>
        </div>
        <div className="bg-base200 h-[1px] w-full mb-4 !mb-2" />
        <a onClick={() => setopenComponent("Profile")}>
          <div className="c-cyzOWz">My Profile</div>
        </a>
        <a onClick={() => setopenComponent("Explore")}>
          <div className="c-cyzOWz">Explore</div>
        </a>
        <a href="/create">
          <div className="c-cyzOWz">Create</div>
        </a>
        <div
          onClick={() => LOGOUT()}
          className="c-eewFZR c-dRdjRq c-eewFZR-hKUpcB-variant-desktop"
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
