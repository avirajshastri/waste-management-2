import {create} from "zustand"
import {persist} from "zustand/middleware"

type CartItem ={
    _id: string,
    name:string,
    imgUrl:string,
    price: number,
    quantity:number,
    stock: number,
}


type CartStore = {
    cart: CartItem[],
    getTotalItemInCart:() => number,
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id:string, quantity:number) => void;
    clearCart: () =>void;
}

export const useCartStore = create<CartStore>()(
    persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) => {
        const existing = get().cart.find((product) => product._id === item._id);
        if (existing) {
          set({
            cart: get().cart.map((product) =>
              product._id === item._id
                ? { ...product, quantity: product.quantity + item.quantity }
                : product
            ),
          });
        } else {
          set({ cart: [...get().cart, item] });
        }
      },

      removeFromCart: (id) =>
        set({ cart: get().cart.filter((product) => product._id !== id) }),

      updateQuantity: (id, quantity) =>
        set({
          cart: get().cart.map((product) =>
            product._id === id ? { ...product, quantity } : product
          ),
        }),
      
      getTotalItemInCart:() => get().cart.length,
      clearCart: () => set({ cart: [] }),

    }),
    { name: "cart-storage" }
  )
)