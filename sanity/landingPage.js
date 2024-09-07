// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: "landingPage",
  type: "document",
  title: "landing page",
  fields: [
    {
      title: "BannerTitle",
      name: "bannerTitle",
      type: "string",
    },
    {
        title: "BannerDescription",
        name: "bannerDescription",
        type: "string",
      },
    {
      title: "Poster",
      name: "poster",
      type: "image",
      options: {
        hotspot: true, // <-- Defaults to false
      },
    },
  ],
};
