import React from "react";

const Link = ({ icon, link }) => {
  return (
    <a href={link} rel="noopener noreferrer" target="_blank">
      {icon}
    </a>
  );
};

export default Link;
