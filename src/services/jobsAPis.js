import service, { accessToken } from "./index";

export const FetchAllJobs = async (token) => {
  const res = await service.get("/jobs", {
    headers: {
      Authorization: `Bearer ${token ?? accessToken}`,
    },
  });
  return res.data;
};

export const CreateJob = async (payload) => {
  const res = await service.post("/jobs", payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const FetchJob = async (id) => {
  const res = await service.get(`/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const UpdateJob = async (id, payload) => {
  const res = await service.put(`/jobs/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const DeleteJob = async (id) => {
  const res = await service.delete(`/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const FetchAllJobsApplies = async () => {
  const res = await service.get("/jobsApply", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
