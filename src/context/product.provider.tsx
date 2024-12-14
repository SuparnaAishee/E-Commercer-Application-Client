import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { TQueryParam } from "../types";

export const ProductContext = createContext<IProductContext | undefined>(
  undefined
);

interface IProductContext {
  query: TQueryParam[];
  setQuery: Dispatch<SetStateAction<TQueryParam[]>>;
  selectedCategory: string | null;
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;
}

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<TQueryParam[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <ProductContext.Provider
      value={{ query, setQuery, selectedCategory, setSelectedCategory }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined || context === null) {
    throw new Error(
      "useProduct must be used within the ProductProvider context"
    );
  }
  return context;
};

export default ProductProvider;
