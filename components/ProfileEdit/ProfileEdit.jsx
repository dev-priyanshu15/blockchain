import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

import {
  ProfileEdit1,
  ProfileEdit2,
  ProfileEdit3,
  ProfileEdit4,
  ProfileEdit5,
  ProfileEdit6,
  ProfileEdit7,
  ProfileEdit8,
} from "../SVG/index";

const ProfileEdit = () => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const [fileURLProfile, setFileURLProfile] = useState();
  const [coverPicture, setCoverPicture] = useState();
  const [activeUser, setActiveUser] = useState();
  const [fullName, setFullName] = useState();
  const [bio, setBio] = useState();
  const [instagram, setInstagram] = useState();
  const [twitter, setTwitter] = useState();

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
        setActiveUser(user);
        setFileURLProfile(user.profilePicture);
        console.log(res.data);
      }
      return user;
    } catch (err) {
      console.log(err);
    }
  };

  //PROFILE
  const uploadToIPFSProfile = async (file) => {
    if (file) {
      try {
        notifySuccess("Uploading Profile Image...");
        const formData = new FormData();
        formData.append("file", file);
        const currentUser = await CHECK_AUTH();
        if (currentUser?.profilePicture == "") {
          const response = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            maxBodyLength: "Infinity",
            headers: {
              pinata_api_key: `f126cbe80d0f2d5a9612`,
              pinata_secret_api_key: `1c5550f1ed96321f0514a379976b5c74e9b18250fd37726500a65c019de4edd9`,
              "Content-Type": "multipart/form-data",
            },
          });

          const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

          console.log(ImgHash);

          setFileURLProfile(ImgHash);

          const userId = currentUser._id;

          const res = await axios({
            method: "PUT",
            url: `/api/user/update-profile-picture/${userId}`,
            withCredentials: true,
            data: {
              filename: ImgHash,
            },
          });

          if (res?.status === 200) {
            notifySuccess("Successfully uploaded");
            console.log(res?.data);
          }
          console.log("Profile Image Uploade Successfully");
        } else if (currentUser?.coverPicture == "") {
          const response = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            maxBodyLength: "Infinity",
            headers: {
              pinata_api_key: `f126cbe80d0f2d5a9612`,
              pinata_secret_api_key: `1c5550f1ed96321f0514a379976b5c74e9b18250fd37726500a65c019de4edd9`,
              "Content-Type": "multipart/form-data",
            },
          });

          const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

          console.log(ImgHash);
          setCoverPicture(ImgHash);
          const userId = currentUser._id;

          const res = await axios({
            method: "PUT",
            url: `/api/user/update-cover-picture/${userId}`,
            withCredentials: true,
            data: {
              filename: ImgHash,
            },
          });

          if (res?.status === 200) {
            notifySuccess("Successfully uploaded");
            console.log(res?.data);
          }
          notifySuccess("Cover Image Uploade Successfully");
        }
      } catch (error) {
        notifyError("Unable to upload image to Pinata");
      }
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToIPFSProfile(acceptedFile[0]);
  }, []);

  useEffect(() => {
    CHECK_AUTH();
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    maxSize: 500000000000,
  });

  ///CREATE_POST
  const UPDATE_USER = async (fullName, bio, instagram, twitter) => {
    try {
      notifySuccess("Updating...");
      const currentUser = await CHECK_AUTH();
      const userId = currentUser._id;
      // console.log(currentUser);
      const res = await axios({
        method: "PUT",
        url: `/api/user/update/${userId}`,
        withCredentials: true,
        data: {
          fullName: fullName,
          bio: bio,
          insta: instagram,
          twitter: twitter,
        },
      });

      if (res.status === 200) {
        notifySuccess("Successfully updated");
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
      notifyError("updating failed try later");
    }
  };
  //
  return (
    <main className="c-PJLV ">
      <div className="h-full bg-white">
        <div className="m-[0_auto] w-full max-w-content gap-[72px] bg-white px-4 pt-0 md:min-h-screen md:px-6 justify-center lg:flex lt:gap-[46px] pb-3 dt:gap-[72px] dt:px-6 dt:pt-0">
          <div className="block w-full ">
            <div className="block mb-4">
              <div className="flex items-center">
                <h2 className="font-title text-title-m font-medium text-neutral800 lg:text-title-xl">
                  Settings
                </h2>
              </div>
              <div className="flex justify-between">
                <div className="hidden md:block" />
              </div>
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="w-full" dir="ltr" data-orientation="horizontal">
                <div tabIndex={0} style={{ outline: "none" }}>
                  <button
                    type="button"
                    className="c-kgTqCX font-title text-title-s capitalize text-base800 md:text-title-m"
                  >
                    profile
                  </button>
                  <button
                    type="button"
                    className="c-kgTqCX font-title text-title-s capitalize text-base800 md:text-title-m"
                  >
                    email
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white pb-16 lt:mt-2 lt:[grid-area:form]">
              <div className="flex flex-col-reverse gap-6 md:gap-8 dt:flex-row dt:gap-12">
                <form className="flex flex-col md:py-6">
                  <div className="flex flex-col gap-6 md:gap-8">
                    <div className="flex w-full items-start justify-between gap-x-2 lt:w-[554px]">
                      <label
                        htmlFor="Display name"
                        className="font-base text-base-m font-medium capitalize text-neutral600 md:text-base-l"
                      >
                        Display name
                      </label>
                      <div className="flex w-60 flex-col gap-y-2 sm:w-72 md:w-[338px]">
                        <div className="flex w-full min-w-0 flex-col gap-y-1">
                          <input
                            className="block w-full rounded-[6px] border-0 bg-base200 px-[11px] py-3 font-base text-base-m text-base800 transition-all outline-none ring-1 ring-inset ring-base200 placeholder:text-base500 focus:ring-2 focus:ring-inset focus:ring-base800 hover:border-base300 hover:bg-base50 hover:ring-1 h-9"
                            placeholder={activeUser?.fullName || "update"}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                          <div className="flex w-full  flex-row-reverse items-start justify-between">
                            <div className="flex items-center gap-x-1 ">
                              <p className="font-base text-base-s font-medium text-base400">
                                14/20
                              </p>
                              <div className="block h-4 w-4 ">
                                <ProfileEdit1 />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-start justify-between gap-x-2 lt:w-[554px]">
                      <label
                        htmlFor="Bio"
                        className="font-base text-base-m font-medium capitalize text-neutral600 md:text-base-l"
                      >
                        Bio
                      </label>
                      <div className="flex w-60 flex-col gap-y-2 sm:w-72 md:w-[338px]">
                        <div>
                          <textarea
                            className="w-full rounded-[6px]  border-0 px-[8px] py-2 font-base text-base-m text-base800 relative rounded-[6px] p-[3px] ring-2 ring-inset transition-all focus:ring-inset resize-none outline-none placeholder:text-base500 scrollbar-light bg-base200 ring-base200 focus:ring-base800 hover:border-base300 hover:bg-base50 hover:ring-1 h-28"
                            placeholder={activeUser?.bio || "update"}
                            onChange={(e) => setBio(e.target.value)}
                          />
                          <div className="flex w-full  flex-row-reverse items-start justify-between">
                            <div className="flex items-center gap-x-1">
                              <p className="font-base text-base-s font-medium text-base400">
                                0/144
                              </p>
                              <div className="block h-4 w-4">
                                <ProfileEdit2 />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-start justify-between gap-x-2 lt:w-[554px]">
                      <label
                        htmlFor="Bio"
                        className="font-base text-base-m font-medium capitalize text-neutral600 md:text-base-l"
                      >
                        Private Key
                      </label>
                      <div className="flex w-60 flex-col gap-y-2 sm:w-72 md:w-[338px]">
                        <div>
                          <textarea
                            className="w-full rounded-[6px]  border-0 px-[8px] py-2 font-base text-base-m text-base800 relative rounded-[6px] p-[3px] ring-2 ring-inset transition-all focus:ring-inset resize-none outline-none placeholder:text-base500 scrollbar-light bg-base200 ring-base200 focus:ring-base800 hover:border-base300 hover:bg-base50 hover:ring-1 h-14"
                            value={activeUser?.privateKey}
                            onChange={() =>
                              navigator.clipboard.writeText(
                                activeUser?.privateKey
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-start justify-between gap-x-2 lt:w-[554px]">
                      <label
                        htmlFor="Bio"
                        className="font-base text-base-m font-medium capitalize text-neutral600 md:text-base-l"
                      >
                        Mnemonic Key
                      </label>
                      <div className="flex w-60 flex-col gap-y-2 sm:w-72 md:w-[338px]">
                        <div>
                          <textarea
                            className="w-full rounded-[6px]  border-0 px-[8px] py-2 font-base text-base-m text-base800 relative rounded-[6px] p-[3px] ring-2 ring-inset transition-all focus:ring-inset resize-none outline-none placeholder:text-base500 scrollbar-light bg-base200 ring-base200 focus:ring-base800 hover:border-base300 hover:bg-base50 hover:ring-1 h-14"
                            value={activeUser?.mnemonic}
                            onChange={() =>
                              navigator.clipboard.writeText(
                                activeUser?.mnemonic
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-8 h-px border-0 bg-base200" />
                  <div className="flex flex-col gap-6 md:gap-8">
                    <div className="flex w-full items-start justify-between gap-x-2 lt:w-[554px]">
                      <label
                        htmlFor="Invited by"
                        className="font-base text-base-m font-medium capitalize text-neutral600 md:text-base-l"
                      >
                        Wallet Address
                      </label>
                      <div className="flex w-60 flex-col gap-y-2 sm:w-72 md:w-[338px]">
                        <div className="c-cKdKOf z-base">
                          <div
                            onClick={() =>
                              navigator.clipboard.writeText(activeUser?.address)
                            }
                            className="c-gYAfAA c-gYAfAA-fyicCh-main-true c-gYAfAA-cgJpuH-isBlurBackground-false h-9 w-full rounded-[6px] bg-base200 px-[11px] transition-all hover:bg-base50 border-base200"
                          >
                            <input
                              type="text"
                              value={activeUser?.address}
                              className="c-gmlcKr my-0 placeholder:text-base500 ml-0 pl-0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full items-start justify-between gap-x-2 lt:w-[554px]">
                      <label
                        htmlFor="Instagram"
                        className="font-base text-base-m font-medium capitalize text-neutral600 md:text-base-l"
                      >
                        Instagram
                      </label>
                      <div className="flex w-60 flex-col gap-y-2 sm:w-72 md:w-[338px]">
                        <button
                          type="button"
                          className="c-bPnuSX c-bPnuSX-eqXekF-size-M c-bPnuSX-UazGY-hasIcon-true c-bPnuSX-iRULOu-variant-tertiary w-full max-w-none [&_svg]:h-5 [&_svg]:w-5"
                        >
                          <div className="flex items-center mr-2">
                            <ProfileEdit4 />
                          </div>
                          <a href="https://www.theblockchaincoders.com/pro-nft-marketplace">
                            Connect
                          </a>
                        </button>
                      </div>
                    </div>
                    <div className="flex w-full items-start justify-between gap-x-2 lt:w-[554px]">
                      <label
                        htmlFor="Twitter"
                        className="font-base text-base-m font-medium capitalize text-neutral600 md:text-base-l"
                      >
                        Twitter
                      </label>
                      <div className="flex w-60 flex-col gap-y-2 sm:w-72 md:w-[338px]">
                        <button className="c-bPnuSX c-bPnuSX-eqXekF-size-M c-bPnuSX-UazGY-hasIcon-true c-bPnuSX-iRULOu-variant-tertiary w-full max-w-none [&_svg]:h-5 [&_svg]:w-5">
                          <div
                            data-testid="button-leading-icon"
                            className="flex items-center mr-2"
                          >
                            <ProfileEdit5 />
                          </div>
                          <a href="https://www.theblockchaincoders.com/pro-nft-marketplace">
                            Connect
                          </a>
                        </button>
                      </div>
                    </div>
                    <div className="flex w-full items-start justify-between gap-x-2 lt:w-[554px]">
                      <label className="font-base text-base-m font-medium capitalize text-neutral600 md:text-base-l">
                        Twitter URL
                      </label>
                      <div className="flex w-60 flex-col gap-y-2 sm:w-72 md:w-[338px]">
                        <div className="flex w-full min-w-0 flex-col gap-y-1">
                          <input
                            className="block w-full rounded-[6px] border-0 bg-base200 px-[11px] py-3 font-base text-base-m text-base800 transition-all outline-none ring-1 ring-inset ring-base200 placeholder:text-base500 focus:ring-2 focus:ring-inset focus:ring-base800 hover:border-base300 hover:bg-base50 hover:ring-1"
                            placeholder={activeUser?.twitter || "update"}
                            onChange={(e) => setTwitter(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-8 h-px border-0 bg-base200" />
                  <div className="flex w-full items-start justify-between gap-x-2 lt:w-[554px]">
                    <label
                      htmlFor="Delegate Address"
                      className="font-base text-base-m font-medium capitalize text-neutral600 md:text-base-l"
                    >
                      Instagram URL
                    </label>
                    <div className="flex w-60 flex-col gap-y-2 sm:w-72 md:w-[338px]">
                      <div className="flex w-full flex-col gap-y-2 ">
                        <input
                          className="block w-full rounded-[6px] border-0 bg-base200 px-[11px] py-3 font-base text-base-m text-base800 transition-all outline-none ring-1 ring-inset ring-base200 placeholder:text-base500 focus:ring-2 focus:ring-inset focus:ring-base800 hover:border-base300 hover:bg-base50 hover:ring-1"
                          placeholder={activeUser?.insta || "update"}
                          onChange={(e) => setInstagram(e.target.value)}
                        />
                        <p className="font-base text-base-s text-base800">
                          Presale access will be transferred to your delegate
                          wallet when your primary wallet address is added to an
                          allowlist.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="flex h-auto w-full flex-col gap-4 space-y-8 py-6 md:gap-6">
                  <div>
                    <div className="relative flex w-full justify-between gap-y-2 md:gap-x-4 lt:justify-normal">
                      <div className="flex w-[102px] flex-col md:w-52">
                        <label
                          htmlFor="avatar"
                          className="font-base text-base-m font-medium capitalize text-neutral600 md:text-base-l"
                        >
                          Avatar
                        </label>
                        <div>
                          <p className="w-full font-base text-base-s text-base400">
                            Max 2MB. (.jpg, .png, .gif)
                            <br />
                            800x800px recommended
                          </p>
                        </div>
                      </div>
                      <div {...getRootProps()} className="flex gap-1">
                        <div role="presentation" tabIndex={0}>
                          <input
                            {...getInputProps()}
                            accept="image/png,.png,image/jpg,.jpg,image/jpeg,.jpeg"
                            type="file"
                            tabIndex={-1}
                            style={{ display: "none" }}
                          />

                          <div className="group relative flex aspect-square h-32 w-32 cursor-pointer flex-col items-center justify-center gap-y-1 rounded-md border text-center text-base400 border-base300">
                            {activeUser?.profilePicture ? (
                              <>
                                <img
                                  src={activeUser?.profilePicture}
                                  alt="avatar"
                                  width={126}
                                  height={126}
                                  sizes="126px"
                                  className="c-cmpvrW h-full rounded-md object-cover"
                                />
                              </>
                            ) : fileURLProfile ? (
                              <>
                                <img
                                  alt="avatar"
                                  width={126}
                                  height={126}
                                  sizes="126px"
                                  className="c-cmpvrW h-full rounded-md object-cover"
                                  src={fileURLProfile}
                                  // alt=""
                                />
                              </>
                            ) : (
                              <>
                                <ProfileEdit6 />
                                <p className="hidden px-0.5 font-base text-base-s lg:block">
                                  Drag your image here or click to upload
                                </p>
                                <p className="font-base text-base-s lg:hidden">
                                  Tap to upload
                                </p>
                                <button
                                  aria-label="icon-button"
                                  className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-igcYUsu-css absolute right-2 top-2 !bg-white opacity-0 focus:!bg-white group-hover:opacity-70 hover:text-base900 hover:!opacity-100"
                                >
                                  <ProfileEdit7 />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="relative flex w-full justify-between gap-2 gap-y-2 md:gap-x-4 lt:justify-normal">
                      <div className="flex w-[102px] flex-col md:w-52">
                        <label
                          htmlFor="cover"
                          className="font-base text-base-m font-medium capitalize text-neutral600 md:text-base-l"
                        >
                          Cover
                        </label>
                        <div>
                          <p className="w-full font-base text-base-s text-base400">
                            Max 10MB. (.jpg, .png)
                            <br />
                            1920x640px recommended
                          </p>
                        </div>
                      </div>

                      <div {...getRootProps()} className="flex gap-1">
                        <div role="presentation" tabIndex={0}>
                          <input
                            {...getInputProps()}
                            accept="image/png,.png,image/jpg,.jpg,image/jpeg,.jpeg"
                            type="file"
                            tabIndex={-1}
                            style={{ display: "none" }}
                          />
                          <div className="group relative flex h-28 w-[336px] cursor-pointer flex-col items-center justify-center gap-y-1 rounded-md border text-center font-base text-base400 border-base300">
                            {activeUser?.coverPicture ? (
                              <>
                                <img
                                  alt="cover"
                                  className="rounded-md object-cover"
                                  src={activeUser?.coverPicture}
                                  style={{
                                    position: "absolute",
                                    height: "100%",
                                    width: "100%",
                                    inset: "0px",
                                    color: "transparent",
                                  }}
                                />
                              </>
                            ) : coverPicture ? (
                              <>
                                <img
                                  alt="cover"
                                  className="rounded-md object-cover"
                                  src={coverPicture}
                                  style={{
                                    position: "absolute",
                                    height: "100%",
                                    width: "100%",
                                    inset: "0px",
                                    color: "transparent",
                                  }}
                                />
                              </>
                            ) : (
                              <>
                                <img
                                  alt="cover"
                                  loading="lazy"
                                  decoding="async"
                                  data-nimg="fill"
                                  className="rounded-md object-cover"
                                  src="sound_letter_s.svg"
                                  style={{
                                    position: "absolute",
                                    height: "100%",
                                    width: "100%",
                                    inset: "0px",
                                    color: "transparent",
                                  }}
                                />
                                <button
                                  aria-label="icon-button"
                                  className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-igcYUsu-css absolute right-2 top-2 !bg-white opacity-0 focus:!bg-white group-hover:opacity-70 hover:text-base900 hover:!opacity-100"
                                >
                                  <ProfileEdit8 />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed bottom-0 left-0 z-stickyFooter flex h-14 w-full bg-white shadow-primary">
              <div className="mx-auto flex w-full max-w-content  justify-center gap-4 md:justify-end md:px-4 dt:px-0">
                <a href="/" className="!text-[unset] [text-decoration:unset]">
                  <button className="c-bPnuSX c-bPnuSX-cMJTpp-size-L c-bPnuSX-hxpvys-variant-secondary mt-2 h-10 w-40 max-w-none p-3">
                    Go to Profile
                  </button>
                </a>
                <button
                  onClick={() => UPDATE_USER(fullName, bio, instagram, twitter)}
                  className="c-bPnuSX c-bPnuSX-cMJTpp-size-L c-bPnuSX-kiaVWo-variant-primary mt-2 h-10 w-40 max-w-none p-3"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileEdit;
