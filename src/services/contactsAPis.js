import service, { accessToken } from "./index";

export const FetchAllContacts = async () => {
  const res = await service.get("/contacts", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const UpdateContact = async (id, payload) => {
  const res = await service.put(`/contacts/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const CreateContact = async (payload) => {
  const res = await service.post("/contacts", payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};

export const DeleteContact = async (id) => {
  const res = await service.delete(`/contacts/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data;
};
