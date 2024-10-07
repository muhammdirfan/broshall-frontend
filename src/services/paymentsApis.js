import service, { accessToken } from "./index";

const FetchAllPayments = async () => {
  const res = await service.get("/payments", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

const CreatePayment = async (payload) => {
  const res = await service.post("/payments", payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const FetchPayment = async (id) => {
  const res = await service.get(`/payments/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

const UpdatePayment = async (id, payload) => {
  const res = await service.put(`/payments/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

const DeletePayment = async (id) => {
  const res = await service.delete(`/payments/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export {
  FetchAllPayments,
  CreatePayment,
  FetchPayment,
  UpdatePayment,
  DeletePayment,
};
