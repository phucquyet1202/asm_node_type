import express from "express";

import { create, getAll, update, del, getOne } from "../controllers/comment";
import { loginMiddleware } from "../middlewares/loginPermission";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", loginMiddleware, create);
router.patch("/:id", loginMiddleware, update);
router.delete("/:id", loginMiddleware, del);

export default router;
