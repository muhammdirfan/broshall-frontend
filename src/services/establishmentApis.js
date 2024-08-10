import service from "./index";

export const fetchEstablishment = async () => {
  const res = await service.get("/dashboard/establishment/hce");
  return res.data;
};

export const addEstablishmentCategory = async (data) => {
  const res = await service.post("/dashboard/establishment/addhce", data);
  return res.data;
};

export const addLinkedEstablishmentCategory = async (data) => {
  const res = await service.post("/dashboard/establishment/addlinkedestablishment", data);
  return res.data;
};

export const fetchLinkedEstablishment = async () => {
  const res = await service.get("/dashboard/establishment/linkedestablishment");
  return res.data;
};

export const deleteLinkedEstablishment = async (data) => {
  const res = await service.post("dashboard/establishment/deletelinkedestablishment", data);
  return res.data;
};

export const updateLinkedEstablishment = async (data) => {
  const res = await service.put("dashboard/establishment/updatelinkedestablishment", data);
  return res.data;
};

export const addspecialities = async (data) => {
  const res = await service.post("dashboard/establishment/addspecialities", data);
  return res.data;
};

export const fetchAllestablisments = async () => {
  const res = await service.get("/establisment/getallestablisments");
  return res.data;
};

export const deleteEstablishment = async (data) => {
  const res = await service.post("dashboard/establishment/deletehce", data);
  return res.data;
};

export const updateEstablishment = async (data) => {
  const res = await service.post("dashboard/establishment/edithce", data);
  return res.data;
};