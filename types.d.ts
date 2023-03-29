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
