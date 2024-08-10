import service from "./index";

export const fetchStudentsCategory = async () => {
  const res = await service.get("/dashboard/student/hcs");
  return res.data;
};

export const addStudentsCategory = async (data) => {
  const res = await service.post("/dashboard/student/addhcs", data);
  return res.data;
};

export const addLinkedStudentsCategory = async (data) => {
  const res = await service.post("/dashboard/student/addlinkedstudent", data);
  return res.data;
};

export const fetchLinkedStudentsCategory = async () => {
  const res = await service.get("/dashboard/student/linkedstudent");
  return res.data;
};

export const deleteLinkedStudents = async (data) => {
  const res = await service.post("dashboard/student/deletelinkedstudent", data);
  return res.data;
};

export const updateLinkedStudents = async (data) => {
  const res = await service.put("dashboard/student/updatelinkedstudent", data);
  return res.data;
};

export const addspecialities = async (data) => {
  const res = await service.post("dashboard/student/addspecialities", data);
  return res.data;
};

export const deleteStudent = async (data) => {
  const res = await service.post("dashboard/student/deletehcs", data);
  return res.data;
};

export const updateStudent = async (data) => {
  const res = await service.post("dashboard/student/edithcs", data);
  return res.data;
};