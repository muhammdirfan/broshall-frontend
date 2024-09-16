import service from "./index";

export const FetchAllMachines = async (data) => {
  const res = await service.get("/machines", {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
  return res.data;
};

export const CreateMachine = async (token, payload) => {
  const res = await service.post("/machines", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
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

export const UpdateMachine = async (token, id, payload) => {
  const res = await service.put(`/machines/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const DeleteMachine = async (token, id) => {
  const res = await service.delete(`/machines/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
