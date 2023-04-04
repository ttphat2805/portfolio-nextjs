import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getSkills = async () => {
  const res = await axios.get(`${BASE_URL}api/getSkills`);
  const skills: Skills[] = res.data.skills;
  return skills;
};

export const getProjects = async () => {
  const res = await axios.get(`${BASE_URL}api/getProjects`);
  const projects: Project[] = res.data.projects;
  return projects;
};

export const getPageInfo = async () => {
  const res = await axios.get(`${BASE_URL}api/getPageInfo`);
  const pageInfo: PageInfo = res.data.pageInfo[0];

  return pageInfo;
};

export const getSocials = async () => {
  const res = await axios.get(`${BASE_URL}api/getSocials`);
  const socials: Socials[] = res.data.socials;
  return socials;
};
