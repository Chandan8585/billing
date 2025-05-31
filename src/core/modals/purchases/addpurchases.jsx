import { DatePicker } from "antd";
import { Calendar, PlusCircle, Edit, X, Check } from "feather-icons-react/build/IconComponents";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Trash2 from "feather-icons-react/build/IconComponents/Trash2";
import { useGetProductListQuery } from "../../redux/api/productApi";
import { useGetAllSupplierQuery } from "../../redux/api/userApi";
import * as Yup from 'yup';
import { useFormik } from "formik";
import {   useCreatePurchaseOrderMutation, useGetPurchaseOrdersQuery,useGetTodayPurchaseOrderQuery , useDeletePurchaseOrderMutation, useUpdatePurchaseOrderMutation, useGetPurchaseOrderByIdQuery, } from "../../redux/api/OrderApi";
const productSchema = Yup.object().shape({
  product: Yup.object().required('Product is required'),
  unit: Yup.string(),
  quantity: Yup.number()
    .typeError('Quantity must be a number')
    .required('Quantity is required')
    .positive('Quantity must be positive'),
  purchaseRate: Yup.number()
    .typeError('Rate must be a number')
    .required('Rate is required')
    .positive('Rate must be positive'),
  note: Yup.string(),
  supplier: Yup.object().required('Supplier is required'),
});

const purchaseSchema = Yup.object().shape({
  purchaseDate: Yup.date().required('Date is required'),
});

const AddPurchases = () => { 
  const [purchaseOrderId, setPurchaseOrderId] = useState(null);
  const [updatePurchaseOrder] = useUpdatePurchaseOrderMutation();
const [deletePurchaseOrder] = useDeletePurchaseOrderMutation();
const { data: purchaseOrders } = useGetPurchaseOrdersQuery();
const {data: todayPurchaseOrder, refetch: refetchTodayPurchaseOrders} = useGetTodayPurchaseOrderQuery();
const { data: singlePurchaseOrder } = useGetPurchaseOrderByIdQuery(purchaseOrderId, {
  skip: !purchaseOrderId  // <-- don't run unless ID is set
});
const [editProduct, setEditProduct] = useState(null);
const [editingPurchaseOrder, setEditingPurchaseOrder] = useState(null);
console.log("todayPurchaseOrder",todayPurchaseOrder);
useEffect(() => {
  if (singlePurchaseOrder) {
    formik.setValues({
      ...formik.values,
      purchaseDate: singlePurchaseOrder.purchaseDate,
      products: singlePurchaseOrder.products.map(p => ({
        ...p,
        product: productlist.find(pr => pr.value === p.product),
        supplier: suppliersList.find(s => s.value === p.supplier),
        purchaseRate: p.rate,
      }))
    });
  }
}, [singlePurchaseOrder]);

  const { data: productResponse } = useGetProductListQuery();
  const { data: supplierResponse } = useGetAllSupplierQuery();
  const [createPurchaseOrder, { isLoading: isCreating }] = useCreatePurchaseOrderMutation();
  const productlist = productResponse?.data?.map(item => ({
    value: item?._id,
    label: item?.productName,
    unit: item?.unit,
    purchaseRate: item?.purchaseRate 
  }));

  const suppliersList = supplierResponse?.data?.map(item => ({
    value: item?._id,
    label: item?.supplierName
  }));

  const processedProducts = todayPurchaseOrder?.map(order => ({
    ...order,
    purchaseOrderId: order._id // Store the purchase order ID with each product
  })) || [];
  const formik = useFormik({
    initialValues: {
      purchaseDate: new Date(),
      currentProduct: {
        supplier: null,
        product: null,
        quantity: 0,
        unit: '',
        purchaseRate: '',
        note: ''
      },
      products: [],
      editIndex: null
    },
    validationSchema: purchaseSchema,
    onSubmit: async(values) => {
      try {
        // Check if there's at least one product
        if (values.products.length === 0) {
          alert("Please add at least one product");
          return;
        }
  
        const purchaseOrderData = {
          purchaseDate: values.purchaseDate,
          products: values.products.map(product => ({
            product: product.product.value,
            supplier: product.supplier.value, // Supplier included in each product
            quantity: product.quantity,
            unit: product.unit,
            rate: product.purchaseRate,
            note: product.note
          }))
        };
  
        const response = await createPurchaseOrder(purchaseOrderData).unwrap();
        setPurchaseOrderId(response?._id);
        alert("Purchase order saved successfully!");
        // navigate('/purchases');
      } catch (error) {
        alert(`Failed to create purchase order: ${error?.data?.message || error.message}`);
      }
    },
  });

  const handleProductSelect = (option) => {
    handleCurrentProductChange('product', option);
    // Auto-populate unit and rate from selected product
    if (option) {
      handleCurrentProductChange('unit', option.unit?.unitName || '');  // Access unitName properly
      handleCurrentProductChange('purchaseRate', option.purchaseRate || '');
    }
  };

  const handleAddProduct = async () => {
    try {
      await productSchema.validate(formik.values.currentProduct, { abortEarly: false });
      
      // Prepare the single product data for API
      const productData = {
        purchaseDate: formik.values.purchaseDate,
        productId: formik.values.currentProduct.product.value,
        supplierId: formik.values.currentProduct.supplier.value,
        quantity: formik.values.currentProduct.quantity,
        unit: formik.values.currentProduct.unit,
        purchaseRate: formik.values.currentProduct.purchaseRate,
        note: formik.values.currentProduct.note || ''
      };
  
      // Call API to create purchase order immediately
      const response = await createPurchaseOrder(productData).unwrap();
  
      alert(`Purchase order for ${formik.values.currentProduct.product.label} created successfully!`);
  
      // Optionally add to products array to show in UI history
      formik.setValues({
        ...formik.values,
        products: [...formik.values.products, formik.values.currentProduct],
        currentProduct: {
          supplier: null,
          product: null,
          quantity: 0,
          unit: '',
          purchaseRate: '',
          note: ''
        },
        editIndex: null
      });
    } catch (errors) {
      if (errors.inner) {
        // Validation errors from yup
        const validationErrors = {};
        errors.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formik.setFieldError('currentProduct', validationErrors);
      } else {
        // API or other errors
        alert(`Failed to add product: ${errors?.data?.message || errors.message || errors}`);
        console.error(errors);
      }
    }
  };
  const handleUpdateProduct = async () => {
    if (!editingPurchaseOrder) return;
  
    try {
      // Validate current product
      await productSchema.validate(formik.values.currentProduct);
     const purchaseOrderId = editingPurchaseOrder
      const updateData = {
        // The purchase order ID to update
        purchaseDate: formik.values.purchaseDate,
        productId: formik.values.currentProduct.product.value,
        supplierId: formik.values.currentProduct.supplier.value,
        quantity: formik.values.currentProduct.quantity,
        unit: formik.values.currentProduct.unit,
        purchaseRate: formik.values.currentProduct.purchaseRate,
        note: formik.values.currentProduct.note || ''
      };
      console.log("Sending update payload:", updateData); 
      // Call update mutation
      const response = await updatePurchaseOrder({ _id: editingPurchaseOrder, ...updateData }).unwrap();
      
      // Refresh data
      refetchTodayPurchaseOrders();
      
      // Reset form and editing state
      setEditingPurchaseOrder(null);
      formik.resetForm();
      
      alert("Purchase order updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      alert(`Failed to update: ${error?.data?.message || error.message}`);
    }
  };
  
  
  const handleRemoveProduct = async (id) => {
      
    if (id) {
      try {
        await deletePurchaseOrder(id).unwrap();
        console.log('Deleted purchase order:', id);
      } catch (error) {
        console.error('Failed to delete:', error);
        alert('Error deleting product');
        return;
      }
    }
    alert('Product deleted successfully');
  };
  
  const handleEditProduct = (product) => {
    setEditingPurchaseOrder(product._id); // Store the purchase order ID
    
    // Find the product and supplier objects
    const productObj = productlist?.find(p => p.value === product.product?._id) || {
      value: product.product?._id,
      label: product.product?.productName
    };
    
    const supplierObj = suppliersList?.find(s => s.value === product.supplier?._id) || {
      value: product.supplier?._id,
      label: product.supplier?.supplierName
    };
  
    formik.setValues({
      ...formik.values,
      purchaseDate: new Date(product.purchaseDate),
      currentProduct: {
        supplier: supplierObj,
        product: productObj,
        quantity: product.quantity,
        unit: product.unit,
        purchaseRate: product.rate || product.purchaseRate,
        note: product.note || ''
      }
    });
  };


  

  const handleCancelEdit = () => {
    formik.setValues({
      ...formik.values,
      currentProduct: {
        supplier: null,
        product: null,
        quantity: 0,
        unit: '',
        purchaseRate: '',
        note: ''
      },
      editIndex: null
    });
    formik.setErrors({ currentProduct: {} });
  };

  const handleCurrentProductChange = (field, value) => {
    // Only convert to number for quantity and purchaseRate
    const processedValue = (field === 'quantity' || field === 'purchaseRate') 
      ? (value === '' ? '' : Number(value))
      : value;
    
    formik.setFieldValue(`currentProduct.${field}`, processedValue);
    
    // Clear error when field changes
    if (formik.errors.currentProduct?.[field]) {
      const newErrors = { ...formik.errors.currentProduct };
      delete newErrors[field];
      formik.setErrors({ 
        ...formik.errors,
        currentProduct: Object.keys(newErrors).length ? newErrors : undefined
      });
    }
  };

  const getCurrentProductError = (field) => {
    return formik.touched.currentProduct?.[field] && formik.errors.currentProduct?.[field];
  };
console.log("formik.values.currentProduct.supplier.supplierId", formik?.values?.currentProduct);
  return (
    <div>
      {/* Add Purchase */}
      <div className="modal fade" id="add-units">
        <div className="modal-dialog purchase modal-dialog-centered stock-adjust-modal">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add Purchase</h4>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body custom-modal-body">
                <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="input-blocks">
            <label>Purchase Date</label>
            <div className="input-groupicon calender-input">
              <Calendar className="info-img" />
              <DatePicker
                selected={formik.values.purchaseDate}
                onChange={(date) => formik.setFieldValue('purchaseDate', date)}
                className="filterdatepicker"
                dateFormat="dd-MM-yyyy"
                placeholderText="Choose Date"
              />
            </div>
            {formik.touched.purchaseDate && formik.errors.purchaseDate && (
              <div className="text-danger">{formik.errors.purchaseDate}</div>
            )}
          </div>
        </div>
      </div>

      {/* Single Product Form */}
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="input-blocks add-product">
            <label>Supplier Name</label>
            <div className="row">
              <div className="col-lg-10 col-sm-10 col-10">
                <Select
                  name="supplier"
                  options={suppliersList}
                  classNamePrefix="react-select"
                  placeholder="Choose"
                  value={formik.values.currentProduct.supplier}
                  onChange={(option) => handleCurrentProductChange('supplier', option)}
                  onBlur={() => formik.setFieldTouched('currentProduct.supplier', true)}
                />
                {getCurrentProductError('supplier') && (
                  <div className="text-danger">{getCurrentProductError('supplier')}</div>
                )}
              </div>
              <div className="col-lg-2 col-sm-2 col-2 ps-0">
                <div className="add-icon tab">
                  <Link to="#">
                    <PlusCircle className="feather-plus-circles" />
                  </Link>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="input-blocks">
            <label>Product Name</label>
            <Select
              options={productlist}
              classNamePrefix="react-select"
              placeholder="Choose"
              value={formik.values.currentProduct.product}
              onChange={handleProductSelect}
              onBlur={() => formik.setFieldTouched('currentProduct.product', true)}
            />
            {getCurrentProductError('product') && (
              <div className="text-danger">{getCurrentProductError('product')}</div>
            )}
          </div>
        </div>
        <div className="col-lg-2 col-md-6 col-sm-12">
          <div className="input-blocks">
            <label>Quantity</label>
            <input
              type="number"
              className="form-control"
              name="quantity"
              value={formik.values.currentProduct.quantity}
              onChange={(e) => handleCurrentProductChange('quantity', e.target.value)}
              onBlur={() => formik.setFieldTouched('currentProduct.quantity', true)}
            />
            {getCurrentProductError('unit') && (
              <div className="text-danger">{getCurrentProductError('unit')}</div>
            )}
          </div>
        </div>
          <div className="col-lg-2 col-md-6 col-sm-12">
            <div className="input-blocks">
              <label>Unit</label>
              <input
                type="text"
                className="form-control"
                name="unit"
                value={formik.values.currentProduct.unit || ''}
                onChange={(e) => handleCurrentProductChange('unit', e.target.value)}
                onBlur={() => formik.setFieldTouched('currentProduct.unit', true)}
                readOnly  // Make it read-only since it's populated from product selection
              />
              {getCurrentProductError('unit') && (
                <div className="text-danger">{getCurrentProductError('unit')}</div>
              )}
            </div>
          </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-2 col-md-6 col-sm-12">
          <div className="input-blocks">
            <label>Purchase Rate</label>
            <input
              type="number"
              className="form-control"
              name="purchaseRate"
              value={formik.values.currentProduct.purchaseRate}
              onChange={(e) => handleCurrentProductChange('purchaseRate', e.target.value)}
              onBlur={() => formik.setFieldTouched('currentProduct.purchaseRate', true)}
            />
            {getCurrentProductError('purchaseRate') && (
              <div className="text-danger">{getCurrentProductError('purchaseRate')}</div>
            )}
          </div>
        </div>
        
        <div className="col-lg-2 col-md-6 col-sm-12">
          <div className="input-blocks">
            <label>Note</label>
            <input
              type="text"
              className="form-control"
              name="note"
              value={formik.values.currentProduct.note}
              onChange={(e) => handleCurrentProductChange('note', e.target.value)}
              onBlur={() => formik.setFieldTouched('currentProduct.note', true)}
            />
            {getCurrentProductError('note') && (
              <div className="text-danger">{getCurrentProductError('note')}</div>
            )}
          </div>
        </div>
        
        <div className="col-lg-2 col-md-6 col-sm-12 d-flex align-items-end">
  <div className="input-blocks w-100 d-flex justify-content-end">
    {editingPurchaseOrder ? (
      <>
        <button 
          type="button"
          className="btn btn-success me-2"
          onClick={handleUpdateProduct}
        >
          Update
        </button>
        <button 
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setEditingPurchaseOrder(null);
            formik.resetForm();
          }}
        >
          Clear
        </button>
      </>
    ) : (
      <button 
        type="button"
        className="btn btn-primary"
        onClick={handleAddProduct}
      >
        Add Product
      </button>
    )}
  </div>
</div>
      </div>

      {/* Products Table */}
      <div className="row mt-4">
        <div className="col-lg-12">
          <div className="modal-body-table">
            <div className="table-responsive">
              <table className="table datanew">
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Supplier Name</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Unit</th>

                    <th>Purchase Rate</th>
                    <th>Note</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
  {(todayPurchaseOrder || formik.values.products).map((product, index) => (
    <tr key={product._id || index}>
      <td>{index + 1}</td>
      <td>{product.supplier?.supplierName || product.supplier?.label}</td>
      <td>{product.product?.productName || product.product?.label}</td>
      <td>{product.quantity}</td>
      <td>{product.unit}</td>
      <td>{product.purchaseRate || product.rate}</td>
      <td>{product.note || '-'}</td>
      <td>{(product.quantity * (product.purchaseRate || product.rate || 0)).toFixed(2)}</td>
      <td>
        <button 
          type="button"
          className="btn btn-sm btn-info me-2"
          onClick={() => handleEditProduct(product)}
          disabled={editProduct !== null}
        >
          <Edit size={14} />
        </button>
        <button 
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => handleRemoveProduct(product._id)}
          disabled={formik.values.editIndex !== null}
        >
          <Trash2 size={14} />
        </button>
      </td>
    </tr>
  ))}
</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="modal-footer-btn">
            <button
              type="button"
              className="btn btn-cancel me-2"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Purchase */}
    </div>
  );
};

export default AddPurchases;
