import { defineType } from "sanity";

export default defineType({
  name: "pageInfo",
  title: "Page Info",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "avatarHero",
      title: "Avatar Hero",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "role",
      title: "Role",
      type: "string",
    },
    {
      name: "backgroundAvatar",
      title: "Background Avatar",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "titleAbout",
      title: "Title About",
      type: "string",
    },
    {
      name: "summary",
      title: "Summary",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "socials",
      title: "Socials",
      type: "array",
      of: [{ type: "reference", to: { type: "socials" } }],
    },
  ],
});
