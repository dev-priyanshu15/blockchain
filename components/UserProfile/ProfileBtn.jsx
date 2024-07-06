import React from "react";

const ProfileBtn = ({
  setopenComponent,
  title,
  styleClass,
  secondClass,
  link,
}) => {
  return (
    <div className={` ${styleClass}`}>
      <div className="flex items-center gap-2">
        <a href={link} className="!text-[unset] [text-decoration:unset]">
          <button
            onClick={() => setopenComponent("ProfileEdit")}
            className={`c-bPnuSX c-bPnuSX-cMJTpp-size-L c-bPnuSX-iRULOu-variant-tertiary  ${secondClass}`}
          >
            {title}
          </button>
        </a>
      </div>
    </div>
  );
};

export default ProfileBtn;
