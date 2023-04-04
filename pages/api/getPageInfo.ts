// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";

type Data = {
  pageInfo: PageInfo[];
};

const query = groq`*[_type=="pageInfo"] {
  ...,
  socials[]->
}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const pageInfo: PageInfo[] = await sanityClient.fetch(query);

  res.status(200).json({ pageInfo });
}
