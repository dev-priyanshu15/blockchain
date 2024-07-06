import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

import { Send1, Send2 } from "../SVG/index";

const Send = ({ setOpenSend, setOpenMenu, setLoader, transferEther }) => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const [accountBal, setAccountBal] = useState();
  const [amount, setAmount] = useState(0);
  const [addressTo, setAddressTo] = useState();

  const [currentAccount, setCurrentAccount] = useState();

  // const transferEther = async (amount, addressTo) => {
  //   try {
  //     if (!ethereum) return alert("Please install MetaMask.");
  //     setLoader(true);

  //     const accounts = await ethereum.request({
  //       method: "eth_requestAccounts",
  //     });

  //     const parsedAmount = ethers.utils.parseEther(amount);
  //     console.log(amount, addressTo, accounts[0]);

  //     const transaction = await ethereum.request({
  //       method: "eth_sendTransaction",
  //       params: [
  //         {
  //           from: accounts[0],
  //           to: addressTo,
  //           gas: "0x5208",
  //           value: parsedAmount._hex,
  //         },
  //       ],
  //     });
  //     if (transaction) {
  //       console.log(transaction);
  //       notifySuccess("Check MetaMask and wait");
  //       setLoader(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setLoader(false);
  //     notifyError("Transaction Failed");
  //   }
  // };

  //NETWORK
  const networks = {
    polygon_amoy: {
      chainId: `0x${Number(80002).toString(16)}`,
      chainName: "Polygon Amoy",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc-amoy.polygon.technology/"],
      blockExplorerUrls: ["https://www.oklink.com/amoy"],
    },
    polygon_mumbai: {
      chainId: `0x${Number(80001).toString(16)}`,
      chainName: "Polygon Mumbai",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    },
    polygon: {
      chainId: `0x${Number(137).toString(16)}`,
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ankr.com/polygon"],
      blockExplorerUrls: ["https://polygonscan.com/"],
    },
    bsc: {
      chainId: `0x${Number(56).toString(16)}`,
      chainName: "Binance Smart Chain Mainnet",
      nativeCurrency: {
        name: "Binance Chain Native Token",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ankr.com/bsc"],
      blockExplorerUrls: ["https://bscscan.com"],
    },
  };

  const changeNetwork = async ({ networkName }) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName],
          },
        ],
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  //
  const handleNetworkSwitch = async () => {
    const networkName = "polygon_amoy";
    await changeNetwork({ networkName });
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const network = await handleNetworkSwitch();
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const balance = await provider.getBalance(accounts[0]);

      const balanceInEther = ethers.utils.formatEther(balance);

      setAccountBal(balanceInEther);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

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
                Send ETH
              </div>
            </div>
            <button
              onClick={() => (setOpenSend(false), setOpenMenu(false))}
              className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-ibJzEHE-css"
            >
              <Send1 />
            </button>
          </div>
        </div>
        <div className="c-epuwnk pt-4 pb-1">
          <div className="grid gap-6">
            <div className="grid gap-4">
              <div className="grid gap-1">
                <div className="text-base-l font-semibold text-black">
                  Network
                </div>
                <button className="flex w-full items-center justify-between rounded-[6px] border-0 bg-base200 px-2 py-[5px] font-base !text-base-m transition-all disabled:bg-base50 disabled:text-base400 outline-none ring-0 placeholder:text-base500 [&>span:first-child]:w-full [&>span>div:first-child]:px-0 [&>span>div:first-child]:pr-2 pointer-events-auto cursor-pointer hover:border-base300 hover:bg-base50 text-base800">
                  <span style={{ pointerEvents: "none" }}>
                    <div className="items-center justify-between px-3 py-1.5 !text-base-m font-medium text-base800 flex w-full cursor-pointer">
                      <div className="relative flex w-full items-center px-2">
                        <div className="-ml-1.5 mr-2">
                          <img
                            src="polygon.jpg"
                            style={{
                              width: "20px",
                              height: "22px",
                            }}
                            alt=""
                          />
                        </div>
                        <div className="text-left">
                          <p className="text-base-m font-semibold text-base800">
                            Polygon
                          </p>
                        </div>
                      </div>
                    </div>
                  </span>
                </button>
              </div>
              <div className="grid gap-1">
                <div className="text-base-l font-semibold text-black">
                  Amount
                </div>
                <div className="grid gap-1">
                  <div className="flex rounded-[6px] border border-base200">
                    <input
                      className="block w-full rounded-[6px] border-0 bg-base200 px-[11px] py-3 font-base text-base-m text-base800 transition-all outline-none ring-1 ring-inset ring-base200 placeholder:text-base500 focus:ring-2 focus:ring-inset focus:ring-base800 hover:border-base300 hover:bg-base50 hover:ring-1 rounded-l-none"
                      type="number"
                      placeholder="Amount"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="flex items-center gap-2 px-4 py-3">
                      <div className="text-title-xs font-medium text-base800">
                        MATIC
                      </div>
                    </div>
                  </div>
                  <div className="text-base-s text-base400">
                    Balance: {accountBal} MATIC
                  </div>
                </div>
              </div>
              <div className="grid gap-1">
                <div className="text-base-l font-semibold">Recipient</div>
                <div className="flex w-full min-w-0 flex-col gap-y-1">
                  <input
                    className="block w-full rounded-[6px] border-0 bg-base200 px-[11px] py-3 font-base text-base-m text-base800 transition-all outline-none ring-1 ring-inset ring-base200 placeholder:text-base500 focus:ring-2 focus:ring-inset focus:ring-base800 hover:border-base300 hover:bg-base50 hover:ring-1"
                    type="text"
                    placeholder="e.g. 0xB0A3... or wallet.eth"
                    onChange={(e) => setAddressTo(e.target.value)}
                  />
                </div>
                <div className="mt-1 flex w-full items-start gap-2">
                  <Send2 />
                  <p className="font-base text-base-s text-base500">
                    Eth sent to the wrong address cannot be recovered. Be sure
                    this is the correct wallet address.
                  </p>
                </div>
              </div>
            </div>
            {currentAccount ? (
              <button
                onClick={() => transferEther(amount, addressTo)}
                className="c-bPnuSX c-bPnuSX-cTUqzc-fullWidth-true c-bPnuSX-cMJTpp-size-L c-bPnuSX-kiaVWo-variant-primary w-full flex-1"
              >
                Send
              </button>
            ) : (
              <button
                onClick={() => connectWallet()}
                className="c-bPnuSX c-bPnuSX-cTUqzc-fullWidth-true c-bPnuSX-cMJTpp-size-L c-bPnuSX-kiaVWo-variant-primary w-full flex-1"
              >
                Connect wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Send;
