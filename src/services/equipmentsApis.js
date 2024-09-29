import service from "./index";

export const FetchAllEquipments = async (data) => {
  const res = await service.get("/equipments", {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
  return res.data;
};

export const CreateEquipment = async (token, payload) => {
  const res = await service.post("/equipments", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const FetchEquipment = async (id, data) => {
  const res = await service.get(`/equipments/${id}`, {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
  return res.data;
};

export const UpdateEquipment = async (token, id, payload) => {
  const res = await service.put(`/equipments/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const DeleteEquipment = async (token, id) => {
  const res = await service.delete(`/equipments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
