import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import {

  X,
} from "feather-icons-react/build/IconComponents";
import {
  Check,
  Edit,
  Trash2,
  UserPlus,
} from "react-feather";
import Select from "react-select" 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import PosModals from "../../core/modals/pos-modal/posModals";
import CounterThree from "../../core/common/counter/counterThree";
import {  useFilterProductQuery, useGetCategoryListQuery , useGetProductListQuery } from "../../core/redux/api/productApi";
import { useGetCartQuery, useRemoveFromCartMutation, useAddToCartMutation, useEmptyCartMutation, useGetCartTotalsQuery } from "../../core/redux/api/cartApi";
import Pos2Counter from "./pos2Counter";
import Item from "antd/es/list/Item";
import { useDebounce } from "use-debounce";
import { Empty } from "antd";
import { useSelector } from "react-redux";
import PrintReceiptModal from "./PrintReceiptModal";

const Pos2 = () => {
  const { user } = useSelector((state) => state.user);
  console.log("userstatedata", user);
  const {data: categoryList, isLoading: categoryLoading} = useGetCategoryListQuery([]);
  const [allProducts, setAllProducts] = useState([]);
const { data: initialProducts } = useGetProductListQuery();
const [addToCartMutation] = useAddToCartMutation();
 const [removeFromCart] = useRemoveFromCartMutation();
 const [emptyCart] = useEmptyCartMutation();
//  deletProductFromCart("asdjf");
useEffect(() => {
  if (initialProducts) {
    setAllProducts(initialProducts.data || []);
  }
}, [initialProducts]);
useEffect(()=>{

}, []);
  const [filters, setFilters] = useState({
    category: 'all',
    search: ''
  });
  const { data: serverCart ,refetch: refetchCart  } = useGetCartQuery();

  console.log("serverCart" , serverCart);
 const [activeTab , setActiveTab] = useState('all');
 const [searchInput, setSearchInput] = useState('');

 const [debouncedSearch] = useDebounce(searchInput, 800);


const handleCategoryClick = (categoryId) => {
  setFilters(prev => ({
    ...prev,
    category: categoryId
  }));
};

// useEffect(() => {
//   setFilters(prev => ({...prev, search: debouncedSearch[0]}));
// }, [debouncedSearch]);
// debouncedSearch
const queryParams = useMemo(() => ({
  category: filters.category === 'all' ? undefined : filters.category,
  search: debouncedSearch || undefined,
}), [filters.category, debouncedSearch]);

const { data: filteredProducts, isLoading: productsLoading } = useFilterProductQuery(queryParams);
const {data: amount} = useGetCartTotalsQuery();
console.log("amount", amount);
const productsToDisplay = useMemo(() => {
  if (filters.category === 'all' && !debouncedSearch) {
    return initialProducts?.data || [];
  }
  return filteredProducts?.data || [];
}, [initialProducts, filteredProducts, filters.category, debouncedSearch]);
const [cart , setCart] = useState([]);
const Location = useLocation();
const [showAlert1 , setShowAlert1] = useState(true)
const cartItems = useMemo(() => {
  return serverCart?.map(item => ({
    ...item,
    key: item?.product?._id
  }));
}, [serverCart]);

const addToCart = async(productId) => {
  try {
    await addToCartMutation({productId, quantity: 1});
    refetchCart();
  } catch (error) {
    console.log(error);
  }
}
const handleRemoveFromCart = async(productId) => {
  try {
    await removeFromCart(productId)
    refetchCart();
  } catch (error) {
    console.log(error);
  }
}
const handleEmptyCart = async()=> {
  try {
    await emptyCart();
    refetchCart();
  } catch (error) {
    console.log(error);
  }
}
  const settings = {
    dots: false,
    autoplay: false,
    slidesToShow: 6,
    margin: 0,
    speed: 500,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const options = [
    { value: 'walkInCustomer', label: 'Walk in Customer' },
    { value: 'john', label: 'John' },
    { value: 'smith', label: 'Smith' },
    { value: 'ana', label: 'Ana' },
    { value: 'elza', label: 'Elza' },
  ];
  const productOptions = [
    { value: "search", label: "Search Products" },
    { value: "iphone", label: "IPhone 14 64GB" },
    { value: "macbook", label: "MacBook Pro" },
    { value: "rolex", label: "Rolex Tribute V3" },
    { value: "nike", label: "Red Nike Angelo" },
    { value: "airpod", label: "Airpod 2" },
    { value: "oldest", label: "Oldest" },
  ];
  
  const gstOptions = [
    { value: "choose", label: "Choose" },
    { value: "gst5", label: "GST 5%" },
    { value: "gst10", label: "GST 10%" },
    { value: "gst15", label: "GST 15%" },
    { value: "gst20", label: "GST 20%" },
    { value: "gst25", label: "GST 25%" },
    { value: "gst30", label: "GST 30%" },
  ];
  const numericOptions = [
    { value: "0", label: "0" },
    { value: "15", label: "15" },
    { value: "20", label: "20" },
    { value: "25", label: "25" },
    { value: "30", label: "30" },
  ];
  
  const percentageOptions = [
    { value: "0%", label: "0%" },
    { value: "10%", label: "10%" },
    { value: "15%", label: "15%" },
    { value: "20%", label: "20%" },
    { value: "25%", label: "25%" },
    { value: "30%", label: "30%" },
  ];


  return (
    <div className="main-wrapper">
      <div className="page-wrapper pos-pg-wrapper ms-0">
        <div className="content pos-design p-0">
          <div className="row align-items-start pos-wrapper">
            {/* Products */}
            <div className="col-md-12 col-lg-7 col-xl-8">
              <div className="pos-categories tabs_wrapper pb-0">
               
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className="mb-3">Categories</h4>
                </div>
                <Slider {...settings} className="tabs owl-carousel pos-category">
                <div 
                    className={`owl-item ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('all')}
                  >
                    <Link to="#">
                      <ImageWithBasePath
                        src="assets/img/categories/all-products.svg"
                        alt="All Products"
                      />
                    </Link>
                    <h6>
                      <Link to="#">All Products</Link>
                    </h6>
                    {/* <span>{filteredProducts?.count || 0} Items</span> */}
                  </div>
                    {categoryLoading ? (
                    <div className="owl-item">
                      <Link to="#">
                        <ImageWithBasePath
                          src="assets/img/categories/category-06.svg"
                          alt="Loading"
                        />
                      </Link>
                      <h6>
                        <Link to="#">Loading...</Link>
                      </h6>
                      <span>0 Items</span>
                    </div>
                  ) : (
                    categoryList?.map((item) => (
                      <div 
                        key={item._id}
                        className={`owl-item ${activeTab === item.name.toLowerCase() ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(item?._id)}
                      >
                        <Link to="#">
                          <ImageWithBasePath
                            src={item.icon || "assets/img/categories/default-category.svg"}
                            alt={item.name}
                          />
                        </Link>
                        <h6>
                          <Link to="#">{item.name}</Link>
                        </h6>
                        {/* <span>
                          {filteredProducts?.data?.filter(p => p.category === item._id).length || 0} Items
                        </span> */}
                      </div>
                    ))
                  )}
                 
                </Slider>
                <div className="pos-products">
                  <div className="d-flex align-items-center justify-content-between">
                    <h4 className="mb-3">Products</h4>
                    <div className="input-icon-start pos-search position-relative mb-3">
                      <span className="input-icon-addon">
                        <i className="ti ti-search" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Product"
                        onChange={(e)=> setSearchInput(e.target.value)}
                        value={searchInput}
                      />
                    </div>
                  </div>
                  <div className="tabs_container">
                  
                    <div className={`tab_content ${activeTab === 'all' ? 'active' : ''} `} data-tab="filtered">
                    <div className="row">
                      {productsLoading ? (
                        // Loading state
                        [...Array(8)].map((_, index) => (
                          <div key={`skeleton-${index}`} className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                            <div className="product-info card">
                              <div className="pro-img skeleton-box" style={{ height: '180px' }} />
                              <h6 className="cat-name skeleton-box" style={{ width: '80%', height: '20px' }} />
                              <h6 className="product-name skeleton-box" style={{ width: '90%', height: '24px' }} />
                              <div className="d-flex align-items-center justify-content-between price">
                                <span className="skeleton-box" style={{ width: '40%', height: '18px' }} />
                                <p className="skeleton-box" style={{ width: '30%', height: '18px' }} />
                              </div>
                            </div>
                          </div>
                        ))
                      ) : filteredProducts?.data?.length > 0 ? (
                        // Products grid
                        filteredProducts?.data?.map((product) => (
                          product && ( 
                            <div key={product?._id} className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                              <div className="product-info card" onClick={() => addToCart(product?._id)}
                                  >
                                <Link to="#" className="pro-img">
                                  <ImageWithBasePath
                                    src={"assets/img/products/pos-product-17.png"}
                                
                                    alt={product?.productName || product?.name || "Product"}
                                    onError={(e) => {
                                      e.target.src = "assets/img/products/default-product.svg";
                                    }}
                                  />
                                  <span><i className="ti ti-circle-check-filled" /></span>
                                </Link>
                                <h6 className="cat-name">
                                  <Link to="#">
                                    {typeof product?.category === 'object' 
                                      ? product?.category?.name 
                                      : product?.category || 'Uncategorized'}
                                  </Link>
                                </h6>
                                <h6 className="product-name">
                                  <Link to="#">{product?.productName || product?.name || "Unnamed Product"}</Link>
                                </h6>
                                <div className="d-flex align-items-center justify-content-between price">
                                  <span>{product?.quantity || 0} {product?.unit?.unitName || 'Pcs'}</span>
                                  <p>Rs {(product?.saleRate || product?.price || 0).toFixed(2)}</p>
                                </div>
                              </div>
                            </div>
                          )
                        ))
                      ) : (
                        // Empty state
                        <div className="col-12 text-center py-5">
                          <div className="fs-24 mb-3">
                            <i className="ti ti-shopping-cart" />
                          </div>
                          <p className="fw-bold">No products found</p>
                          {filters.search && (
                              <p className="text-muted">No results for </p>
                            )}
                        </div>
                      )}
                    </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
            {/* /Products */}
            <div className="col-md-12 col-lg-5 col-xl-4 ps-0 theiaStickySidebar">
              <aside className="product-order-list">
                <div className="order-head bg-light d-flex align-items-center justify-content-between w-100">
                  <div>
                    <h3>Order List</h3>
                    <span>ORDER ID : #65565</span>
                  </div>
                  <div>
                    <Link className="link-danger fs-16" to="#">
                      <i className="ti ti-trash-x-filled" />
                    </Link>
                  </div>
                </div>
          
                <div className="product-added block-section">
                  <div className="head-text d-flex align-items-center justify-content-between">
                    <h5 className="d-flex align-items-center mb-0">
                      Product Added<span className="count">{serverCart?.length}</span>
                    </h5>
                    <Link
                      to="#"
                      className="d-flex align-items-center link-danger"
                        data-bs-toggle="modal"
                         data-bs-target="#delete"
                    >
                      <span className="me-2">
                        <X className="feather-16" />
                      </span>
                      Clear all
                    </Link>
                  </div>
                  <div className="product-wrap">
                
                  
                    {
                      serverCart?.length > 0 ? (
                        serverCart?.map((item)=> {
                      
                        return(
                          <div className="product-list d-flex align-items-center justify-content-between" key={item?.product?._id}>
                          <div
                            className="d-flex align-items-center product-info"
                            data-bs-toggle="modal"
                            data-bs-target="#products"
                          >
                            <Link to="#" className="pro-img">
                              <ImageWithBasePath
                                src={item?.product?.image?.[0]}
                                alt={item?.product?.productName}
                                width={20}
                              />
                            </Link>
                            <div className="info">
                              <span>{item?.product?.sku}</span>
                              <h6>
                                <Link to="#">{item?.product?.productName}</Link>
                              </h6>
                              <p className="fw-bold text-teal">{item?.saleRate}</p>
                            </div>
                          </div>
                          <div className="d-flex  align-items-center gap-3">
                          <div className="qty-item text-center">
                            <Pos2Counter productId={item?.product?._id} initialQuantity={item?.quantity} />
                          </div>
                          <div className="action d-flex align-items-center justify-content-center">
                            <Link
                              className="btn-icon delete-icon"
                              to="#"
                              onClick={() => handleRemoveFromCart(item?.product?._id)}
                            >
                              <Trash2 className="feather-14" />
                            </Link>
                          </div>
                        </div>
                        </div>
                        )
                       })
                      ) : ( <div className="empty-cart">
                        <div className="fs-24 mb-1">
                          <i className="ti ti-shopping-cart" />
                        </div>
                        <p className="fw-bold">No Products Selected</p>
                      </div> )
                    }
                  
               
                  </div>
                </div>
  
                <div className="block-section">
                  {/* <div className="selling-info">
                    <div className="row g-3">
                      <div className="col-12 col-sm-4">
                        <div>
                          <label className="form-label">Order Tax</label>
                          <Select
                      options={gstOptions}
                      classNamePrefix="react-select select"
                      placeholder="Select"
                      defaultValue={gstOptions[0]}
                      />
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div>
                          <label className="form-label">Shipping</label>
                          <Select
                      options={numericOptions}
                      classNamePrefix="react-select select"
                      placeholder="Select"
                      defaultValue={numericOptions[0]}
                      />
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div>
                          <label className="form-label">Discount</label>
                          <Select
                      options={percentageOptions}
                      classNamePrefix="react-select select"
                      placeholder="Select"
                      defaultValue={percentageOptions[0]}
                      />
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="order-total">
                    <table className="table table-responsive table-borderless">
                      <tbody>
                        <tr>
                          <td>Sub Total</td>
                          <td className="text-end">Rs {amount?.subtotal}</td>
                        </tr>
                        <tr>
                          <td>Tax (GST )</td>
                          <td className="text-end">Rs {amount?.tax}</td>
                        </tr>
                        {/* <tr>
                          <td>Shipping</td>
                          <td className="text-end">$40.21</td>
                        </tr> */}
                        <tr>
                          <td>Sub Total</td>
                          <td className="text-end">Rs {amount?.subtotal}</td>
                        </tr>
                        <tr>
                          <td className="text-danger">Total Savings </td>
                          <td className="text-danger text-end">Rs {amount?.discount}</td>
                        </tr>
                        <tr>
                          <td>Total</td>
                          <td className="text-end">Rs {amount?.total}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="block-section payment-method">
                  <h4>Payment Method</h4>
                  <div className="row align-items-center justify-content-center methods g-3">
          
                    <div className="col-sm-6 col-md-4">
                      <Link
                        to="#"
                        className="payment-item"
                        data-bs-toggle="modal"
                        data-bs-target="#payment-card"
                      >
                        <i className="ti ti-credit-card fs-18" />
                        <span>Debit Card</span>
                      </Link>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <Link
                        to="#"
                        className="payment-item"
                        data-bs-toggle="modal"
                        data-bs-target="#scan-payment"
                      >
                        <i className="ti ti-scan fs-18" />
                        <span>UPI</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="btn-block">
                  <Link
                    className="btn btn-secondary w-100"
                    to="#"
                      data-bs-target="#print-receipt"
                      data-bs-toggle="modal"
                  >
                    Grand Total : Rs {amount?.total}
                  </Link>
                </div>
                <div className="btn-row d-sm-flex align-items-center justify-content-between">
                  <Link
                    to="#"
                    className="btn btn-purple d-flex align-items-center justify-content-center flex-fill"
                    data-bs-toggle="modal"
                    data-bs-target="#hold-order"
                  >
                    <i className="ti ti-player-pause me-1" />
                    Hold
                  </Link>
                  <Link
                    to="#"
                    className="btn btn-danger d-flex align-items-center justify-content-center flex-fill"
                  >
                    <i className="ti ti-trash me-1" />
                    Void
                  </Link>
                  <Link
                    to="#"
                    className="btn btn-success d-flex align-items-center justify-content-center flex-fill"
                    data-bs-toggle="modal"
                    // data-bs-target="#payment-completed"
                     data-bs-target="#hold-order"
                                       
                  >
                    <i className="ti ti-cash-banknote me-1" />
                    Payment
                  </Link>
                </div>
                
              </aside>
            </div>
          </div>
        </div>
      </div>
      {/* <PosModals/> */}
      <div
    className="modal fade modal-default"
    id="delete"
    aria-labelledby="payment-completed"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body p-0">
          <div className="success-wrap text-center">
            <form >
              <div className="icon-success bg-danger-transparent text-danger mb-2">
                <i className="ti ti-trash" />
              </div>
              <h3 className="mb-2">Are you Sure!</h3>
              <p className="fs-16 mb-3">
                The current order will be deleted as no payment has been made so
                far.
              </p>
              <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
                <button
                  type="button"
                  className="btn btn-md btn-secondary"
                  data-bs-dismiss="modal"
                >
                  No, Cancel
                </button>
                <button type="button" data-bs-dismiss="modal" className="btn btn-md btn-primary" onClick={handleEmptyCart}>
                  Yes, Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Print Receipt */} 
  <PrintReceiptModal user={user} serverCart={serverCart} amount={amount}/>
    <div
      className="modal fade modal-default"
      id="print-receipt"
      aria-labelledby="print-receipt"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="icon-head text-center">
              <Link to="#">
                <ImageWithBasePath
                  src="assets/img/logo.png"
                  width={100}
                  height={30}
                  alt="Company Logo"
                />
              </Link>
            </div>
            <div className="text-center info text-center">
              <h6>{user?.company}</h6>
              <p className="mb-0">Phone Number: +91 9876665656</p>
              <p className="mb-0">
                Email: <Link to="mailto:example@gmail.com">company@gmail.com</Link>
              </p>
            </div>
            <div className="tax-invoice">
              <h6 className="text-center">Tax Invoice</h6>
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="invoice-user-name">
                    <span>Name: </span>John Doe
                  </div>
                  <div className="invoice-user-name">
                    <span>Invoice No: </span>CS132453
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <div className="invoice-user-name">
                    <span>Customer Id: </span>#LL93784
                  </div>
                  <div className="invoice-user-name">
                    <span>Date: </span> {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            <table className="table-borderless w-100 table-fit">
              <thead>
                <tr>
                  <th># Item</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {
                  serverCart?.length > 0 ? (
                    serverCart?.map((item , index)=> {
                      
                      return(   <tr key={item?._id}>
                        <td>{index+1}. {item?.productName}</td>
                        <td>{item?.saleRate}</td>
                        <td>{item?.quantity}</td>
                        <td className="text-end">{item?.saleRate * item?.quantity}</td>
                      </tr>)
                 
                })) : ( <tr className="empty-cart">
                    <td className="fs-24 mb-1">
                      <i className="ti ti-shopping-cart" />
                    </td>
                    <td className="fw-bold">No Products Selected</td>
                  </tr> )
                }
            <tr>
                          <td>Sub Total</td>
                          <td className="text-end">Rs {amount?.subtotal}</td>
                        </tr>
                        <tr>
                          <td>Tax (GST )</td>
                          <td className="text-end">Rs {amount?.tax}</td>
                        </tr>
                        {/* <tr>
                          <td>Shipping</td>
                          <td className="text-end">$40.21</td>
                        </tr> */}
                        <tr>
                          <td>Sub Total</td>
                          <td className="text-end">Rs {amount?.subtotal}</td>
                        </tr>
                        <tr>
                          <td className="text-danger">Total Savings </td>
                          <td className="text-danger text-end">Rs {amount?.discount}</td>
                        </tr>
                        <tr>
                          <td>Total</td>
                          <td className="text-end">Rs {amount?.total}</td>
                        </tr>
                <tr>
                  <td colSpan={4}>
                    <table className="table-borderless w-100 table-fit">
                      <tbody>
                        <tr>
                          <td className="fw-bold">Sub Total :</td>
                          <td className="text-end"> Rs {amount?.subtotal}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Savings :</td>
                          <td className="text-end">-Rs {amount?.discount}</td>
                        </tr>
                        {/* <tr>
                          <td className="fw-bold">Shipping :</td>
                          <td className="text-end">0.00</td>
                        </tr> */}
                        <tr>
                          <td className="fw-bold">Tax (GST) :</td>
                          <td className="text-end">Rs {amount?.tax}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Total Bill :</td>
                          <td className="text-end">Rs {amount?.total}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Due :</td>
                          <td className="text-end">$0.00</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Total Payable :</td>
                          <td className="text-end">Rs {amount?.total}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-center invoice-bar">
              <div className="border-bottom border-dashed">
                <p>
                  **VAT against this challan is payable through central
                  registration. Thank you for your business!
                </p>
              </div>
              {/* <Link to="#">
                <ImageWithBasePath src="assets/img/barcode/barcode-03.jpg" alt="Barcode" />
              </Link> */}
              {/* <p className="text-dark fw-bold">Sale 31</p> */}
              <p>Thank You For Shopping With Us. Please Come Again</p>
              <Link to="#" className="btn btn-md btn-primary">
                Print Receipt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* /Print Receipt */}
    {/* Products */}
    </div>
  );
};

export default Pos2;