import service from "./index";

export const fetchProffesionalCategory = async () => {
  const res = await service.get("/dashboard/professional/hcps");
  return res.data;
};

export const fetchSpeciality = async () => {
  const res = await service.get("/dashboard/professional/specialities");
  return res.data;
};

export const addProffesionalCategory = async (data) => {
  const res = await service.post("/dashboard/professional/addhcps", data);
  return res.data;
};


export const addLinkedProffesionalCategory = async (data) => {
  const res = await service.post("/dashboard/professional/addlinkedproffesion", data);
  return res.data;
};


export const fetchLinkedProffesionalCategory = async () => {
  const res = await service.get("/dashboard/professional/linkedproffesion");
  return res.data;
};

export const deleteLinkedProfessional = async (data) => {
  const res = await service.post("dashboard/professional/deletelinkedproffesion", data);
  return res.data;
};

export const updateLinkedProfessional = async (data) => {
  const res = await service.put("dashboard/professional/updatelinkedproffesion", data);
  return res.data;
};

export const addspecialities = async (data) => {
  const res = await service.post("dashboard/professional/addspecialities", data);
  return res.data;
};

export const specialitiesLinks = async (data) => {
  const res = await service.post("dashboard/professional/specialities", data);
  return res.data;
};

export const fetchallSpecialities = async () => {
  const res = await service.get("/dashboard/professional/allspecialities");
  return res.data;
};

export const deleteProfessional = async (data) => {
  const res = await service.post("dashboard/professional/deletehcps", data);
  return res.data;
};

export const updateProfessional = async (data) => {
  const res = await service.post("dashboard/professional/edithcps", data);
  return res.data;
};

export const deleteProfessionalSpeciality = async (data) => {
  const res = await service.post("dashboard/professional/deletespecialities", data);
  return res.data;
};

export const updateProfessionalSpeciality = async (data) => {
  const res = await service.post("dashboard/professional/editspecialities", data);
  return res.data;
};

