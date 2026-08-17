const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.createCart = async (req, res) => {
    try {
        // Only customers can create a cart
        if (req.user.role !== "Customer") {
            return res.status(403).json({
                message: "Only a customer can create a cart"
            });
        }

        const { productId, quantity } = req.body;

        // Default quantity to 1
        const requestedQuantity = quantity || 1;

        // Validate quantity
        if (requestedQuantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }

        // Find the product
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Find user's cart
        let cart = await Cart.findOne({
            user: req.user._id
        });

        // If cart doesn't exist, create one
        if (!cart) {

            // Check stock
            if (requestedQuantity > product.stock) {
                return res.status(400).json({
                    message: `Only ${product.stock} items are available`
                });
            }

            cart = await Cart.create({
                user: req.user._id,
                items: [
                    {
                        product: productId,
                        quantity: requestedQuantity
                    }
                ]
            });

            await cart.populate("items.product");

            return res.status(201).json(cart);
        }

        // Check if product already exists in cart
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex > -1) {

            // Current quantity in cart
            const currentQuantity = cart.items[itemIndex].quantity;

            // New total quantity
            const newQuantity = currentQuantity + requestedQuantity;

            // Check stock against the new total
            if (newQuantity > product.stock) {
                return res.status(400).json({
                    message: `Only ${product.stock} items are available. You already have ${currentQuantity} in your cart.`
                });
            }

            // Increase quantity
            cart.items[itemIndex].quantity = newQuantity;

        } else {

            // Product isn't in cart yet
            if (requestedQuantity > product.stock) {
                return res.status(400).json({
                    message: `Only ${product.stock} items are available`
                });
            }

            // Add new product
            cart.items.push({
                product: productId,
                quantity: requestedQuantity
            });
        }

        await cart.save();
        await cart.populate("items.product");

        return res.status(200).json(cart);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


exports.removeProduct = async (req, res) => {
    try {
        if (req.user.role !== "Customer") {
            return res.status(403).json({
                message: "Only customers can remove products from their cart"
            });
        }

        const { id } = req.params;

        const cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === id
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        cart.items.splice(itemIndex, 1);

        await cart.save();

        return res.status(200).json({
            message: "Product removed successfully",
            cart
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


exports.updateCart = async (req, res) => {
    try {
        if (req.user.role !== "Customer") {
            return res.status(403).json({
                message: "Only customers can update their cart"
            });
        }

        const { id } = req.params;
        const { quantity } = req.body;

        // Validate quantity
        if (!quantity || quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }

        // Find cart
        const cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        // Find item in cart
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === id
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                message: "Item not found in cart"
            });
        }

        // Find product
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Check stock
        if (quantity > product.stock) {
            return res.status(400).json({
                message: `Only ${product.stock} items are available`
            });
        }

        // Update quantity
        cart.items[itemIndex].quantity = quantity;

        await cart.save();
        await cart.populate("items.product");

        return res.status(200).json(cart);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


exports.getCart = async (req, res) => {
    try {
        if (req.user.role !== "Customer") {
            return res.status(403).json({
                message: "Only customers can view their cart"
            });
        }

        const cart = await Cart.findOne({
            user: req.user._id
        }).populate("items.product");

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        return res.status(200).json(cart);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};