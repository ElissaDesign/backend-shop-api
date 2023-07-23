import { Router } from "express";
import { requireAuth } from "../middleware/require-auth.js";
import { getAllUsers, updateUser, deleteUser } from "../controllers/users.js";

const userRoutes = Router();

userRoutes.use(requireAuth);

userRoutes.get("/", getAllUsers);
userRoutes.patch("/:userId", updateUser);
userRoutes.delete("/:userId", deleteUser);

export default userRoutes;
