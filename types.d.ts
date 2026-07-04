interface SanityBody {
  _createAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

interface SanityBlock {
  children: array<any>;
  level: number;
  listItem: string;
  markDefs: array<any>;
  style: string;
  _key: string;
  _type: string;
}

interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

// GROQ query dereferences asset-> so `url` is available directly
interface SanityFile {
  _type: "file";
  asset?: {
    _ref: string;
    _type: "reference";
    url?: string;
  };
}

interface Skills extends SanityBody {
  _type: "skill";
  direction: boolean;
  title: string;
  image: Image;
}

interface Technology extends SanityBody {
  _type: "skill";
  image: Image;
  title: string;
}

interface Project extends SanityBody {
  title: string;
  image: Image;
  _type: "project";
  linkBuild: string;
  fromDate: Date;
  toDate: Date;
  summary: SanityBlock[];
  technologies: Technology[];
  order: number;
}

interface Socials extends SanityBody {
  _type: "socials";
  image: Image;
  title: string;
  url: string;
}

interface PageInfo extends SanityBody {
  _type: "pageInfo";
  address: string;
  avatarHero: Image;
  backgroundAvatar: Image;
  email: string;
  name: string;
  phoneNumber: string;
  role: string;
  /** Rotating typewriter words shown in the hero heading */
  heroTypewriterWords: string[];
  /** Availability badge text shown in the hero (e.g. "Open to new opportunities") */
  heroBadgeText: string;
  /** Uploaded resume/CV PDF — falls back to a bundled file when not set in the CMS */
  heroResumeUrl?: SanityFile;
  socials: Socials[];
  summary: SanityBlock[];
  titleAbout: string;
}

