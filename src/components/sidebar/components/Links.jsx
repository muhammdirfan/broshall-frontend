/* eslint-disable */
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "services/AuthApis";
import Notify from "simple-notify";
// chakra imports

export function SidebarLinks(props) {
  const [accessToken, setAccessToken] = React.useState("");
  // Chakra color mode
  let location = useLocation();

  const { routes } = props;

  const navigate = useNavigate();

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  React.useEffect(() => {
    setAccessToken(JSON.parse(localStorage.getItem("accessToken")));
  }, []);

  const logoutCurrentUser = async () => {
    try {
      const response = await logoutUser();
      if (response.message) {
        new Notify({
          status: "success",
          title: "Success",
          text: response?.message,
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
        navigate("/auth/sign-in");
        localStorage.removeItem("accessToken");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const width = window.innerWidth;

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (
        accessToken &&
        (route.layout === "/admin" ||
          route.layout === "/auth" ||
          route.layout === "/rtl")
      ) {
        return (
          <Link
            key={index}
            to={route.name !== "Sign out" && route.layout + "/" + route.path}
            onClick={
              route.name === "Sign out"
                ? () => logoutCurrentUser()
                : width - 35 <= 419
                ? props.onClose
                : null
            }
          >
            <div className="relative mb-3 hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index}
              >
                <span
                  className={`${
                    activeRoute(route.path) === true
                      ? "font-bold text-brand-500 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.icon ? route.icon : null}{" "}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route.path) === true
                      ? "font-bold text-navy-700 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {route?.clilds
                ? route?.clilds?.map((item) => (
                    <Link
                      key={index}
                      to={item.layout + "/" + item.path}
                      onClick={width - 35 <= 419 ? props.onClose : null}
                    >
                      <div className="relative my-3 ml-5 flex hover:cursor-pointer">
                        <li
                          className="my-[3px] flex cursor-pointer items-center px-8"
                          key={index}
                        >
                          <p
                            className={`leading-1 ml-4 flex text-sm ${
                              activeRoute(item.path) === true
                                ? "font-bold text-navy-700 dark:text-white"
                                : "font-medium text-gray-600"
                            }`}
                          >
                            {item.name}
                          </p>
                        </li>
                      </div>
                    </Link>
                  ))
                : null}
              {activeRoute(route.path) ? (
                <div class="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
              ) : null}
            </div>
          </Link>
        );
      }
    });
  };
  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
