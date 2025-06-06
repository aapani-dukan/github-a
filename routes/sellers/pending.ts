import { Router, Request, Response, NextFunction } from "express";
import { sellers } from "../../server/storage";

const router = Router();

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const pendingSellers = sellers
      .filter((seller) => seller.approvalStatus === "pending")
      .sort(
        (a, b) =>
          new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
      );

    res.json(pendingSellers);
  } catch (error) {
    next(error);
  }
});

export default router;
