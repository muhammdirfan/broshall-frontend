import InputField from "components/fields/InputField";
import React from "react";
import Notify from "simple-notify";
import "simple-notify/dist/simple-notify.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "services/AuthApis";

export default function ResetPassword() {
  const [isLoading, seIsloading] = React.useState(false);
  const [NewPassword, setNewPassword] = React.useState("");

  const navigate = useNavigate();
  const { token } = useParams();

  const handleResetPassword = async () => {
    if (!NewPassword) {
      new Notify({
        status: "error",
        title: "Error",
        text: "Please fill all the fields",
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
        const data = { password: NewPassword };
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
          title: e?.response?.data.title,
          text: e?.response?.data?.message,
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
      }
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mx-auto mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Reset Password
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
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