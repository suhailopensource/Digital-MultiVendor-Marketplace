import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("Running keep-alive query...");
    const data = await prisma.product.findMany({
      select: {
        price: true,
        name: true,
        smallDescription: true,
        id: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    console.log("Query executed successfully. Data:", data);
    res.status(200).json({ success: true, data });
  } catch (error) {
    if (error instanceof Error) {
      // Handle known error types
      console.error("Error executing query:", error.message);
      res.status(500).json({ success: false, error: error.message });
    } else {
      // Handle unknown error types
      console.error("Unknown error executing query:", error);
      res
        .status(500)
        .json({ success: false, error: "An unexpected error occurred." });
    }
  }
}
