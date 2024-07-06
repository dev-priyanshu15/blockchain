import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";

//INTERNAL  IMPORT
import {
  MUSIC_NFT_CONTARCT,
  MUSIC_ICO_CONTARCT,
  connectWallet,
  fetchMusicNFT,
  musicNFT_Address,
  OWNER_ADDRESS,
  VERIFY_AMOUNT,
  CREDIT_AMOUNT,
  REWARD_TOKEN,
  rewardLock,
} from "./constants";

export const MusicNFTContext = React.createContext();

export const MusicNFTProvider = ({ children }) => {
  const MUSIC_DAPP = "Music Dapp";
  const currency = "MATIC";
  const network = "Polygon";

  const [loader, setLoader] = useState(false);

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  //---CREATENFT FUNCTION
  const createMusicNFT = async (title, fileURL, imageURL, description) => {
    if (!title || !fileURL || !imageURL || !description)
      return console.log("Data Is Missing");

    const data = JSON.stringify({ title, fileURL, imageURL, description });
    //
    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: `f126cbe80d0f2d5a9612`,
          pinata_secret_api_key: `1c5550f1ed96321f0514a379976b5c74e9b18250fd37726500a65c019de4edd9`,
          "Content-Type": "application/json",
        },
      });

      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      console.log(url);

      const returnData = await createSale(url);
      return returnData;
    } catch (error) {
      console.log(error);
    }
  };

  //--- createSale FUNCTION
  const createSale = async (url) => {
    try {
      const address = await connectWallet();
      const contract = await MUSIC_NFT_CONTARCT();

      const currentTokenId = await contract._tokenIds();

      const transaction = await contract.createToken(url);

      await transaction.wait();

      const details = {
        transaction,
        currentTokenId: currentTokenId.toNumber() + 1,
      };
      return details;
    } catch (error) {
      console.log(error);
    }
  };

  //--- ICO
  const musicICO = async () => {
    try {
      const address = await connectWallet();
      const contract = await MUSIC_ICO_CONTARCT();

      const toeknDetails = await contract.getTokenDetails();

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const signer = provider.getSigner();

      const maticBal = await signer.getBalance();

      const TBC_TOKEN = {
        toeknBal: ethers.utils.formatEther(toeknDetails.balance.toString()),
        name: toeknDetails.name,
        symbol: toeknDetails.symbol,
        supply: ethers.utils.formatEther(toeknDetails.supply.toString()),
        tokenPrice: ethers.utils.formatEther(
          toeknDetails.tokenPrice.toString()
        ),
        tokenAddr: toeknDetails.tokenAddr,
        maticBal: ethers.utils.formatEther(maticBal.toString()),
        address: address.toLowerCase(),
      };

      return TBC_TOKEN;
    } catch (error) {
      console.log(error);
    }
  };

  //BUY TOKEN
  const buyToken = async (amount) => {
    try {
      setLoader(true);
      const address = await connectWallet();
      const contract = await MUSIC_ICO_CONTARCT();

      const toeknDetails = await contract.getTokenDetails();
      const avalableToken = ethers.utils.formatEther(
        toeknDetails.balance.toString()
      );

      if (avalableToken > 1) {
        const price =
          ethers.utils.formatEther(toeknDetails.tokenPrice.toString()) *
          Number(amount);

        const payAmount = ethers.utils.parseUnits(price.toString(), "ether");

        console.log(payAmount);

        const transaction = await contract.buyToken(Number(amount), {
          value: payAmount.toString(),
          gasLimit: ethers.utils.hexlify(8000000),
        });

        await transaction.wait();
        setLoader(false);
        notifySuccess("Transaction successfully");
        console.log(transaction);
      }
    } catch (error) {
      console.log(error);
      notifyError("error try again later");
      setLoader(false);
    }
  };

  //TRANSFER ETHER
  const transferEther = async (amount, _receiver) => {
    try {
      setLoader(true);
      const address = await connectWallet();
      const contract = await MUSIC_ICO_CONTARCT();

      const payAmount = ethers.utils.parseUnits(amount.toString(), "ether");

      const transaction = await contract.transferEther(_receiver, payAmount, {
        value: payAmount.toString(),
        gasLimit: ethers.utils.hexlify(8000000),
      });

      await transaction.wait();
      setLoader(false);
      notifySuccess("Transaction successfully");
      console.log(transaction);
    } catch (error) {
      console.log(error);
      notifyError("error try again later");
      setLoader(false);
    }
  };

  ///VERIFY_ACCOUNT
  const transferToOwnerAcc = async (VERIFY_AMOUNT) => {
    try {
      setLoader(true);
      const address = await connectWallet();
      const contract = await MUSIC_ICO_CONTARCT();

      const payAmount = ethers.utils.parseUnits(
        VERIFY_AMOUNT.toString(),
        "ether"
      );

      const transaction = await contract.transferToOwner(payAmount, {
        value: payAmount.toString(),
        gasLimit: ethers.utils.hexlify(8000000),
      });

      await transaction.wait();

      console.log(transaction);
      return transaction;
    } catch (err) {
      console.log(err);
      setLoader(false);
      notifyError("Try again later Context");
    }
  };

  //REWARD USER TOKEN
  const rewardToken = async (amount) => {
    try {
      setLoader(true);

      const address = await connectWallet();
      const contract = await MUSIC_ICO_CONTARCT();

      const toeknDetails = await contract.getTokenDetails();
      const avalableToken = ethers.utils.formatEther(
        toeknDetails.balance.toString()
      );

      if (avalableToken > 1) {
        const transaction = await contract.tokenReward(Number(amount), {
          gasLimit: ethers.utils.hexlify(8000000),
        });

        await transaction.wait();
        console.log(transaction);

        return transaction;
      }
    } catch (error) {
      console.log(error);
      notifyError("error try again later");
      setLoader(false);
    }
  };

  return (
    <MusicNFTContext.Provider
      value={{
        createMusicNFT,
        fetchMusicNFT,
        musicICO,
        buyToken,
        transferEther,
        transferToOwnerAcc,
        rewardToken,
        rewardLock,
        REWARD_TOKEN,
        musicNFT_Address,
        currency,
        network,
        OWNER_ADDRESS,
        VERIFY_AMOUNT,
        CREDIT_AMOUNT,
        loader,
        setLoader,
      }}
    >
      {children}
    </MusicNFTContext.Provider>
  );
};
