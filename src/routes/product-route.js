import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  getAllProductCategories,
  getProductsByCategory,
  deleteProductById,
} from "../controllers/products.js";
import { requireAuth } from "../middleware/require-auth.js";
import upload from "../fileupload/cloudinary.js";

const productRoutes = Router();

productRoutes.get("/", getAllProducts);
productRoutes.get("/categories", getAllProductCategories);
productRoutes.get("/:category", getProductsByCategory);

productRoutes.use(requireAuth);

productRoutes.post("/", upload.single("image"), createProduct);
productRoutes.patch("/:productId", updateProduct);
productRoutes.delete("/:productId", deleteProductById);

export default productRoutes;
