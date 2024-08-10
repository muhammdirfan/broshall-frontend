import service from "./index";

export const FetchAllContacts = async (data) => {
  const res = await service.get("/contacts", {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
  return res.data;
};

export const UpdateContact = async (token, id, payload) => {
  const res = await service.put(`/contacts/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const CreateContact = async (token, payload) => {
  const res = await service.post("/contacts", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const DeleteContact = async (token, id) => {
  const res = await service.delete(`/contacts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
