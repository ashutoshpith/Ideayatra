import landingPage from "./landingPage"
import headerComponent from './headerComponent';
import blogPage from "./blogPage";
import blogPostSchema from './blogPost'
import categorySchema from "./category";
import authorSchema from "./author";

export const schema = {
  types: [landingPage, headerComponent, blogPage, blogPostSchema, categorySchema, authorSchema],
}
