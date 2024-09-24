import createImageUrlBuilder from "@sanity/image-url";

import { dataset, projectId } from "../env";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "9mmu9z8j",
  dataset: dataset || "development",
});

export const urlForImage = (source) => {
  return imageBuilder?.image(source).auto("format").fit("max").url();
};

export const urlForImage2 = (source) => {
  return imageBuilder?.image(source).auto("format").fit("max");
};
