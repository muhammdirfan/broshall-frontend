import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes.js";

export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const navigate = useNavigate();

  const getActiveRoute = (routes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
      for (let j = 0; j < routes[i]?.clilds?.length; j++) {
        if (
          window.location.href.indexOf(
            routes[i]?.clilds[j].layout + "/" + routes[i]?.clilds[j].path
          ) !== -1
        ) {
          setCurrentRoute(routes[i]?.clilds[j].name);
        }
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      console.log(accessToken, "accessToken");
      if (accessToken && prop.layout === "/admin") {
        return (
          <>
            <Route path={`/${prop.path}`} element={prop.component} key={key} />
            {prop?.clilds
              ? prop.clilds?.map((item) => {
                  return (
                    <Route
                      path={`/${item.path}`}
                      element={item.component}
                      key={key}
                    />
                  );
                })
              : null}
          </>
        );
      } else if (!accessToken) {
        navigate("/auth/sign-in");
      }
    });
  };

  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          {/* Routes */}
          <div className="h-full md:ml-5">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Horizon UI Tailwind React"}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(routes)}

                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes>
            </div>
            {/* <div className="p-3">
              <Footer />
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
}
