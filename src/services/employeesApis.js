import service from "./index";

export const FetchAllEmployees = async (data) => {
  const res = await service.get("/employees", {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
  return res.data;
};

export const FetchEmployee = async (id, data) => {
  const res = await service.get(`/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
  return res.data;
};

export const UpdateEmployee = async (token, id, payload) => {
  const res = await service.put(`/employees/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const CreateEmployee = async (token, payload) => {
  const res = await service.post("/employees", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const DeleteEmployee = async (token, id) => {
  const res = await service.delete(`/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
