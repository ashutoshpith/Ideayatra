// eslint-disable-next-line import/no-anonymous-default-export
export default {
    name: "headerComponent",
    type: "document",
    title: "Header",
    fields: [
      {
        title: "HeaderCompanyName",
        name: "headerCompanyName",
        type: "string",
      },
      {
        title: "HeaderIcon",
        name: "headerIcon",
        type: "image",
        options: {
          hotspot: true, // <-- Defaults to false
        },
      },
      {
        title: "HeaderNavLineOne",
        name: "headerNavLineOne",
        type: "string",
      },
      {
        title: "HeaderNavLineSecond",
        name: "headerNavLineSecond",
        type: "string",
      },
    ],
  };
  