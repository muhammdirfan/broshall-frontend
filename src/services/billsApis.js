import service, { accessToken } from "./index";

const FetchAllBills = async () => {
  const res = await service.get("/bills", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

const CreateBill = async (payload) => {
  const res = await service.post("/bills", payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const FetchBill = async (id, data) => {
  const res = await service.get(`/bills/${id}`, {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
  return res.data;
};

const UpdateBill = async (id, payload) => {
  const res = await service.put(`/bills/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

const DeleteBill = async (id) => {
  const res = await service.delete(`/bills/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export { FetchAllBills, CreateBill, FetchBill, UpdateBill, DeleteBill };
