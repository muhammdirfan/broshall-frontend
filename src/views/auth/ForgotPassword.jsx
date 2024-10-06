import InputField from "components/fields/InputField";
import React from "react";
import Notify from "simple-notify";
import "simple-notify/dist/simple-notify.min.css";
import branchImg from "assets/img/favicon.png";
import { forgotPassword } from "services/AuthApis";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswords() {
  const [isLoading, seIsloading] = React.useState(false);
  const [isEmailSent, seIsEmailSent] = React.useState(false);
  const [Email, setEmail] = React.useState("");

  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!Email) {
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
        const forgotLink = await forgotPassword({ email: Email });
        if (forgotLink) {
          seIsloading(false);
          seIsEmailSent(true);
          new Notify({
            status: "success",
            title: "Success",
            text: forgotLink.message,
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

  const handleLogin = () => {
    navigate("/auth/sign-in");
  };

  return (
    <div className="mt-5 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {isEmailSent ? (
        <div className="mx-auto mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <img
            src={branchImg}
            alt="brand-img"
            className="my-5 mx-auto"
            width={220}
          />
          <h4 className="mb-2.5 text-center text-4xl font-bold text-navy-700 dark:text-white">
            Forgot Password
          </h4>
          <p className="mb-9 ml-1 text-center text-base text-gray-600">
            We sent you a reset password link to tour email, please check your
            email
          </p>
          <button
            onClick={!isLoading ? handleLogin : null}
            className="linear mt-3 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            {isLoading ? "Loading..." : "Go to Login"}
          </button>
        </div>
      ) : (
        <div className="mx-auto mt-5 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <img
            src={branchImg}
            alt="brand-img"
            className="my-5 mx-auto"
            width={200}
          />
          <h4 className="mb-2.5 text-center text-4xl font-bold text-navy-700 dark:text-white">
            Forgot Password
          </h4>
          <p className="mb-9 ml-1 text-center text-base text-gray-600">
            Enter your email, will send reset password link!
          </p>
          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            className="my-2"
            placeholder="mail@simmmple.com"
            id="email"
            type="text"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={!isLoading ? handleForgotPassword : null}
            className="linear mt-3 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            {isLoading ? "Loading..." : "Get Reset Email"}
          </button>
        </div>
      )}
    </div>
  );
}
