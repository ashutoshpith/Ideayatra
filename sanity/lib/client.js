import { createClient } from "next-sanity";

import {  dataset, projectId  } from "../env";

const api_key = process.env.SANITY_API_KEY

export const sanityClient = createClient({
  projectId: projectId || "9mmu9z8j",
  dataset: dataset || "development",
  useCdn: true,
  token: api_key
});
