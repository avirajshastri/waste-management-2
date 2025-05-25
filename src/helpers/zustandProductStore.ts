import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  _id: string;
  name: string;
  description: string;
  imgUrl: string;
  price: number;
  stock: number;
};

type ProductStore = {
  product: Product | null;
  setProduct: (product: Product) => void;
};

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      product: null,
      setProduct: (product) => set({ product }),
    }),
    {
      name: "product-storage", // key in localStorage
    }
  )
);
