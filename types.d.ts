interface SanityBody {
  _createAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
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
  summary: string;
  technologies: Technology[];
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
  socials: Socials[];
  summary: string;
  titleAbout: string;
}
