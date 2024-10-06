import service from "./index";

export const FetchAllJobs = async (data) => {
  const res = await service.get("/jobs", {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
  return res.data;
};

export const CreateJob = async (token, payload) => {
  const res = await service.post("/jobs", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const FetchJob = async (id, data) => {
  const res = await service.get(`/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
  return res.data;
};

export const UpdateJob = async (token, id, payload) => {
  const res = await service.put(`/jobs/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const DeleteJob = async (token, id) => {
  const res = await service.delete(`/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const FetchAllJobsApplies = async (data) => {
  const res = await service.get("/jobsApply", {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
  return res.data;
};
