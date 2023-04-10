import express from "express";
import { getUser, signin, signup } from "../controllers/auth";
const router = express.Router()
router.post('/signup', signup)
router.post('/signin', signin)
router.get('/user', getUser)
export default router