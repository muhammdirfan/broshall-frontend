import service, { accessToken } from "./index";

export const FetchAllEquipments = async (token) => {
  const res = await service.get("/equipments", {
    headers: {
      Authorization: `Bearer ${token ?? accessToken}`,
    },
  });
  return res.data;
};

export const CreateEquipment = async (payload) => {
  const res = await service.post("/equipments", payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const FetchEquipment = async (id) => {
  const res = await service.get(`/equipments/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const UpdateEquipment = async (id, payload) => {
  const res = await service.put(`/equipments/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const DeleteEquipment = async (id) => {
  const res = await service.delete(`/equipments/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
