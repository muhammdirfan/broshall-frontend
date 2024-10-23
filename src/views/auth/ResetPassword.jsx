import InputField from "components/fields/InputField";
import React from "react";
import Notify from "simple-notify";
import "simple-notify/dist/simple-notify.min.css";
import { useNavigate, useParams } from "react-router-dom";
import branchImg from "assets/img/favicon.png";
import { resetPassword } from "services/AuthApis";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";

export default function ResetPassword() {
  const [isLoading, seIsloading] = React.useState(false);
  const [NewPassword, setNewPassword] = React.useState("");
  const [NewCPassword, setNewCPassword] = React.useState("");

  const navigate = useNavigate();
  const { token } = useParams();

  const handleResetPassword = async () => {
    if (!NewPassword) {
      new Notify({
        status: "error",
        title: "Error",
        text: "Please add new password",
        effect: "fade",
        speed: 300,
        customClass: null,
        customIcon: null,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        gap: 20,
        distance: 20,
        type: 1,
        position: "right bottom",
      });
    } else {
      seIsloading(true);
      try {
        const data = { password: NewPassword, cpassword: NewCPassword };
        const resetLink = await resetPassword(data, token);
        if (resetLink) {
          new Notify({
            status: "success",
            title: "Success",
            text: resetLink.message,
            effect: "fade",
            speed: 300,
            customClass: null,
            customIcon: null,
            showIcon: true,
            showCloseButton: true,
            autoclose: true,
            autotimeout: 3000,
            gap: 20,
            distance: 20,
            type: 1,
            position: "right bottom",
          });
          seIsloading(false);
          navigate("/auth/sign-in");
        }
      } catch (e) {
        console.error("error", e?.response.data);
        new Notify({
          status: "error",
          title: e?.response?.data?.message,
          text: e?.response?.data?.error,
          effect: "fade",
          speed: 400,
          customClass: null,
          customIcon: null,
          showIcon: true,
          showCloseButton: true,
          autoclose: true,
          autotimeout: 3000,
          gap: 20,
          distance: 20,
          type: 1,
          position: "right bottom",
        });
        seIsloading(false);
      }
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center !bg-white px-2 dark:!bg-navy-900 md:mx-0 md:px-0 lg:items-center lg:justify-start">
      <FixedPlugin />
      <div className="mx-auto mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <img
          src={branchImg}
          alt="brand-img"
          className="my-5 mx-auto"
          width={200}
        />
        <h4 className="mb-2.5 text-center text-4xl font-bold text-navy-700 dark:text-white">
          Reset Password
        </h4>
        <p className="mb-9 ml-1 text-center text-base text-gray-600">
          Enter your New Password!
        </p>
        {/* New Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
          value={NewPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {/* New Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Confirm Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
          value={NewCPassword}
          onChange={(e) => setNewCPassword(e.target.value)}
        />
        <button
          onClick={!isLoading ? handleResetPassword : null}
          className="linear mt-3 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          {isLoading ? "Loading..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
