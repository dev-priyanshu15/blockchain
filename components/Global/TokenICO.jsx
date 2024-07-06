import React, { useState, useEffect, useContext } from "react";

import { Bridge1, Bridge2, Bridge3 } from "../SVG/index";
//IMPORTING CONTRCT DATA
import { MusicNFTContext } from "../../context/context";

const Bridge = ({ setTokenICO, setOpenMenu, setLoader }) => {
  const { musicICO, buyToken, currency, network } = useContext(MusicNFTContext);

  const [amount, setAmount] = useState();
  const [icoToken, setIcoToken] = useState();

  useEffect(() => {
    musicICO().then((items) => {
      setIcoToken(items);
    });
  }, []);

  return (
    <div
      className="c-kZStZF c-kZStZF-ijLWysc-css"
      style={{ pointerEvents: "auto" }}
    >
      <div
        className="c-gLOVln c-gLOVln-cewiJJ-size-small"
        tabIndex={-1}
        style={{ pointerEvents: "auto" }}
      >
        <div className="z-above1 bg-white">
          <div className="flex justify-between">
            <div className="flex flex-col justify-center">
              <div className="font-title text-title-s font-medium md:text-title-l">
                Token ICO
              </div>
            </div>
            <button
              onClick={() => (setTokenICO(false), setOpenMenu(false))}
              className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-ibJzEHE-css"
            >
              <Bridge1 />
            </button>
          </div>
        </div>
        <div className="c-epuwnk pt-4 pb-1">
          <div className="grid gap-6">
            <span>Currently our ICO sale of {icoToken?.name}.</span>
            <div className="grid gap-4">
              <div className="grid gap-1">
                <div className="grid gap-1">
                  <div className="flex rounded-[6px] border border-base200">
                    <div className="flex items-center gap-2 py-3 pl-2 pr-4">
                      {/* <Bridge2 /> */}
                      <div className="grid gap-[2px]">
                        <div className="text-title-xs font-medium text-base800">
                          {icoToken?.symbol}
                        </div>
                        <div className="text-base-s leading-[14px]">
                          {icoToken?.name}
                        </div>
                      </div>
                    </div>
                    <input
                      className="block w-full rounded-[6px] border-0 bg-base200 px-[11px] py-3 font-base text-base-m text-base800 transition-all outline-none ring-1 ring-inset ring-base200 placeholder:text-base500 focus:ring-2 focus:ring-inset focus:ring-base800 hover:border-base300 hover:bg-base50 hover:ring-1 rounded-l-none"
                      type="number"
                      placeholder="Amount"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="text-base-s text-base400">
                    Balance: {icoToken?.toeknBal} (
                    {`${icoToken?.tokenPrice} PER TOKEN`} )
                  </div>
                </div>
              </div>
              <div className="grid gap-1">
                <div className="text-base-l font-semibold">Get</div>
                <div className="grid gap-1">
                  <div className="flex rounded-[6px] border border-base200">
                    <div className="flex items-center gap-2 py-3 pl-2 pr-4">
                      {/* <Bridge3 /> */}
                      <div className="grid gap-[2px]">
                        <div className="text-title-xs font-medium text-base800">
                          {currency}
                        </div>
                        <div className="text-base-s leading-[14px]">
                          {network}
                        </div>
                      </div>
                    </div>
                    <input
                      className="block w-full rounded-[6px] border-0 bg-base200 px-[11px] py-3 font-base text-base-m text-base800 transition-all outline-none ring-1 ring-inset ring-base200 placeholder:text-base500 focus:ring-2 focus:ring-inset focus:ring-base800 hover:border-base300 hover:bg-base50 hover:ring-1 rounded-l-none"
                      type="number"
                      value={
                        amount ? amount * icoToken?.tokenPrice : "Output value"
                      }
                      placeholder="Output value"
                    />
                  </div>
                  <div className="text-base-s text-base400">
                    Balance: {icoToken?.maticBal} {currency}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => buyToken(amount)}
              className="c-bPnuSX c-bPnuSX-cTUqzc-fullWidth-true c-bPnuSX-cMJTpp-size-L c-bPnuSX-kiaVWo-variant-primary w-full flex-1"
            >
              Buy Token
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bridge;
