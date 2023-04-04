// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";

// type Data = {
//   skills: Skills[];
// };

const query = groq`*[_type=="project"] {
  ...,
  technologies[]->
}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const skills: any = await sanityClient.fetch(query);

  res.status(200).json({ skills });
}
