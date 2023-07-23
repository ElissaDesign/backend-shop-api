import products from "../model/product.js";

export const getAllProducts = async (req, res) => {
  try {
    const Products = await products.find({});
    res.status(200).json({ Products });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getAllProductCategories = async (req, res) => {
  try {
    const Products = await products.find({});

    // Extract unique categories from the products
    const categories = [
      ...new Set(Products.map((product) => product.category)),
    ];

    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category; // Assuming the category is passed as a route parameter

    // Find products by category using Mongoose
    const Products = await products.find({ category });

    if (Products.length === 0) {
      return res
        .status(404)
        .json({ msg: "No products found for the specified category." });
    }

    res.status(200).json({ Products });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    let { category, name, price, requiredPrice, desc } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: "No image file provided." });
    }

    const imageUrl = req.file.path;

    const newProduct = new products({
      category,
      name,
      image: imageUrl,
      price,
      requiredPrice,
      desc,
      sellerID: req.user.id,
    });
    const product = await newProduct.save();

    return res.status(200).json({ msg: "posted", data: product });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const { category, name, price, requiredPrice, desc } = req.body;

    // Find the product by ID
    const product = await products.findById(productId);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Update the product properties only if they are provided in the request body
    if (category) product.category = category;
    if (name) product.name = name;
    if (price) product.price = price;
    if (requiredPrice) product.requiredPrice = requiredPrice;
    if (desc) product.desc = desc;

    // Save the updated product
    await product.save();

    res
      .status(200)
      .json({ msg: "Product updated successfully", data: product });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error updating product", error: error.message });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await products.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ msg: "Product not found." });
    }

    res
      .status(200)
      .json({ msg: "Product deleted successfully.", data: deletedProduct });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
