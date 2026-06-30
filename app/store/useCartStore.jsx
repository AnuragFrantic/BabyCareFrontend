/* eslint-disable no-unused-vars */
import { cartAPI } from "@/service/cartApiCleint";
import { toast } from "react-toastify";
import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],
  summary: null,
  itemCount: 0,

  // ── Sidebar state ──
  sidebarOpen: false,

  openSidebar: () => set({ sidebarOpen: true }),

  closeSidebar: () => set({ sidebarOpen: false }),

  fetchCart: async () => {
    try {
      const res = await cartAPI.get("/cart");

      const data = res?.data?.data;

      if (res?.data?.success) {
        set({
          cart: data?.items || [],
          summary: data?.summary || null,
          itemCount: data?.summary?.item_count || 0,
        });
      }
    } catch (error) {
      console.log("Fetch cart error:", error);

      set({
        cart: [],
        summary: null,
        itemCount: 0,
      });
    }
  },

  getCartItemByVariant: (variantId) => {
    return get().cart.find(
      (item) => item?.variant?._id === variantId
    );
  },

  addToCart: async (variantId, size) => {
    try {
      const res = await cartAPI.post("/cart", {
        variant: variantId,
        quantity: 1,
        size,
      });

      if (res?.data?.success) {
        // toast.success(res.data.message || "Item added to cart");
        await get().fetchCart();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to add item"
      );

      console.log("Add to cart error:", error);
    }
  },

  updateQuantity: async (
    cartItemId,
    quantity,
    size
  ) => {
    try {
      let res;

      if (quantity <= 0) {
        res = await cartAPI.post(`/cart/delete/${cartItemId}`);
      } else {
        res = await cartAPI.put(`/cart/update/${cartItemId}`, {
          quantity,
          size,
        });
      }

      if (res?.data?.success) {
        // toast.success(res.data.message || "Cart updated");
        await get().fetchCart();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update cart"
      );

      console.log("Update quantity error:", error);
    }
  },

  removeCart: async (cartItemId) => {
    try {
      const res = await cartAPI.post(
        `/cart/delete/${cartItemId}`
      );

      if (res?.data?.success) {
        toast.success(
          res.data.message || "Item removed from cart"
        );

        await get().fetchCart();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Failed to remove item"
      );

      console.log("Remove cart error:", error);
    }
  },
}));