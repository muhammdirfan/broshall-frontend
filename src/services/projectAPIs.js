import service, { accessToken } from "./index";

export const FetchAllProjects = async (token) => {
  const res = await service.get("/projects", {
    headers: {
      Authorization: `Bearer ${token ?? accessToken}`,
    },
  });
  return res.data;
};

export const FetchProject = async (id) => {
  const res = await service.get(`/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const UpdateProject = async (id, payload) => {
  const res = await service.put(`/projects/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const CreateProject = async (payload) => {
  const res = await service.post("/projects", payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const DeleteProject = async (id) => {
  const res = await service.delete(`/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

// add an employees to a project

export const AddEmployeeToProject = async (projectId, payload) => {
  const res = await service.post(
    `/projects/${projectId}/add_employees`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

// remove an employee from a project

export const RemoveEmployeeFromProject = async (projectId, payload) => {
  const res = await service.post(
    `/projects/${projectId}/remove_employees`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

// add a machine to a project

export const AddMachineToProject = async (projectId, payload) => {
  const res = await service.post(
    `/projects/${projectId}/add_machines`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

// remove a machine from a project

export const removeMachineFromProject = async (projectId, payload) => {
  const res = await service.post(
    `/projects/${projectId}/remove_machines`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

// add an equipment to a project

export const AddEquipmentToProject = async (projectId, payload) => {
  const res = await service.post(
    `/projects/${projectId}/add_equipments`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

// remove an equipment from a project

export const removeEquipmentFromProject = async (projectId, payload) => {
  const res = await service.post(
    `/projects/${projectId}/remove_equipments`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};
