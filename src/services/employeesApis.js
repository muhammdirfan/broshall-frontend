import service, { accessToken } from "./index";

export const FetchAllEmployees = async (token) => {
  const res = await service.get("/employees", {
    headers: {
      Authorization: `Bearer ${token ?? accessToken}`,
    },
  });
  return res.data;
};

export const FetchEmployee = async (id) => {
  const res = await service.get(`/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const UpdateEmployee = async (id, payload) => {
  const res = await service.put(`/employees/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const CreateEmployee = async (payload) => {
  const res = await service.post("/employees", payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const DeleteEmployee = async (id) => {
  const res = await service.delete(`/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
