import { Router } from "express";
import authRoute from "./auth-route.js";
import userRoute from "./user-route.js";
import productRoutes from "./product-route.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/products", productRoutes);

export default router;
