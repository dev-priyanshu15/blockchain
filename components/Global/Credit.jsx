import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import axios from "axios";
import toast from "react-hot-toast";

import { Collect1, Collect2, Collect3, Collect4 } from "../SVG/index";
//IMPORTING CONTRCT DATA
import { MusicNFTContext } from "../../context/context";

const Credit = ({ setCredit, activeUser, setLoader, transferToOwnerAcc }) => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const { OWNER_ADDRESS, VERIFY_AMOUNT, CREDIT_AMOUNT, currency, network } =
    useContext(MusicNFTContext);
  ///CHECK_AUTH
  const CHECK_AUTH = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "/api/auth/refetch",
        withCredentials: true,
      });
      let user;
      if (res.status === 200) {
        user = res.data;
        console.log(res.data._id);
      }
      return user;
    } catch (err) {
      console.log(err);
    }
  };

  ///VERIFY_ACCOUNT
  const VERIFY_ACCOUNT = async (VERIFY_AMOUNT) => {
    try {
      const transaction = await transferToOwnerAcc(VERIFY_AMOUNT);
      const currentUser = await CHECK_AUTH();
      console.log(transaction);
      if (transaction.hash) {
        //BACKEND
        const res = await axios({
          method: "PUT",
          url: `/api/user/verify/${currentUser._id}`,
          withCredentials: true,
          data: {
            verify: true,
          },
        });

        if (res.status === 200) {
          notifySuccess("Transaction updated Successfully");
          window.location.reload();
        }
      }
    } catch (err) {
      console.log(err);
      setLoader(false);
      notifyError("Try again later");
    }
  };

  ///VERIFY_ACCOUNT
  const BUY_CREDIT = async (VERIFY_AMOUNT) => {
    try {
      const transaction = await transferToOwnerAcc(VERIFY_AMOUNT);
      const currentUser = await CHECK_AUTH();
      console.log(transaction);

      if (transaction.hash) {
        const res = await axios({
          method: "PUT",
          url: `/api/user/credit/${currentUser._id}`,
          withCredentials: true,
          data: {
            credit: Number(activeUser?.credit) + 50,
          },
        });

        if (res.status === 200) {
          notifySuccess("Transaction updated Successfully");
          window.location.reload();
        }
      }
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

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
                Get Cradit
              </div>
            </div>
            <button
              onClick={() => setCredit(false)}
              className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-ibJzEHE-css"
            >
              <Collect1 />
            </button>
          </div>
        </div>
        <div className="c-epuwnk c-epuwnk-jFYYxX-withoutPaddingBottom-true pb-4">
          <div className="flex justify-center [&>div>div>div]:overflow-visible [&>div]:mt-0 [&>div]:w-full [&_[dir='ltr']]:p-0 [&_[role='tabpanel']]:w-[unset] mb-1">
            <div className="mx-auto mt-3 flex w-full lt:mt-8 lt:max-w-sm">
              <div className="flex w-full flex-col rounded-md lt:max-w-sm">
                <div className="z-above1 flex w-full flex-col gap-4 bg-white pt-4">
                  {!activeUser?.verify && (
                    <div className="flex flex-col gap-1.5 overflow-hidden rounded-md bg-base900 ring-[3px] ring-base900 cursor-pointer">
                      <div className="block rounded-md bg-white hover:bg-base50">
                        <div className="flex flex-col gap-1 p-3">
                          <div className="flex flex-row items-start justify-between">
                            <div className="flex flex-col gap-1">
                              <h2 className="mb-0.5 font-title text-title-m font-medium text-base900">
                                Verify Account
                              </h2>
                              <p className="font-base text-base-m font-medium text-base500">
                                Get your account verify and get verify badge
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 flex w-full items-center">
                            <div className="flex items-center gap-1">
                              <button className="flex overflow-visible transition-opacity md:hover:opacity-100 [&_svg]:overflow-visible  data-[state=closed]:opacity-30 data-[state=instant-open]:opacity-100 w-4 [&_svg]:w-4">
                                <Collect2 />
                              </button>
                              <span className="font-base text-base-m font-semibold">
                                {VERIFY_AMOUNT} {currency}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 flex w-full gap-2 [&_a]:w-full">
                            <button
                              onClick={() => VERIFY_ACCOUNT(VERIFY_AMOUNT)}
                              className="c-bPnuSX c-bPnuSX-cTUqzc-fullWidth-true c-bPnuSX-cMJTpp-size-L text-white c-bPnuSX-fHLUdS-variant-fuchsia bg-base900"
                            >
                              Verify Now
                            </button>

                            <button className="c-bPnuSX c-bPnuSX-hEOhbx-size-squared c-bPnuSX-UazGY-hasIcon-true c-bPnuSX-iRULOu-variant-tertiary group aspect-square flex-shrink-0 transition-all duration-200 ease-in-out disabled:shadow-transparent hover:bg-white hover:shadow-tertiary h-11 w-11 text-base-l">
                              <div className="flex items-center">
                                <div className="group-hover:animate-shake group-disabled:animate-none">
                                  <Collect3 />
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex w-full flex-col rounded-md ring-[1px] ring-base300 hover:bg-base50 cursor-pointer">
                    <div>
                      <div className="flex flex-col gap-1 p-3">
                        <div className="flex flex-row items-start justify-between gap-2">
                          <div className="flex flex-col gap-1">
                            <h2 className="limited-animated-text font-title text-title-m font-medium">
                              Limited Edition
                            </h2>
                            <p className="whitespace-nowrap font-base text-base-m font-medium text-base500">
                              Get more credit for minting music
                            </p>
                          </div>
                          <div className="line flex h-6 flex-shrink-0 items-center rounded-full bg-base900 px-2 font-base text-base-s font-semibold text-white">
                            {activeUser?.credit || 0} left
                          </div>
                        </div>
                        <div className="mt-2 flex w-full items-center justify-between">
                          <div className="flex items-center gap-1">
                            <button className="flex overflow-visible transition-opacity md:hover:opacity-100 [&_svg]:overflow-visible  data-[state=closed]:opacity-30 data-[state=instant-open]:opacity-100 w-4 [&_svg]:w-4">
                              <Collect4 />
                            </button>
                            <span className="font-base text-base-m font-semibold">
                              0.005 ETH
                            </span>
                            <p className="ml-1 text-base-m font-medium text-base500">
                              0/50&nbsp;mints
                            </p>
                            <div className="flex items-center justify-center" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => BUY_CREDIT(CREDIT_AMOUNT, OWNER_ADDRESS)}
                      className="c-bPnuSX c-bPnuSX-kAMERu-size-XS c-bPnuSX-jQfaRh-variant-text -my-2 w-full p-0 text-center font-base text-base-s text-base500 outline-base300 hover:text-base600 text-white bg-base900"
                    >
                      Get Credit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credit;
