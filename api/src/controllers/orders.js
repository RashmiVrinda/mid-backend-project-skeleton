import db from "../configs/database.js";

/**
 * GET /api/orders
 */
export const getOrders = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const data = await db("orders")
            .where({ user_id: userId })
            .orderBy("created_at", "desc");

        res.json({ data });
    } catch (error) {
        next(error);
    }
};

/**
 * GET /api/orders/:id
 */
export const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const order = await db("orders")
            .where({ id, user_id: userId })
            .first();

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        const items = await db("order_items").where({ order_id: id });

        res.json({ data: { ...order, items } });
    } catch (error) {
        next(error);
    }
};

/**
 * POST /api/orders/checkout
 * Converts cart items into an order using a transaction
 */
export const postCheckout = async (req, res, next) => {
  try {
    const userId = req.user.id;

    await db.transaction(async (trx) => {
      // 1. Find the active cart
      const cart = await trx("app_cart")
        .where({ user_id: userId })
        .first();

      if (!cart) {
        return res.status(404).json({ error: "No active cart found" });
      }

      // 2. Get items and current prices
      const cartItems = await trx("cart_item")
        .join("event", "cart_item.event_id", "=", "event.id")
        .where({ cart_id: cart.id })
        .select("cart_item.*", "event.price");

      if (cartItems.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }

      // 3. Calculate total
      const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      // 4. Create Order
      const [newOrder] = await trx("orders")
        .insert({
          user_id: userId,
          total_price: totalPrice,
          status: "completed"
        })
        .returning("*");

      // 5. Move items to order_items
      const orderItemsToInsert = cartItems.map(item => ({
        order_id: newOrder.id,
        product_id: item.event_id,
        quantity: item.quantity,
        price_at_purchase: item.price
      }));

      await trx("order_items").insert(orderItemsToInsert);

      // 6. Clear the cart
      await trx("cart_item").where({ cart_id: cart.id }).del();

      res.status(201).json({ 
        message: "Checkout successful", 
        orderId: newOrder.id 
      });
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/cart/items
 * Adds an item to the user's cart
 */
export const postCartItem = async (req, res, next) => {
  try {
    const { event_id, quantity } = req.body;
    const userId = req.user.id;

    // --- ADD THIS VALIDATION BLOCK ---
    if (!Number.isInteger(Number(event_id)) || Number(quantity) <= 0) {
      return res.status(400).json({ 
        error: "Invalid input. 'event_id' must be an integer and 'quantity' must be greater than 0." 
      });
    }
    // ---------------------------------

    // Your existing logic to find/create cart and insert item...
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/cart/items/:itemId
 */
export const removeCartItem = async (req, res, next) => {
    try {
        const { itemId } = req.params;
        const userId = req.user.id;

        // 1. Find the user's cart to ensure they own the item
        const cart = await db("app_cart").where({ user_id: userId }).first();
        
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        // 2. Delete the item only if it belongs to this user's cart
        const deletedCount = await db("cart_item")
            .where({ id: itemId, cart_id: cart.id })
            .del();

        if (deletedCount === 0) {
            return res.status(404).json({ error: "Item not found in your cart" });
        }

        // Successful deletion
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};