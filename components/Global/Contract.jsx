import React, { useState, useEffect, useContext } from "react";

import { Contract1 } from "../SVG/index";
//IMPORTING CONTRCT DATA
import { MusicNFTContext } from "../../context/context";
import { shortenAddress } from "../../utils/utils";

const Contract = ({ setContractId, contractId, musicNFT_Address }) => {
  const { fetchMusicNFT } = useContext(MusicNFTContext);
  const [nftMusic, setNftMusic] = useState();

  useEffect(() => {
    fetchMusicNFT(contractId).then((items) => {
      setNftMusic(items);
      console.log(items);
    });
  }, []);

  return (
    <div
      className="c-kZStZF c-kZStZF-ihcRhWX-css"
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
                Contract
              </div>
            </div>
            <button
              onClick={() => setContractId("")}
              className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-ibJzEHE-css"
            >
              <Contract1 />
            </button>
          </div>
        </div>
        <div className="c-epuwnk c-epuwnk-jFYYxX-withoutPaddingBottom-true pb-4">
          <div className="flex justify-center [&>div>div>div]:overflow-visible [&>div]:mt-0 [&>div]:w-full [&_[dir='ltr']]:p-0 [&_[role='tabpanel']]:w-[unset] mb-1">
            <div className="mx-auto mt-3 flex w-full lt:mt-8 lt:max-w-sm">
              <div className="flex w-full flex-col rounded-md lt:max-w-sm">
                <div className="w-full overflow-hidden rounded-t-lg bg-white flex border-b border-base200 pb-4">
                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex w-full items-center overflow-hidden">
                      <div className="flex-shrink-0">
                        <img
                          alt="music"
                          width={48}
                          height={48}
                          src={nftMusic?.imageURL}
                          style={{
                            color: "transparent",
                            borderRadius: "8px",
                            aspectRatio: "1 / 1",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="ml-3 flex flex-col justify-center gap-[6px] overflow-hidden whitespace-nowrap">
                        <a>
                          <h4 className="overflow-hidden text-ellipsis font-title text-title-xs font-medium text-base800">
                            {nftMusic?.title}
                          </h4>
                        </a>
                        <a className="hover:cursor-pointer">
                          <h5 className="overflow-hidden text-ellipsis text-kicker-xs tracking-normal text-base500 ">
                            {shortenAddress(nftMusic?.seller)}
                          </h5>
                        </a>
                      </div>
                    </div>
                    <button className="c-ebvTKE c-ebvTKE-dWdcHf-variant-tertiary c-ebvTKE-ihMrBgX-css">
                      #{nftMusic?.tokenId}
                    </button>
                  </div>
                </div>
                <p className="font-base text-base-m font-medium text-base500">
                  {nftMusic?.description}
                </p>
                <audio className="new_full_width_audio mt-8" controls>
                  <source src={nftMusic?.fileURL} type="audio/ogg" />
                  <source src={nftMusic?.fileURL} type="audio/mpeg" />
                  Your browser dose not support the audio tag
                </audio>
                <div className="flex justify-between mt-8 justify-center">
                  <p className="font-base text-base-m font-medium text-base500">
                    <strong>Contract Address</strong>
                  </p>
                  <a
                    className="c-bPnuSX c-bPnuSX-SFeiM-size-S c-bPnuSX-kiaVWo-variant-primary min-w-none w-fit !px-3 !py-2"
                    target="_blank"
                    href={`https://www.oklink.com/amoy/address/${musicNFT_Address}`}
                  >
                    Check
                  </a>
                </div>

                <p className="font-base text-base-m mt-8 font-medium text-base500">
                  All the exclisive rights of the music nft and artists, in
                  reference to the smart contract Identity. And the holder of
                  the music nft in this plactform, by{" "}
                  <strong>{shortenAddress(nftMusic?.seller)}</strong>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contract;
