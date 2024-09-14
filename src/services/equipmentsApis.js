import service from "./index";

export const FetchAllEquipments = async (data) => {
  const res = await service.get("/equipments", {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
  return res.data;
};
