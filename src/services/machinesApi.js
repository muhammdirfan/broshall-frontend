import service from "./index";

export const FetchAllMachines = async (data) => {
  const res = await service.get("/machines", {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
  return res.data;
};
