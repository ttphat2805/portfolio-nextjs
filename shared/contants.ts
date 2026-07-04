export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

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
