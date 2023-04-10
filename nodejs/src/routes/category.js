import express from "express";
import { create, dele, get, getAll, update } from "../controllers/category";
import { checkPermission } from "../middlewares/checkPermission";
const router = express.Router()
router.get('/category', getAll)
router.get('/category/:id', get)
router.post('/category', checkPermission, create)
router.put('/category/:id', checkPermission, update)
router.delete('/category/:id', checkPermission, dele)
export default router