import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const MusicUpload = ({
  fileURL,
  setFileURL,
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

        setFileURL(url);
        setLoader(false);
        notifySuccess("audio Uploade Successfully");
      } catch (error) {
        setLoader(false);
        notifyError("Unable to upload image to Pinata, check your API key");
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
    <div class="flex h-full max-h-[calc(100vh-64px)] flex-col overflow-hidden">
      <h3 class="c-ddfucX">Select Auido</h3>
      {fileURL ? (
        <audio className="new_full_width_audio" controls>
          <source src={fileURL} type="audio/ogg" />
          <source src={fileURL} type="audio/mpeg" />
          Your browser dose not support the audio tag
        </audio>
      ) : (
        <div {...getRootProps()} class="c-jnBfEb">
          <p>
            Select your Sounds from your collection on the left-hand side to
            move them to this shelf.
          </p>
          <div class="c-cWWxYX">
            {" "}
            <input {...getInputProps()} type="file" accept="image/*" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicUpload;
