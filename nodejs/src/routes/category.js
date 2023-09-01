import express from "express";
import { create, dele, get, getAll, update } from "../controllers/category";
import { checkPermission } from "../middlewares/checkPermission";
const router = express.Router()
router.get('/', getAll)
router.get('/:id', get)
router.post('/', checkPermission, create)
router.put('/:id', checkPermission, update)
router.delete('/:id', checkPermission, dele)
export default router