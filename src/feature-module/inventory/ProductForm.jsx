import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { all_routes } from "../../Router/all_routes";
import { DatePicker } from "antd";
import Addunits from "../../core/modals/inventory/addunits";
import AddCategory from "../../core/modals/inventory/addcategory";
import AddBrand from "../../core/modals/addbrand";
import {
  ArrowLeft,
  Calendar,
  Image,
  Info,
  LifeBuoy,
  List,
  Plus,
  PlusCircle,
  X,
} from "feather-icons-react/build/IconComponents";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import CounterThree from "../../core/common/counter/counterThree";
import RefreshIcon from "../../core/common/tooltip-content/refresh";
import CollapesIcon from "../../core/common/tooltip-content/collapes";
import AddVariant from "../../core/modals/inventory/addvariant";
import AddVarientNew from "../../core/modals/inventory/addVarientNew";
import CommonTagsInput from "../../core/common/Taginput";
import TextEditor from "./texteditor";
import { useGetNewSkuIdQuery, useGetStoreListQuery, useCreateProductMutation,
  useUpdateProductMutation, useGetProductDetailByIdQuery } from "../../core/redux/api/productApi";
import { useGetCategoryListQuery } from "../../core/redux/api/categoryApi";
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
const initialFormState = {
saleRate: '',
sku: '',
store: '',
warehouse: '',
productName: '',
hsnCode: '',
counter: '',
category: '',
subcategory: '',
brand: '',
unit: '',
description: '',
quantity: '',
gstType: '',
gstRate: '',
discountType: '',
discountValue: '',
quantityAlert: '',
fastMoving: false,
warranty: '',
manufacturer: '',
manufacturedDate: '',
expiryDate: '',
}
const ProductForm = ({isEditMode}) => { 
  const [errors , setErrors] = useState([]);
  ProductForm.propTypes = {
    isEditMode: PropTypes.bool.isRequired,
  };
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const { data: stores, isLoading, error } = useGetStoreListQuery();
  const { data: category, isLoading: categoryLoading, error: categoryError } = useGetCategoryListQuery(); 
  const { 
    data: skuId, 
    isLoading: isSkuLoading, 
  } = useGetNewSkuIdQuery();
  const [inputValue, setInputValue] = useState('');
  const {productId} = useParams();
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState(initialFormState);
  const [createProduct, {isLoading: isCreating}] = useCreateProductMutation();
  const [updateProduct, {isLoading: isUpdating}] = useUpdateProductMutation();

  const {data: existingProduct, isLoading: isProductLoading} = useGetProductDetailByIdQuery(productId 
    ,{skip: !isEditMode}
  );
  
  useEffect(()=>{
    if(isEditMode && existingProduct){
      setFormData({
        ...initialFormState,
        ...existingProduct
      })
    }
  }, [isEditMode, existingProduct]);
  const handleInputChange = (e)=>{
    const {name, value} = e.target;
    setFormData(prev=> ({...prev, [name]: value}));
  }
  const handleSelectChange= (name, selectedOption) => {
    setFormData(prev => ({...prev, [name]: selectedOption?.value || ''}));
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert data to proper formats for backend
    const requestData = {
      ...formData,
      // Convert dates to ISO strings
      manufacturedDate: formData.manufacturedDate?.toISOString(),
      expiryDate: formData.expiryDate?.toISOString(),
      // Convert string booleans to actual booleans
      gstType: formData.gstType === "true",
      fastMoving: Boolean(formData.fastMoving),
      // Ensure numbers are properly formatted
      saleRate: parseFloat(formData.saleRate),
      quantity: parseInt(formData.quantity),
      gstRate: parseFloat(formData.gstRate),
      // Map frontend field names to backend names if different
      expiry: formData.expiryDate?.toISOString(), // If backend expects 'expiry' instead of 'expiryDate'
      // Include any other required transformations
    };
  
    // Remove any undefined or null values
    Object.keys(requestData).forEach(key => {
      if (requestData[key] === undefined || requestData[key] === null) {
        delete requestData[key];
      }
    });
  
    try {
      if (isEditMode) {
        await updateProduct(requestData).unwrap();
        navigate('/products');
      } else {
        await createProduct(requestData).unwrap();
        setFormData(initialFormState);
        alert("Product created successfully!");
      }
    } catch (error) {
      console.error('API Error:', error);
      if (error.data?.errors) {
        // Transform backend errors to match form field names
        const transformedErrors = error.data.errors.reduce((acc, err) => {
          // Map backend field names to frontend names if needed
          const fieldName = err.path === 'expiry' ? 'expiryDate' : err.path;
          return {...acc, [fieldName]: err.msg};
        }, {});
        setErrors(transformedErrors);
      } else {
        alert(error.data?.message || 'Failed to submit product');
      }
    }
  };
  console.log( "formData",formData);
  const handleGenerateSku = async () => {
    // const { data } = await skuId;
    console.log(skuId);
    setInputValue(skuId); 
  };
  const route = all_routes;
  const [tags, setTags] = useState(["Red", "Black"]);
  const [product, setProduct] = useState(false);
  const [product2, setProduct2] = useState(true);
  
  const storeOptions = stores?.map(store => ({
    value: store.store,
    label: store.store
  })) || [];
  const warehouse = stores?.map(store => ({
    value: store.warehouse,
    label: store.warehouse
  })) || [];

  const categoryOptions = category?.map(cat => ({
    value: cat?._id,
    label: cat?.name,
    subCategories: cat?.subCategory
  })) || [];
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    
    if (selectedOption) {
      const newSubcategories = selectedOption?.subCategories?.map(subcat => ({
        value: subcat,
        label: subcat
      }));
      setSubcategoryOptions(newSubcategories);
    } else {
      setSubcategoryOptions([]);
    }
  };

// console.log("subcategoryOption", subcategoryOptions);
const handleCheckboxChange = (e) => {
  const { name, checked } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: checked
  }));
};
  const brand = [
    { value: "choose", label: "Choose" },
    { value: "nike", label: "Nike" },
    { value: "bolt", label: "Bolt" },
  ];
  const unit = [
    { value: "choose", label: "Choose" },
    { value: "kg", label: "Kg" },
    { value: "pc", label: "Pc" },
  ];
  const counterNumber = [
    { value: "choose", label: "Choose" },
    { value: "Counter 1", label: "Counter 1" },
    { value: "Counter 2", label: "Coounter 2" },
  ];
  const barcodesymbol = [
    { value: "choose", label: "Choose" },
    { value: "code34", label: "Code34" },
    { value: "code35", label: "Code35" },
    { value: "code36", label: "Code36" },
  ];
  const gstType = [
    { value: "true", label: "Inclusive" },
    { value: "false", label: "Exclusive" },
  ];
  const gstRate = [
    { value: "5", label: "5" },
    { value: "12", label: "12" },
    { value: "18", label: "18" },
    { value: "25", label: "25" },
  ];
  const discounttype = [
    { value: "choose", label: "Choose" },
    { value: "percentage", label: "Percentage" },
    { value: "cash", label: "Cash" },
  ];
  const fastMoving = [
    { value: "true", label: "True" },
    { value: "false", label: "False" },
  ]

  const warrenty = [
    { value: "choose", label: "Choose" },
    { value: "Replacement Warranty", label: "Replacement Warranty" },
    { value: "On-Site Warranty", label: "On-Site Warranty" },
    { value: "Accidental Protection Plan", label: "Accidental Protection Plan" },
  ];
  const [isImageVisible, setIsImageVisible] = useState(true);

  const handleRemoveProduct = () => {
    setIsImageVisible(false);
  };
  const [isImageVisible1, setIsImageVisible1] = useState(true);

  const handleRemoveProduct1 = () => {
    setIsImageVisible1(false);
  };
  if (isEditMode && isProductLoading) return <div>Loading product data...</div>;
  return (
    <>

      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Create Product</h4>
                <h6>Create new product</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <RefreshIcon />
              <CollapesIcon />
              <li>
                <div className="page-btn">
                  <Link to={route.productlist} className="btn btn-secondary">
                    <ArrowLeft className="me-2" />
                    Back to Product
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          {/* /add */}
          <form className="add-product-form" onSubmit={handleSubmit}>
            <div className="add-product">
              
                <div className="accordions-items-seperate" id="accordionSpacingExample">
                  <div className="accordion-item border mb-4">
                    <h2 className="accordion-header" id="headingSpacingOne">
                      <div
                        className="accordion-button collapsed bg-white"
                        data-bs-toggle="collapse"
                        data-bs-target="#SpacingOne"
                        aria-expanded="true"
                        aria-controls="SpacingOne"
                      >
                        <div className="d-flex align-items-center justify-content-between flex-fill">
                          <h5 className="d-flex align-items-center">
                            <Info className="text-primary me-2"/>
                            <span>Product Information</span>
                          </h5>
                        </div>
                      </div>
                    </h2>
                    <div
                      id="SpacingOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingSpacingOne"
                    >
                      <div className="accordion-body border-top">
                        <div className="row">
                          <div className="col-sm-6 col-12">
                            <div className="mb-3">
                              <label className="form-label">
                                Store<span className="text-danger ms-1">*</span>
                              </label>
                              <Select
                                classNamePrefix="react-select"
                                options={storeOptions}
                                placeholder="Choose"
                                // isLoading={isLoading}
                                value={storeOptions.find(opt=> opt.value === formData.store)}
                                onChange={(option)=> handleSelectChange('store', option)}
                                isDisabled={isEditMode}
                                name="store"
                                isClearable
                              />
                            </div>
                          </div>
                          <div className="col-sm-6 col-12">
                            <div className="mb-3">
                              <label className="form-label">
                                Warehouse<span className="text-danger ms-1">*</span>
                              </label>
                              <Select
                                classNamePrefix="react-select"
                                options={warehouse}
                                placeholder="Choose"
                                value={warehouse.find(opt=> opt.value === formData.warehouse)}
                                onChange={(option)=> handleSelectChange('warehouse', option)}
                                isDisabled={isEditMode}
                                name="warehouse"
                                isClearable
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6 col-12">
                            <div className="mb-3">
                              <label className="form-label">
                                Product Name<span className="text-danger ms-1">*</span>
                              </label>
                              <input type="text" className="form-control"   name="productName"  onChange={ handleInputChange} value={formData.productName}/>
                            </div>
                          </div>
                          <div className="col-sm-6 col-12">
                            <div className="mb-3">
                              <label className="form-label">
                                HSN Code<span className="text-danger ms-1">*</span>
                              </label>
                              <input type="text" className="form-control"  name="hsnCode"  onChange={ handleInputChange} value={formData.hsnCode}/>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6 col-12">
                            <div className="mb-3 list position-relative">
                              <label className="form-label">
                                SKU<span className="text-danger ms-1">*</span>
                              </label>
                              <input 
                                type="text" 
                                className="form-control list" 
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                required
                                readOnly={!!skuId}
                                name="sku"
                              />
                              <button 
                              type="button" 
                              className="btn btn-primaryadd"  
                              onClick={handleGenerateSku} 
                              disabled={isSkuLoading}
                            >
                              {isSkuLoading ? 'Generating...' : 'Generate'}
                            </button>
                            </div>
                          </div>
                          <div className="col-sm-6 col-12">
                            <div className="mb-3">
                              <label className="form-label">
                                Counter Number<span className="text-danger ms-1">*</span>
                              </label>
                              {
                                
                              }
                              <Select
                                classNamePrefix="react-select"
                                name="counter"
                                options={counterNumber}
                                placeholder="Choose"
                                value={counterNumber.find(opt=> opt.value === formData.counter)}
                                onChange={(option)=> handleSelectChange('counter', option)}
                                isDisabled={isEditMode}
                                isClearable
                              />
                            </div>
                          </div>
                        </div>
                        <div className="addservice-info">
                          <div className="row">
                            <div className="col-sm-6 col-12">
                              <div className="mb-3">
                                <div className="add-newplus">
                                  <label className="form-label">
                                    Category<span className="text-danger ms-1">*</span>
                                  </label>
                                  <Link
                                    to="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#add-units-category"
                                  >
                                    <PlusCircle
                                      data-feather="plus-circle"
                                      className="plus-down-add"
                                    />
                                    <span>Add New</span>
                                  </Link>
                                </div>
                                <Select
                                  classNamePrefix="react-select"
                                  options={categoryOptions}
                                  placeholder="Choose Category"
                                  value={categoryOptions.find(opt => opt.value === formData.category)}
                                  onChange={(option) => {
                                    handleSelectChange('category', option);
                                    handleCategoryChange(option);
                                  }}
                                  isDisabled={isEditMode}
                                  isClearable
                                  name="category"
                                />
                              </div>
                            </div>
                            <div className="col-sm-6 col-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  Sub Category<span className="text-danger ms-1">*</span>
                                </label>
                                <Select
                                      classNamePrefix="react-select"
                                      options={subcategoryOptions}
                                      placeholder={selectedCategory ? "Choose Subcategory" : "Select category first"}
                                      isDisabled={!selectedCategory}
                                      value={subcategoryOptions.find(opt => opt.value === formData.subcategory)}
                                      isClearable
                                      name="subCategory"
                                  />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="add-product-new">
                          <div className="row">
                            <div className="col-sm-6 col-12">
                              <div className="mb-3">
                                <div className="add-newplus">
                                  <label className="form-label">
                                    Brand<span className="text-danger ms-1">*</span>
                                  </label>
                                </div>
                                <Select
                                    classNamePrefix="react-select"
                                    options={brand}
                                    placeholder="Choose"
                                    value={brand.find(opt => opt.value === formData.brand)}
                                    onChange={(option) => handleSelectChange('brand', option)}
                                    isDisabled={isEditMode}
                                    isClearable
                                    name="subCategory"
                                  />
                              </div>
                            </div>
                            <div className="col-lg-6 col-sm-8 col-12">
                                <div className="mb-3">
                                <div className="add-newplus">
                                  <label className="form-label">
                                    Unit<span className="text-danger ms-1">*</span>
                                  </label>
                                </div>
                                <Select
                                  classNamePrefix="react-select"
                                  options={unit}
                                  placeholder="Choose"                              
                                  name="unit"
                                  value={unit.find(opt=> opt.value === formData.unit)}
                                  onChange={(option)=> handleSelectChange('unit', option)}
                                  isDisabled={isEditMode}
                                  isClearable
                                />
                              </div>
                                </div>
                          </div>
                        </div>
                        <div className="row">
                          {/* <div className="col-lg-6 col-sm-6 col-12">
                            <div className="mb-3">
                              <label className="form-label">
                                Barcode Symbology<span className="text-danger ms-1">*</span>
                              </label>
                              <Select
                                classNamePrefix="react-select"
                                options={barcodesymbol}
                                placeholder="Choose"
                              />
                            </div>
                          </div> */}
                          {/* <div className="col-lg-6 col-sm-6 col-12">
                            <div className="mb-3 list position-relative">
                              <label className="form-label">
                                Item Code<span className="text-danger ms-1">*</span>
                              </label>
                              <input type="text" className="form-control list" 
                              />
                              <button type="submit" className="btn btn-primaryadd" >
                              Generate
                              </button>
                            </div>
                          </div> */}
                        </div>
                        {/* Editor */}
                        <div className="col-lg-12">
                          <div className="summer-description-box">
                            <label className="form-label">Description</label>
                            <TextEditor />
                            <p className="fs-14 mt-1">Maximum 60 Words</p>
                          </div>
                        </div>
                        {/* /Editor */}
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item border mb-4">
                    <h2 className="accordion-header" id="headingSpacingTwo">
                      <div
                        className="accordion-button collapsed bg-white"
                        data-bs-toggle="collapse"
                        data-bs-target="#SpacingTwo"
                        aria-expanded="true"
                        aria-controls="SpacingTwo"
                      >
                        <div className="d-flex align-items-center justify-content-between flex-fill">
                          <h5 className="d-flex align-items-center">
                            <LifeBuoy data-feather="life-buoy" className="text-primary me-2" />
                            <span>Pricing &amp; Stocks</span>
                          </h5>
                        </div>
                      </div>
                    </h2>
                    <div
                      id="SpacingTwo"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingSpacingTwo"
                    >
                      <div className="accordion-body border-top">
                        <div className="mb-3s">
                          <label className="form-label">
                            Product Type<span className="text-danger ms-1">*</span>
                          </label>
                          <div className="single-pill-product mb-3">
                            <ul className="nav nav-pills" id="pills-tab1" role="tablist">
                              <li className="nav-item" role="presentation">
                                <span
                                  className="custom_radio me-4 mb-0 active"
                                  id="pills-home-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-home"
                                  role="tab"
                                  aria-controls="pills-home"
                                  aria-selected="true"
                                >
                                  <input
                                    type="radio"
                                    className="form-control"
                                    name="payment"
                                  />
                                  <span className="checkmark" /> Single Product
                                </span>
                              </li>
                              <li className="nav-item" role="presentation">
                                <span
                                  className="custom_radio me-2 mb-0"
                                  id="pills-profile-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#pills-profile"
                                  role="tab"
                                  aria-controls="pills-profile"
                                  aria-selected="false"
                                >
                                  <input
                                    type="radio"
                                    className="form-control"
                                    name="sign"
                                  />
                                  <span className="checkmark" /> Variable Product
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="tab-content" id="pills-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="pills-home"
                            role="tabpanel"
                            aria-labelledby="pills-home-tab"
                          >
                            <div className="single-product">
                              <div className="row">
                                
                                <div className="col-lg-4 col-sm-6 col-12">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Quantity<span className="text-danger ms-1">*</span>
                                    </label>
                                
                                    <input type="text" className="form-control"  onChange={ handleInputChange} value={formData.quantity} name="quantity"/>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-sm-6 col-12">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Sale Rate<span className="text-danger ms-1">*</span>
                                    </label>
                                    <input type="text" className="form-control" placeholder="enter selling rate of the product" onChange={ handleInputChange} value={formData.saleRate}   name="saleRate"/>
                                    
                                  </div>
                                </div>
                                <div className="col-lg-4 col-sm-6 col-12">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Gst Rate<span className="text-danger ms-1">*</span>
                                    </label>
                                    <Select
                                      classNamePrefix="react-select"
                                      options={gstRate}
                                      placeholder="Select Option"
                                      name="gstRate"
                                      value={unit.find(opt=> opt.value === formData.gstRate)}
                                      onChange={(option)=> handleSelectChange('gstRate', option)}
                                      isDisabled={isEditMode}
                                      isClearable
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4 col-sm-6 col-12">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Gst Type<span className="text-danger ms-1">*</span>
                                    </label>
                                    <Select
                                      classNamePrefix="react-select"
                                      options={gstType}
                                      placeholder="Select Option"
                                      name="gstType"
                                      value={unit.find(opt=> opt.value === formData.gstType)}
                                      onChange={(option)=> handleSelectChange('gstType', option)}
                                      isDisabled={isEditMode}
                                      isClearable
                                    />
                                  </div>
                                </div>
                            
                                <div className="col-lg-4 col-sm-6 col-12">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Discount Type
                                      <span className="text-danger ms-1">*</span>
                                    </label>
                                    <Select
                                      classNamePrefix="react-select"
                                      options={discounttype}
                                      placeholder="Choose"
                                      name="discounttype"
                                      value={discounttype.find(opt=> opt.value === formData.discountType)}
                                      onChange={(option)=> handleSelectChange('discountType', option)}
                                      isDisabled={isEditMode}
                                      isClearable
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4 col-sm-6 col-12">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Discount Value
                                      <span className="text-danger ms-1">*</span>
                                    </label>
                                    <input type="text" className="form-control" placeholder="enter the discount value" name="discountValue" onChange={ handleInputChange} value={formData.discountValue}/>

                                  </div>
                                </div>
                                <div className="col-lg-4 col-sm-6 col-12">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Quantity Alert
                                      <span className="text-danger ms-1">*</span>
                                    </label>
                                    <input type="text" className="form-control" placeholder="enter the quantity after which you want alert" onChange={ handleInputChange} name="quantityAlert" value={formData.quantityAlert}/>

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="pills-profile"
                            role="tabpanel"
                            aria-labelledby="pills-profile-tab"
                          >
                            <div className="row select-color-add">
                              <div className="col-lg-6 col-sm-6 col-12">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Variant Attribute{" "}
                                    <span className="text-danger ms-1">*</span>
                                  </label>
                                  <div className="row">
                                    <div className="col-lg-10 col-sm-10 col-10">
                                      <select
                                        className="form-control variant-select select-option"
                                        id="colorSelect"
                                        onChange={() => setProduct(true)}
                                      >
                                        <option>Choose</option>
                                        <option>Color</option>
                                        <option value="red">Red</option>
                                        <option value="black">Black</option>
                                      </select>
                                    </div>
                                    <div className="col-lg-2 col-sm-2 col-2 ps-0">
                                      <div className="add-icon tab">
                                        <Link
                                          className="btn btn-filter"
                                          data-bs-toggle="modal"
                                          data-bs-target="#add-units"
                                        >
                                          <i className="feather feather-plus-circle" />
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {product &&
                                  <div className={`selected-hide-color ${product2 ? 'd-block' : ''} `} id="input-show">
                                    <label className="form-label">
                                      Variant Attribute{" "}
                                      <span className="text-danger ms-1">*</span>
                                    </label>
                                    <div className="row align-items-center">
                                      <div className="col-lg-10 col-sm-10 col-10">
                                        <div className="mb-3">

                                          <CommonTagsInput
                                            value={tags}
                                            onChange={setTags}
                                            placeholder="Add new"
                                            className="input-tags form-control" 
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-2 col-sm-2 col-2 ps-0">
                                        <div className="mb-3 ">
                                          <Link
                                            to="#"
                                            className="remove-color"
                                            onClick={() => setProduct2(false)}
                                          >
                                            <i className="far fa-trash-alt" />
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>}

                              </div>
                            </div>
                            {product &&
                              <div
                                className="modal-body-table variant-table d-block"
                                id="variant-table"

                              >
                                <div className="table-responsive">
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th>Variantion</th>
                                        <th>Variant Value</th>
                                        <th>SKU</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th className="no-sort" />
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="add-product">
                                            <input
                                              type="text"
                                              className="form-control"
                                              defaultValue="color"
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <div className="add-product">
                                            <input
                                              type="text"
                                              className="form-control"
                                              defaultValue="red"
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <div className="add-product">
                                            <input
                                              type="text"
                                              className="form-control"
                                              defaultValue={1234}
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <CounterThree defaultValue={2} />
                                        </td>
                                        <td>
                                          <div className="add-product">
                                            <input
                                              type="text"
                                              className="form-control"
                                              defaultValue={50000}
                                            />
                                          </div>
                                        </td>
                                        <td className="action-table-data">
                                          <div className="edit-delete-action">
                                            <div className="input-block add-lists">
                                              <label className="checkboxs">
                                                <input type="checkbox" defaultChecked="" />
                                                <span className="checkmarks" />
                                              </label>
                                            </div>
                                            <Link
                                              className="me-2 p-2"
                                              to="#"
                                              data-bs-toggle="modal"
                                              data-bs-target="#add-variation"
                                            >
                                              <Plus
                                                data-feather="plus"
                                                className="feather-edit"
                                              />
                                            </Link>
                                            <Link
                                              data-bs-toggle="modal"
                                              data-bs-target="#delete-modal"
                                              className="p-2"
                                              to="#"
                                            >
                                              <i
                                                data-feather="trash-2"
                                                className="feather-trash-2"
                                              />
                                            </Link>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="add-product">
                                            <input
                                              type="text"
                                              className="form-control"
                                              defaultValue="color"
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <div className="add-product">
                                            <input
                                              type="text"
                                              className="form-control"
                                              defaultValue="black"
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <div className="add-product">
                                            <input
                                              type="text"
                                              className="form-control"
                                              defaultValue={2345}
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <CounterThree defaultValue={2} />
                                        </td>
                                        <td>
                                          <div className="add-product">
                                            <input
                                              type="text"
                                              className="form-control"
                                              defaultValue={50000}
                                            />
                                          </div>
                                        </td>
                                        <td className="action-table-data">
                                          <div className="edit-delete-action">
                                            <div className="input-block add-lists">
                                              <label className="checkboxs">
                                                <input type="checkbox" defaultChecked="" />
                                                <span className="checkmarks" />
                                              </label>
                                            </div>
                                            <Link
                                              className="me-2 p-2"
                                              to="#"
                                              data-bs-toggle="modal"
                                              data-bs-target="#edit-units"
                                            >
                                              <Plus
                                                data-feather="plus"
                                                className="feather-edit"
                                              />
                                            </Link>
                                            <Link
                                              data-bs-toggle="modal"
                                              data-bs-target="#delete-modal"
                                              className="p-2"
                                              to="#"
                                            >
                                              <i
                                                data-feather="trash-2"
                                                className="feather-trash-2"
                                              />
                                            </Link>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            }

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item border mb-4">
                    <h2 className="accordion-header" id="headingSpacingThree">
                      <div
                        className="accordion-button collapsed bg-white"
                        data-bs-toggle="collapse"
                        data-bs-target="#SpacingThree"
                        aria-expanded="true"
                        aria-controls="SpacingThree"
                      >
                        <div className="d-flex align-items-center justify-content-between flex-fill">
                          <h5 className="d-flex align-items-center">
                            <Image data-feather="image" className="text-primary me-2" />
                            <span>Images</span>
                          </h5>
                        </div>
                      </div>
                    </h2>
                    <div
                      id="SpacingThree"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingSpacingThree"
                    >
                      <div className="accordion-body border-top">
                        <div className="text-editor add-list add">
                          <div className="col-lg-12">
                            <div className="add-choosen">
                              <div className="mb-3">
                                <div className="image-upload">
                                  <input type="file" />
                                  <div className="image-uploads">
                                    <PlusCircle
                                      data-feather="plus-circle"
                                      className="plus-down-add me-0"
                                    />
                                    <h4>Add Images</h4>
                                  </div>
                                </div>
                              </div>
                              {isImageVisible1 && (
                                <div className="phone-img">
                                  <ImageWithBasePath
                                    src="assets/img/products/phone-add-2.png"
                                    alt="image"
                                  />
                                  <Link to="#">
                                    <X
                                      className="x-square-add remove-product"
                                      onClick={handleRemoveProduct1}
                                    />
                                  </Link>
                                </div>
                              )}
                              {isImageVisible && (
                                <div className="phone-img">
                                  <ImageWithBasePath
                                    src="assets/img/products/phone-add-1.png"
                                    alt="image"
                                  />
                                  <Link to="#">
                                    <X
                                      className="x-square-add remove-product"
                                      onClick={handleRemoveProduct}
                                    />
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item border mb-4">
                    <h2 className="accordion-header" id="headingSpacingFour">
                      <div
                        className="accordion-button collapsed bg-white"
                        data-bs-toggle="collapse"
                        data-bs-target="#SpacingFour"
                        aria-expanded="true"
                        aria-controls="SpacingFour"
                      >
                        <div className="d-flex align-items-center justify-content-between flex-fill">
                          <h5 className="d-flex align-items-center">
                            <List data-feather="list" className="text-primary me-2" />
                            <span>Custom Fields</span>
                          </h5>
                        </div>
                      </div>
                    </h2>
                    <div
                      id="SpacingFour"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingSpacingFour"
                    >
                      <div className="accordion-body border-top">
                        <div>
                          <div className="p-3 bg-light rounded d-flex align-items-center border mb-3">
                            <div className=" d-flex align-items-center">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="fastMoving"
                                  defaultValue="option1"
                                  name="fastMoving"  
                                  checked={formData.fastMoving}
                                  onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label" htmlFor="fastMoving">
                                  Fast Moving
                                </label>
                              </div>
                              {/* <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="manufacturer"
                                  defaultValue="option2"
                                />
                                <label className="form-check-label" htmlFor="manufacturer">
                                  Manufacturer
                                </label>
                              </div> */}
                              {/* <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="expiry"
                                  defaultValue="option2"
                                />
                                <label className="form-check-label" htmlFor="expiry">
                                  Expiry
                                </label>
                              </div> */}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 col-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  Warranty<span className="text-danger ms-1">*</span>
                                </label>
                                <Select
                                  classNamePrefix="react-select"
                                  options={warrenty}
                                  placeholder="Choose"
                                  value={warrenty.find(opt=> opt.value === formData.warranty)}
                                  onChange={(option)=> handleSelectChange('warranty', option)}
                                  isDisabled={isEditMode}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6 col-12">
                              <div className="mb-3 add-product">
                                <label className="form-label">
                                  Manufacturer<span className="text-danger ms-1">*</span>
                                </label>
                                
                                <input type="text" className="form-control"  onChange={ handleInputChange} value={formData.quantity} name="manufacturer"/>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6 col-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  Manufactured Date<span className="text-danger ms-1">*</span>
                                </label>
                                <div className="input-groupicon calender-input">
                                  <Calendar className="info-img" />
                                  <DatePicker
                                    className="form-control datetimepicker"
                                    placeholder="dd/mm/yyyy"
                                    selected={formData.manufacturedDate ? new Date(formData.manufacturedDate) : null}
                                    onChange={(date) => setFormData(prev => ({...prev, manufacturedDate: date}))}
                                    isDisabled={isEditMode}
                                    dateFormat="dd/MM/yyyy"
                                    name="manufacturedDate"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6 col-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  Expiry On<span className="text-danger ms-1">*</span>
                                </label>
                                <div className="input-groupicon calender-input">
                                <Calendar className="info-img" />
                                <DatePicker
                                  className="form-control datetimepicker"
                                  placeholder="dd/mm/yyyy"
                                  selected={formData.expiryDate ? new Date(formData.expiryDate) : null}
                                  onChange={(date) => setFormData(prev => ({...prev, expiryDate: date}))}
                                  isDisabled={isEditMode}
                                  dateFormat="dd/MM/yyyy"
                                  name="expiryDate"
                                />
                              </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              
            </div>
            <div className="col-lg-12">
              <div className="d-flex align-items-center justify-content-end mb-4">
                <button type="button" className="btn btn-secondary me-2">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
              </div>
            </div>

          </form>
          {/* /add */}
        </div>
        <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
          <p className="mb-0 text-gray-9">
            2014 - 2025 © DreamsPOS. All Right Reserved
          </p>
          <p>
            Designed &amp; Developed by{" "}
            <Link to="#" className="text-primary">
              Dreams
            </Link>
          </p>
        </div>

      </div>
      <Addunits />
      <AddCategory />
      <AddVariant />
      <AddBrand />
      <AddVarientNew />
      <div className="modal fade" id="delete-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content p-5 px-3 text-center">
                <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2"><i className="ti ti-trash fs-24 text-danger"></i></span>
                <h4 className="fs-20 fw-bold mb-2 mt-1">Delete Attribute</h4>
                <p className="mb-0 fs-16">Are you sure you want to delete Attribute?</p>
                <div className="modal-footer-btn mt-3 d-flex justify-content-center">
                  <button type="button" className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-primary fs-13 fw-medium p-2 px-3">Yes Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
