import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  console.log("var:", process.env.REVALIDATE_SECRET);
  console.log("header:", req.headers);
  console.log("equal?:", req.headers['x-secret'] === process.env.REVALIDATE_SECRET);
  if (req.headers['x-secret'] === process.env.REVALIDATE_SECRET) {
    await res.unstable_revalidate("/");
    return res.json({revalidate: true});
  }
  return res.status(401).end();
}