import express from 'express'
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/user.Controller.js'

router.get("/", getUsers)
router.get("/:id", getUserById)
router.put("/:id", updateUser)
router.deleteUser("/:id", deleteUser)

export default router;
