import { createClient } from "next-sanity";

import {  dataset, projectId  } from "../env";

export const sanityClient = createClient({
  projectId: projectId || "9mmu9z8j",
  dataset: dataset || "development",
  useCdn: true,
  token:
    "sk5QKIo8bvh9YiM3oI7iQfpWxhg8oXgffd0CKSKDe6W3KGEHEP9upLPCNgCQyuCKVeITuu4sqW89gNH2ZrV5W1LBjyFD2U7QcgcSmbCDx5ERiaVgmUIb7M9rgB1xRBTxMGBRQ7iayHkSm3HRYZeHa9BqGUHVa2JTJAQgFLXGlpUqIg3IJIP1",
});
