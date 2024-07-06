import React, { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";

import { Email, Password, MetaMass } from "../SVG/index";

const Wallet = () => {
  //REGISTER
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [metaMass, setMetaMass] = useState("Create With MetaMass");
  const [address, setAddress] = useState();

  //LOGIN
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //AUTH
  const [authComponent, setAuthComponent] = useState("Login");

  //METAMASS CREATE
  const checkConnection = async () => {
    try {
      setMetaMass("Connecting...");
      if (!window.ethereum) return console.log("Install MateMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(accounts[0]);
      setMetaMass("Create With MetaMass");
    } catch (err) {
      console.log(err);
    }
  };

  ///REGISTER_USER
  const REGISTER_USER = async (username, email, password) => {
    try {
      const wallet = ethers.Wallet.createRandom();
      const response = await axios({
        method: "POST",
        url: "/api/auth/register",
        withCredentials: true,
        data: {
          username: username,
          email: email,
          password: password,
          address: wallet.address,
          privateKey: wallet.privateKey,
          mnemonic: wallet.mnemonic.phrase,
        },
      });
      if (response.status == 201) {
        setMetaMass("Created successfully");
        console.log(response);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  //METAMASS CREATE
  const METAMASS_USER = async (username, email, password, address) => {
    try {
      setMetaMass("Creating...");

      const response = await axios({
        method: "POST",
        url: "/api/auth/register",
        withCredentials: true,
        data: {
          username: username,
          email: email,
          password: password,
          address: address,
          privateKey: "Check your metamask for PrivateKey",
          mnemonic: "Not Available, Private to you",
        },
      });
      if (response.status == 201) {
        setMetaMass("Created successfully");
        console.log(response);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  ///REGISTER_USER
  const LOGIN_USER = async (loginEmail, loginPassword) => {
    try {
      const res = await axios({
        method: "POST",
        url: "/api/auth/login",
        withCredentials: true,
        data: {
          email: loginEmail,
          password: loginPassword,
        },
      });

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form_container">
      <div class="login_background"></div>
      <div className="logo_container">
        <img src="/theblockchaincoders.jpg" alt="" />
      </div>
      <div className="title_container">
        {authComponent == "Login" ? (
          <p className="title">Login to your Account</p>
        ) : (
          <p className="title">Sign Up / Create Wallet</p>
        )}

        <span className="subtitle">
          Get started with our app, just create an account and enjoy the
          experience.
        </span>
      </div>
      <br />
      {authComponent == "Login" ? (
        <>
          <div className="input_container">
            <label className="input_label">Email</label>
            <Email />
            <input
              placeholder="your@mail.com"
              type="text"
              className="input_field"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="input_container">
            <label className="input_label">Password</label>
            <Password />
            <input
              placeholder="Password"
              type="text"
              className="input_field"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <button
            onClick={() => LOGIN_USER(loginEmail, loginPassword)}
            className="sign-in_btn"
          >
            <span>Login In</span>
          </button>
        </>
      ) : (
        <>
          <div className="input_container">
            <label className="input_label">Username</label>
            <Email />
            <input
              placeholder="username"
              type="text"
              className="input_field"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input_container">
            <label className="input_label">Email</label>
            <Email />
            <input
              placeholder="your@mail.com"
              type="text"
              className="input_field"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input_container">
            <label className="input_label">Password</label>
            <Password />
            <input
              placeholder="Password"
              type="text"
              className="input_field"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            title="Sign In"
            onClick={() => REGISTER_USER(username, email, password)}
            className="sign-in_btn"
          >
            <span>Create Account</span>
          </button>
        </>
      )}

      {authComponent == "Sign Up" && (
        <div className="separator">
          <hr className="line" />
          <span>Or</span>
          <hr className="line" />
        </div>
      )}

      {authComponent == "Sign Up" && !address ? (
        <button onClick={() => checkConnection()} className="sign-in_apl">
          <span>Connect Wallet</span>
        </button>
      ) : address ? (
        <button
          onClick={() => METAMASS_USER(username, email, password, address)}
          className="sign-in_apl"
        >
          <span>{metaMass}</span>
        </button>
      ) : (
        ""
      )}

      {authComponent == "Login" ? (
        <p onClick={() => setAuthComponent("Sign Up")} className="note">
          Create Account &amp; Sign Up
        </p>
      ) : (
        <p onClick={() => setAuthComponent("Login")} className="note">
          Create Account &amp; Login
        </p>
      )}
    </div>
  );
};

export default Wallet;
