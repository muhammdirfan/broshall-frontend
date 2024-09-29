import InputField from "components/fields/InputField";
import Checkbox from "components/checkbox";
import { AdminLogin } from "services/AuthApis";
import React from "react";
import Notify from "simple-notify";
import "simple-notify/dist/simple-notify.min.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [isLoading, seIsloading] = React.useState(false);
  const [authData, setAuthData] = React.useState({
    email: "",
    password: "",
    keep_login: false,
  });

  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    if (!authData.email || !authData.password) {
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
        const auth = await AdminLogin(authData);
        localStorage.setItem("accessToken", JSON.stringify(auth.accessToken));
        if (auth.accessToken) {
          seIsloading(false);
          navigate("/admin/default");
          new Notify({
            status: "success",
            title: "Success",
            text: "Successfully login!",
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

  const handleCheckChange = () => {
    setAuthData({
      ...authData,
      keep_login: !authData.keep_login,
    });
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Control Center
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
          value={authData.email}
          onChange={(e) =>
            setAuthData({
              ...authData,
              email: e.target.value,
            })
          }
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
          value={authData.password}
          onChange={(e) =>
            setAuthData({
              ...authData,
              password: e.target.value,
            })
          }
        />
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            {console.log("authData", authData)}
            <Checkbox
              checked={authData.password}
              onChange={handleCheckChange}
            />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Keep me logged In
            </p>
          </div>
        </div>
        <button
          onClick={!isLoading ? handleAdminLogin : null}
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          {isLoading ? "Loading..." : "Sign In"}
        </button>
        <Link to="/forgot-password">
          <p className="my-3 ml-2 text-sm font-medium text-navy-700 dark:text-white">
            Forgot Password
          </p>
        </Link>
      </div>
    </div>
  );
}
