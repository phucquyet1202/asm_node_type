import express from "express";
import { getUser, getUserByToken, signin, signup } from "../controllers/auth";
const router = express.Router()
router.post('/signup', signup)
router.post('/signin', signin)
router.get('/user', getUser)
router.post('/get-user-token', getUserByToken)
export default router