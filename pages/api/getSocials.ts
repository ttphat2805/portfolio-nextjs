// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";

type Data = {
  socials: Socials[];
};

const query = groq`*[_type=="socials"]`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const socials: Socials[] = await sanityClient.fetch(query);

  res.status(200).json({ socials });
}
