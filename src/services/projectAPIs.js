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
      "Content-Type": "multipart/form-data",
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

// add an employees to a project

export const AddEmployeeToProject = async (token, projectId, payload) => {
  const res = await service.post(
    `/projects/${projectId}/add_employees`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// remove an employee from a project

export const RemoveEmployeeFromProject = async (token, projectId, payload) => {
  const res = await service.post(
    `/projects/${projectId}/remove_employees`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// add a machine to a project

export const AddMachineToProject = async (token, projectId, payload) => {
  const res = await service.post(
    `/projects/${projectId}/add_machines`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// remove a machine from a project

export const removeMachineFromProject = async (token, projectId, payload) => {
  const res = await service.post(
    `/projects/${projectId}/remove_machines`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// add an equipment to a project

export const AddEquipmentToProject = async (token, projectId, payload) => {
  const res = await service.post(
    `/projects/${projectId}/add_equipments`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// remove an equipment from a project

export const removeEquipmentFromProject = async (token, projectId, payload) => {
  const res = await service.post(
    `/projects/${projectId}/remove_equipments`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
