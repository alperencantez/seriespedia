import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function main(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await prisma.$connect();
      const check = await prisma.userData.findUnique({
        where: <object>{
          email: req.body.data.email,
        },
      });

      if (check === null) {
        const newUser = await prisma.userData.create({
          data: {
            email: req.body.data.email,
            watchlist: req.body.data.watchlist,
          },
        });
        return res.status(200).json({ newUser });
      }

      // checks for duplicates; user cannot add the same show more than once
      if (check.watchlist.includes(req.body.data.watchlist.join()) !== true) {
        const updatedUser = await prisma.userData.update({
          where: <object>{
            email: req.body.data.email,
          },
          data: {
            watchlist: {
              push: req.body.data.watchlist.join(),
            },
          },
        });
        return res.status(200).json({ updatedUser });
      }
      return res.status(200).json("This show is already in your watchlist");
    } catch (er) {
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else if (req.method === "PATCH") {
    try {
      await prisma.$connect();
      const user = await prisma.userData.findUnique({
        where: <object>{
          email: req.body.data.email,
        },
      });

      // ensuring the null safety, it'll execute this block everytime
      if (user !== null) {
        user.watchlist = req.body.data.watchlist;
      }

      const updatedWatchlist = await prisma.userData.update({
        where: {
          email: req.body.data.email,
        },
        data: {
          watchlist: req.body.data.watchlist,
        },
      });

      return res.status(200).json({ updatedWatchlist });
    } catch (er) {
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else if (req.method === "GET") {
    try {
      await prisma.$connect();
      const data = await prisma.userData.findMany({});

      return res.status(200).json({ data });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
}

try {
  main;
} catch (e) {
  throw e;
} finally {
  async () => {
    await prisma.$connect();
  };
}
