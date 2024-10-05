import service, { accessToken } from "./index";

export const FetchAllMachines = async () => {
  const res = await service.get("/machines", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const CreateMachine = async (payload) => {
  const res = await service.post("/machines", payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const FetchMachine = async (id, data) => {
  const res = await service.get(`/machines/${id}`, {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
  return res.data;
};

export const UpdateMachine = async (id, payload) => {
  const res = await service.put(`/machines/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const DeleteMachine = async (id) => {
  const res = await service.delete(`/machines/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
