export const imageCanvas = [
  {
    src: "/images/React-icon.png",
  },
  {
    src: "/images/angular.png",
  },
  {
    src: "/images/css3.png",
  },
  {
    src: "/images/docker.png",
  },
  {
    src: "/images/firebase.png",
  },
  {
    src: "/images/html5.png",
  },
  {
    src: "/images/javascript.png",
  },
  {
    src: "/images/mongodb.png",
  },
  {
    src: "/images/nextjs.png",
  },
  {
    src: "/images/nodejs.png",
  },
  {
    src: "/images/scss.png",
  },
  {
    src: "/images/tailwindcss.png",
  },
  {
    src: "/images/typescript.png",
  },
  {
    src: "/images/vercel.png",
  },
  {
    src: "/images/github.png",
  },
];

export const EMAILJS = {
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  PUBLIC_KEY: "ymmyokYjiDNtvxwAS",
};

export const formatDate = (dateField: Date) => {
  const date = new Date(dateField);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
  const formattedDate = date
    .toLocaleDateString("en-US", options)
    .replace(/,/g, "");

  return formattedDate;
};
