import React from "react";
import ProductItem from "./ProductItem";

type ProductGridProps = {
    productList: { name: string; price: number; imageSrc?: string }[];
};

const ProductGrid: React.FC<ProductGridProps> = ({ productList }) => {
    return (
        <div style={styles.scrollView}>
            <div style={styles.gridContainer}>
                {productList.map((item) => (
                    <div key={item.name} style={styles.gridItem}>
                        <ProductItem name={item.name} price={item.price} imageSrc={item.imageSrc} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    scrollView: {
        marginTop: "12px",
        overflowY: "auto",
    },
    gridContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    gridItem: {
        width: "48%",
        marginBottom: "10px",
    },
};

export default ProductGrid;
