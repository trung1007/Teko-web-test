import React from "react";
import ProductItem from "./ProductItem";
import { useMediaQuery } from "react-responsive";

type ProductGridProps = {
    productList: { name: string; price: number; imageSrc?: string }[];
};

const ProductGrid: React.FC<ProductGridProps> = ({ productList }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

    return (
        <div className="mt-3 overflow-y-auto">
            <div className={`grid gap-5 ${isTablet ? "grid-cols-3" : "grid-cols-2"}`}>
                {productList.map((item) => (
                    <div key={item.name}>
                        <ProductItem name={item.name} price={item.price} imageSrc={item.imageSrc} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
