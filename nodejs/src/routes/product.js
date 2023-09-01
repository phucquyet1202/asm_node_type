import express from "express";
import { create, get, getAll, remove, update } from "../controllers/product";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", get);
router.post("/", create);
router.put("/:id", checkPermission, update);
router.delete("/:id", checkPermission, remove);
// router.get("/?name=:name", search);


export default router;
