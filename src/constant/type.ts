export type LabelAttributes = {
  label: {
    text: string;
  };
};

export type ButtonAttributes = {
  button: {
    text: string;
  };
};

export type FormField = {
  label: string;
  required?: boolean;
  name: string;
  type: "text" | "number" | "file_upload";
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
};

export type FormAttributes = {
  form: FormField[];
};

export type ProductItemType = {
  name: string;
  price: number;
  imageSrc?: string;
};

export type ProductListAttributes = {
  productlist: {
    items: ProductItemType[];
  };
};

// Union type cho các customAttributes
export type CustomAttributes =
  | LabelAttributes
  | ButtonAttributes
  | FormAttributes
  | ProductListAttributes;

// Định nghĩa Component chung
export type Component<T extends CustomAttributes> = {
  type: string;
  customAttributes: T;
};

// Kiểu dữ liệu tổng cho API
export type ApiResponse = {
  data: [
    {
      type: string;
      customAttributes: LabelAttributes;
    },
    {
      type: string;
      customAttributes: FormAttributes;
    },
    {
      type: string;
      customAttributes: ButtonAttributes;
    },
    {
      type: string;
      customAttributes: ProductListAttributes;
    }
  ];
};
