import service from "./index";

export const fetchAllProffesional = async () => {
  const res = await service.get("/proffesional/getallusers");
  return res.data;
};

export const fetchAllEstablishment = async (pageNumber) => {
  const res = await service.get(
    `/establisment/getallestablisments/${pageNumber}`
  );
  return res.data;
};

export const fetchAllStudents = async (pageNumber) => {
  const res = await service.get(`/student/getallstudents/${pageNumber}`);
  return res.data;
};

export const fetchAllPosts = async (pageNumber) => {
  const res = await service.get(`/global/getallposts/${pageNumber}`);
  return res.data;
};

export const deletePost = async (postId) => {
  const res = await service.post(`/global/deletepost`, { postId: postId });
  return res.data;
};

export const deleteGroup = async (groupId) => {
  const res = await service.post(`/global/deletegroupbyid`, {
    groupId: groupId,
  });
  return res.data;
};

export const fetchAllGroups = async (pageNumber) => {
  const res = await service.get(`/global/getallgroups/${pageNumber}`);
  return res.data;
};

export const fetchAllEvents = async () => {
  const res = await service.get(`/global/getallevents`);
  return res.data;
};
