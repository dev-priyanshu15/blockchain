import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

import { Create1 } from "../SVG/index";

const CoverImage = ({
  setImageURL,
  imageURL,
  setDescription,
  setTitle,
  notifySuccess,
  notifyError,
  setLoader,
}) => {
  const uploadToIPFS = async (file) => {
    if (file) {
      try {
        setLoader(true);
        const formData = new FormData();
        formData.append("file", file);

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

        const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

        setImageURL(url);
        setLoader(false);
        notifySuccess("Cover Image Uploade Successfully");
      } catch (error) {
        setLoader(false);
        notifyError("Unable to upload image to Pinata");
      }
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToIPFS(acceptedFile[0]);
  }, []);

  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({ onDrop, maxSize: 500000000000 });
  return (
    <div className="flex h-full max-h-[calc(100vh-64px)] flex-col overflow-hidden">
      <h3 className="c-ddfucX">Details</h3>
      <div className="c-gwhzgO max-h-[calc(100vh-265px)] overflow-auto">
        <form>
          <div
            {...getRootProps()}
            className="group relative mx-auto mb-4 h-[180px] w-[180px] overflow-hidden rounded-md"
            role="presentation"
            tabIndex={0}
          >
            {imageURL ? (
              <img
                alt="Playlist cover background"
                width={90}
                height={90}
                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover object-center"
                src={imageURL}
                style={{ color: "transparent" }}
              />
            ) : (
              <>
                <input
                  {...getInputProps()}
                  accept="image/png,.png,image/jpg,.jpg,image/jpeg,.jpeg"
                  type="file"
                  tabIndex={-1}
                  style={{ display: "none" }}
                />
                <img
                  alt="Playlist cover background"
                  loading="lazy"
                  width={90}
                  height={90}
                  decoding="async"
                  data-nimg={1}
                  className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover object-center"
                  src="playlist_cover_background.png"
                  style={{ color: "transparent" }}
                />
                <div className="absolute right-1 top-1  hidden group-hover:block">
                  <div className="c-lbNOYO">
                    <button
                      aria-label="icon-button"
                      aria-disabled="false"
                      className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-icWoQbd-css three-dots-icon bg-white text-base-s"
                      type="button"
                      id="radix-:r5h:"
                      aria-haspopup="menu"
                      aria-expanded="false"
                      data-state="closed"
                    >
                      <Create1 />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="mb-4 mt-2 text-center font-base text-base-s text-base400">
            Min 800 x 800px, Max 100 MB
            <br />
            (.png, .jpg and .jpeg)
          </div>
          <fieldset className="c-cSdPgl mb-4 flex flex-col gap-y-4">
            <label
              htmlFor="name"
              className="font-base text-base-m font-semibold text-neutral600"
            >
              Title *
            </label>
            <div className="flex w-full min-w-0 flex-col gap-y-1">
              <input
                className="block w-full rounded-[6px] border-0 bg-base200 px-[11px] py-3 font-base text-base-m text-base800 transition-all outline-none ring-1 ring-inset ring-base200 placeholder:text-base500 focus:ring-2 focus:ring-inset focus:ring-base800 hover:border-base300 hover:bg-base50 hover:ring-1"
                placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </fieldset>
          <fieldset className="c-cSdPgl flex flex-col gap-y-4">
            <label
              htmlFor="description"
              className="font-base text-base-m font-semibold text-neutral600"
            >
              Description
            </label>
            <div className="flex w-full min-w-0 flex-col gap-y-1">
              <textarea
                className="w-full rounded-[6px]  border-0 px-[8px] py-2 font-base text-base-m text-base800 relative rounded-[6px] p-[3px] ring-2 ring-inset transition-all focus:ring-inset resize-none outline-none placeholder:text-base500 scrollbar-light bg-base200 ring-base200 focus:ring-base800 hover:border-base300 hover:bg-base50 hover:ring-1 w-full"
                rows={8}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="tescription"
              />
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default CoverImage;
