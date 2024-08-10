import service from "./index";

export const AdminLogin = async (data) => {
  const res = await service.post("/users/login", data);
  return res.data;
};

export const CurrentUser = async (data) => {
  const res = await service.get("/users/current", {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
  return res.data;
};

export const logoutUser = async (data) => {
  const res = await service.get("/users/logout", {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
  return res.data;
};
