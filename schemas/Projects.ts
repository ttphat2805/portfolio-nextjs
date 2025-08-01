import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Title of the project",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
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
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "reference", to: { type: "skill" } }],
    },
    {
      name: "linkBuild",
      title: "Link Build",
      type: "url",
    },
    {
      name: "fromDate",
      title: "From Date",
      type: "date",
      options: {
        dateFormat: "MMM/DD/YYYY",
        calendarTodayLabel: "Today",
      },
    },
    {
      name: "toDate",
      title: "To Date",
      type: "date",
      options: {
        dateFormat: "MMM/DD/YYYY",
        calendarTodayLabel: "Today",
      },
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (e.g. 1 = highest priority)",
    },
  ],
});
