const  Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.createCart = async(req, res)=>{
    try{
        if(req.user.role !=="Customer"){
            return res.status(403).json({message: "Only a customer can create a cart"});
        }
        const {productId, quantity} = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        //find user's cart
        let cart = await Cart.findOne({user: req.user._id});
        if(!cart){
            cart = await Cart.create({
                user: req.user._id,
                items:[{product: productId, quantity: quantity || 1},],
            }).populate("items.product");

            return res.status(201).json(cart)
        }
        //check if the product exist in the cart

        const itemIndex = cart.items.findIndex(
            item=>item.product.toString() ===productId
        );
        if(itemIndex > -1){
                //increase the quantity
                cart.items[itemIndex].quantity += quantity || 1
            } else {
                //add new product
                cart.items.push({
                    product: productId,
                    quantity: quantity || 1
                });
            };
            await cart.save();
            return res.status(200).json(cart);
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.removeProduct =async(req, res)=>{
    try{
        if(req.user.role !=="Customer"){
            return res.status(403).json({message: "Only customer can remove product from cart"});
        };

        const {productId} = req.params;
        const cart = await Cart.findOne({user: req.user._id});
        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        };
        const itemIndex = cart.items.findIndex(
          item => item.product.toString() === productId
       );

        if (itemIndex === -1) {
            return res.status(404).json({
                message: "Product not found in cart",
            });
        };

        cart.items.splice(itemIndex, 1);

        await cart.save();

        return res.status(200).json({
            message: "Product removed successfully", cart
        });
    
    } catch(error){
        res.status(500).json({message: error.message})
    }
};

exports.updateCart = async(req, res) =>{
    try {
        if(req.user.role !=="Customer"){
            return res.status(403).json({message: "Only customer can update their cart"});
        };
        const {productId} = req.params;
        const {quantity} = req.body;
        if(!quantity || quantity <1){
            return res.status(400).json({message: "Quantity must be atleast 1"});
        };
        const cart = await Cart.findOne({user: req.user._id});
        if(!cart){
            return res.status(404).json({message: "cart not found"});
        };

        const itemIndex = cart.items.findIndex(
            item=>item.product.toString() === productId
        );
        if(itemIndex ===-1){
            return res.status(404).json({message: "Item not found in cart"});
        };
        cart.items[itemIndex].quantity= quantity;
        await cart.save();
        return res.status(200).json(cart);
    } catch(error){
        res.status(500).json({message: error.message})
    }
};
exports.getCart = async (req, res) => {
    try {
        if (req.user.role !== "Customer") {
            return res.status(403).json({
                message: "Only customers can view their cart",
            });
        }

        const cart = await Cart.findOne({
            user: req.user._id,
        }).populate("items.product");

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }

        return res.status(200).json(cart);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};