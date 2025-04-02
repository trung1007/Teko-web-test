import React from "react";

import { ProductItemType  } from "../constant/type";


const ProductItem: React.FC<ProductItemType> = ({ name, price, imageSrc }) => {
    const formatPrice = (price: number | string): string => {
        return Number(price).toLocaleString("vi-VN");
    };

    return (
        <div style={styles.container}>
            {imageSrc ? (
                <img src={imageSrc} alt={name} style={styles.image} />
            ) : (
                <div style={styles.placeholder}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#ccc" viewBox="0 0 24 24">
                        <path d="M21 19V5c0-1.103-.897-2-2-2H5C3.897 3 3 3.897 3 5v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM5 5h14v10.764l-2.387-2.388a1 1 0 0 0-1.415 0L9.937 18.627 7.59 16.282a1 1 0 0 0-1.414 0L5 17.458V5zm0 14v-1.042l2-2 2.347 2.345a1 1 0 0 0 1.415 0l5.26-5.259L19 18.764V19H5z"></path>
                    </svg>
                    <p style={styles.placeholderText}>Không có ảnh</p>
                </div>
            )}
            <div style={styles.infoContainer}>
                <p style={styles.name}>{name}</p>
                <p style={styles.price}>{formatPrice(price)} đ</p>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        paddingBottom: "10px",
    },
    image: {
        width: "100%",
        height: "180px",
        objectFit: "contain",
        marginBottom: "10px",
    },
    placeholder: {
        width: "100%",
        height: "180px",
        backgroundColor: "#f0f0f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        marginBottom: "10px",
        flexDirection: "column",
    },
    placeholderText: {
        marginTop: "5px",
        fontSize: "14px",
        color: "#888",
    },
    infoContainer: {
        padding: "0 20px",
    },
    name: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#000",
        marginBottom: "5px",
    },
    price: {
        fontSize: "14px",
        color: "#333",
    },
};

export default ProductItem;
