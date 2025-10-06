import { useState, createContext, ReactNode } from "react";
import productsData from "../data/products.json";
import { DataContextType, Product } from "../types";

export const dataContext = createContext<DataContextType | undefined>(undefined);

interface ProductdataProps {
    children: ReactNode;
}

function Productdata({ children }: ProductdataProps) {
    const [productData, setProductData] = useState<Product[]>(productsData as Product[]);
    const [searchToggle, setSearchToggle] = useState<boolean>(false);

    return (
        <dataContext.Provider
            value={{
                productData,
                setProductData,
                searchToggle,
                setSearchToggle,
            }}
        >
            {children}
        </dataContext.Provider>
    );
}

export default Productdata;
