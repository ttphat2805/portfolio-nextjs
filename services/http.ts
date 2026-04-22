// Replaced axios with native fetch — removes a 50KB+ dependency
// Uses getStaticProps server-side, so BASE_URL is always available at build time

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";

async function fetchJson<T>(endpoint: string): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    // Allow Next.js ISR caching to control revalidation
    next: { revalidate: 60 },
  } as RequestInit);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`
    );
  }

  return res.json() as Promise<T>;
}

export const getSkills = async (): Promise<Skills[]> => {
  const data = await fetchJson<{ skills: Skills[] }>("api/getSkills");
  return data.skills;
};

export const getProjects = async (): Promise<Project[]> => {
  const data = await fetchJson<{ projects: Project[] }>("api/getProjects");
  return data.projects;
};

export const getPageInfo = async (): Promise<PageInfo> => {
  const data = await fetchJson<{ pageInfo: PageInfo[] }>("api/getPageInfo");
  return data.pageInfo[0];
};

export const getSocials = async (): Promise<Socials[]> => {
  const data = await fetchJson<{ socials: Socials[] }>("api/getSocials");
  return data.socials;
};
