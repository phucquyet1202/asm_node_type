import express from "express";

import { create, getAll, getOne, removeCart, updateCartItemQuantity } from "../controllers/cart";

import { checkPermission } from "../middlewares/checkPermission";
import { loginMiddleware } from "../middlewares/loginPermission";

const router = express.Router();

router.get("/", loginMiddleware, getAll);
router.post("/:id", loginMiddleware, getOne);
router.post("/", loginMiddleware, create);
router.patch("/:cartId", loginMiddleware, updateCartItemQuantity);
router.delete("/:cartId/:productId", loginMiddleware, removeCart);

export default router;
