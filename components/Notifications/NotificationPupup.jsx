import React from "react";
import toast from "react-hot-toast";
import { useForm, ValidationError } from "@formspree/react";
import {
  NotificationPupup1,
  NotificationPupup2,
  NotificationPupup3,
} from "../SVG/index";

const NotificationPupup = ({ setEmail }) => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });
  //FORM
  const [state, handleSubmit] = useForm("mzbnzpqr");
  if (state.succeeded) {
    notifySuccess("Successfully submitted");
    window.location.reload();
    return notifySuccess("Successfully submitted");
  }
  return (
    <div
      className="c-kZStZF c-kZStZF-ijLWysc-css"
      style={{ pointerEvents: "auto" }}
    >
      <div
        className="c-gLOVln c-gLOVln-cewiJJ-size-small new_notifiction"
        tabIndex={-1}
        style={{ pointerEvents: "auto" }}
      >
        <div className="z-above1 bg-white">
          <div className="flex justify-between">
            <div className="flex flex-col justify-center" />
            <button
              onClick={() => setEmail(false)}
              className="c-ebvTKE c-ebvTKE-isdEXf-variant-primary c-ebvTKE-ibJzEHE-css"
            >
              <NotificationPupup1 />
            </button>
          </div>
        </div>
        <div className="c-epuwnk c-epuwnk-esNGXs-withoutPadding-true">
          <div className="flex flex-col items-center justify-center">
            <NotificationPupup2 />
            <div className="mb-8 flex flex-col items-center justify-center gap-2">
              <h2 className="font-title text-title-l font-medium text-base800">
                Stay updated on new drops
              </h2>
              <p className="text-base text-center text-base-l text-base800">
                We'll let you know when your
                <br />
                favorite artists drop a new song.
              </p>
            </div>
            <div className="flex w-full flex-col gap-y-2">
              <form
                onSubmit={handleSubmit}
                className="mb-1 flex w-full items-stretch gap-x-2"
              >
                <input
                  className="block w-full rounded-[6px] border-0 bg-base200 px-[11px] py-3 font-base text-base-m text-base800 transition-all outline-none ring-1 ring-inset ring-base200 placeholder:text-base500 focus:ring-2 focus:ring-inset focus:ring-base800 hover:border-base300 hover:bg-base50 hover:ring-1"
                  type="email"
                  id="email"
                  name="email"
                  placeholder={"email"}
                />
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="c-bPnuSX c-bPnuSX-cMJTpp-size-L c-bPnuSX-kiaVWo-variant-primary hidden w-24 min-w-[6rem] md:block"
                >
                  Submit
                </button>
                <button
                  disabled
                  className="c-bPnuSX c-bPnuSX-hEOhbx-size-squared c-bPnuSX-UazGY-hasIcon-true c-bPnuSX-kiaVWo-variant-primary md:hidden"
                >
                  <div className="flex items-center">
                    <NotificationPupup3 />
                  </div>
                </button>
              </form>
              <div className="-mt-1 items-center font-base !text-base-s text-base800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPupup;
