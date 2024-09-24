import landingPage from "./landingPage";
import headerComponent from "./headerComponent";
import blogPage from "./blogPage";
import blogPostSchema from "./blogPost";
import categorySchema from "./category";
import authorSchema from "./author";
import jsPostSchema from "./jsPost";

export const schema = {
  types: [
    landingPage,
    headerComponent,
    blogPage,
    blogPostSchema,
    categorySchema,
    authorSchema,
    jsPostSchema,
  ],
};
