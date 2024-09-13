import service from "./index";

export const FetchAllProjects = async (data) => {
  const res = await service.get("/projects", {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
  return res.data;
};

export const FetchProject = async (id, data) => {
  const res = await service.get(`/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
  return res.data;
};

export const UpdateProject = async (token, id, payload) => {
  const res = await service.put(`/projects/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const CreateProject = async (token, payload) => {
  const res = await service.post("/projects", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const DeleteProject = async (token, id) => {
  const res = await service.delete(`/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
