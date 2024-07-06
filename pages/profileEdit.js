import react, { useState } from "react";

//INTERNAL IMPORT
import { Footer, Sidebar, ProfileEdit } from "../components/index";

const profileEdit = () => {
  return (
    <div class="font-base ">
      {/* ?? */}
      <Sidebar />
      <Footer />
      <div
        className=" c-PJLV c-PJLV-llkfmI-withLeftNav-true c-PJLV-iiuDyin-css"
        id="layout"
        style={{
          marginTop: "2rem",
        }}
      >
        <ProfileEdit />
      </div>
    </div>
  );
};

export default profileEdit;
