import React from "react";
import { ProductItemType } from "../constant/type";

const ProductItem: React.FC<ProductItemType> = ({ name, price, imageSrc }) => {
    const formatPrice = (price: number | string): string => {
        return Number(price).toLocaleString("vi-VN");
    };

    return (
        <div className="pb-2">
            {imageSrc ? (
                <img src={imageSrc} alt={name} className="w-full h-[180px] object-contain mb-2 rounded-lg" />
            ) : (
                <div className="w-full h-[180px] bg-gray-200 flex flex-col justify-center items-center rounded-lg mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#ccc" viewBox="0 0 24 24">
                        <path d="M21 19V5c0-1.103-.897-2-2-2H5C3.897 3 3 3.897 3 5v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM5 5h14v10.764l-2.387-2.388a1 1 0 0 0-1.415 0L9.937 18.627 7.59 16.282a1 1 0 0 0-1.414 0L5 17.458V5zm0 14v-1.042l2-2 2.347 2.345a1 1 0 0 0 1.415 0l5.26-5.259L19 18.764V19H5z"></path>
                    </svg>
                    <p className="mt-1 text-sm text-gray-500">Không có ảnh</p>
                </div>
            )}
            <div className="px-1">
                <p className="text-lg font-bold text-black mb-1">{name}</p>
                <p className="text-sm text-gray-700">{formatPrice(price)} đ</p>
            </div>
        </div>
    );
};

export default ProductItem;
