// eslint-disable-next-line import/no-anonymous-default-export
export default {
    name: "blogPage",
    type: "document",
    title: "blog page",
    fields: [
      {
        title: "BlogId",
        name: "blogId",
        type: "number",
      },
      {
        title: "BlogTitle",
        name: "blogTitle",
        type: "string",
      },
      {
          title: "BlogDescription",
          name: "blogDescription",
          type: "string",
      },
      {
        title: "BlogImage",
        name: "blogImage",
        type: "image",
        options: {
          hotspot: true, // <-- Defaults to false
        },
      },
    ],
  };
  