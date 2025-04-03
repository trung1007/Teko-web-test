import { useEffect, useState } from 'react';
import { ApiResponse, ProductItemType } from './constant/type';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ProductGrid from './components/ProductGrid';
import { IoIosCloudUpload } from "react-icons/io";
import { Spinner } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

function App() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState<ProductItemType[]>([]);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState('');
  const [nameError, setNameError] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 1024px)' });

  // Xử lý thay đổi input và kiểm tra lỗi
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === 'productName') {
      setProductName(value);
      setNameError(value.trim() ? '' : 'Tên sản phẩm không được để trống');
    }

    if (id === 'price') {
      const newPrice = value.replace(/[^0-9]/g, ''); // Chỉ giữ lại số
      setPrice(newPrice);
      setPriceError(newPrice ? '' : 'Giá sản phẩm không được để trống');
    }
  };

  // Xử lý submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    if (!productName.trim()) {
      setNameError('Tên sản phẩm không được để trống');
      isValid = false;
    } else if (productName.length > 20) {
      setNameError('Tên sản phẩm không hợp lệ. Tên sản phẩm phải dưới 20 kí tự.');
      isValid = false;
    } else {
      setNameError('');
    }

    const priceNumber = parseFloat(price);
    if (!price.trim()) {
      setPriceError('Giá sản phẩm không được để trống');
      isValid = false;
    } else if (isNaN(priceNumber) || priceNumber < 10000 || priceNumber > 100000000) {
      setPriceError('Giá không hợp lệ. Phải từ 10.000 đến 100.000.000 đ.');
      isValid = false;
    } else {
      setPriceError('');
    }

    if (!isValid) return;

    const newProduct: ProductItemType = {
      name: productName,
      price: priceNumber,
      imageSrc: selectedImage || '',
    };

    setProductList((prevList) => [newProduct, ...prevList]);
    setProductName('');
    setPrice('');
    setFile(null)
    setSelectedImage(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file);
      setSelectedImage(URL.createObjectURL(file)); // Lưu URL ảnh để hiển thị
    }
  };
  // Fetch data từ API
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('https://hiring-test.stag.tekoapis.net/api/products/management');
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.log('Lỗi khi tải dữ liệu');;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data?.data[3]?.customAttributes?.productlist?.items) {
      setProductList(data.data[3].customAttributes.productlist.items);
    }
  }, [data]);

  return (
    <div className="w-screen h-full flex items-center justify-center p-2">
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Spinner animation="border" role="status" variant="primary" />
          <span className="ml-2">Đang tải...</span>
        </div>
      ) : (<div className={`${isMobileOrTablet ? 'w-full' : 'w-1/4'}
        h-full flex flex-col items-center p-3 gap-4 
        border border-gray-300 rounded-lg shadow-lg`}>
        <div>
          <span className="text-2xl font-bold">{data?.data[0].customAttributes?.label?.text}</span>
        </div>

        {/* FORM NHẬP SẢN PHẨM */}
        <div className="w-full flex flex-col items-center">
          <Form className="w-full flex flex-col gap-4 justify-center" onSubmit={handleSubmit} noValidate>
            <Form.Group className="flex flex-col gap-1">
              <Form.Label className="w-fit font-bold" htmlFor="productName">
                <span className="text-red-500">*</span> {data?.data[1].customAttributes.form[0].label}
              </Form.Label>
              <Form.Control
                id="productName"
                className={`w-full ${nameError ? 'border-red-500' : ''}`}
                type="text"
                placeholder="Nhập tên sản phẩm"
                value={productName}
                onChange={handleChange}
              />
              {nameError && <span className="text-[16px] text-red-500 mt-1">{nameError}</span>}
            </Form.Group>

            <Form.Group className="flex flex-col gap-1">
              <Form.Label className="w-fit font-bold" htmlFor="price">
                <span className="text-red-500">*</span> {data?.data[1].customAttributes.form[1].label}
              </Form.Label>
              <Form.Control
                id="price"
                className={`w-full ${priceError ? 'border-red-500' : ''}`}
                type="text"
                placeholder="Nhập giá sản phẩm"
                value={price}
                onChange={handleChange}
              />
              {priceError && <span className="text-[16px] text-red-500 mt-1">{priceError}</span>}
            </Form.Group>

            <Form.Group className="flex flex-col gap-1 w-fit">
              <Form.Label className="fw-bold" htmlFor="image">
                Ảnh sản phẩm
              </Form.Label>
              <Button
                variant="light"
                className="d-flex align-items-center gap-2 w-100 border rounded py-2"
                onClick={() => document.getElementById("image")?.click()}
              >
                <IoIosCloudUpload />
                <span className="text-secondary">Chọn tệp tin (tối đa 5MB)</span>
              </Button>
              <Form.Control
                id="image"
                type="file"
                accept='image/*'
                className="d-none"
                onChange={handleFileChange}
              />
              {file && <span className="text-muted">{file.name}</span>}
              {selectedImage && (
                <div className="mt-3">
                  <img
                    src={selectedImage}
                    alt="Product Preview"
                    className="w-full h-auto max-h-60 object-cover border rounded"
                  />
                </div>
              )}
            </Form.Group>

            <div className="flex justify-center">
              <Button variant="primary" type="submit">
                Tạo sản phẩm
              </Button>
            </div>
          </Form>
        </div>
        <div>
          {Array.isArray(productList) && productList.length > 0 ? (
            <ProductGrid productList={productList} />
          ) : (
            <div>
              <span>Không có sản phẩm</span>
            </div>
          )}
        </div>
      </div>)}

    </div>
  );
}

export default App;
