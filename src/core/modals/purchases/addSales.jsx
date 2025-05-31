import { DatePicker } from "antd";
import { Calendar, PlusCircle, Edit, X, Check } from "feather-icons-react/build/IconComponents";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Trash2 from "feather-icons-react/build/IconComponents/Trash2";
import { useGetProductListQuery } from "../../redux/api/productApi";
import { useGetAllCustomerQuery } from "../../redux/api/userApi";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { 
    useCreateSalesOrderMutation,
    useGetTodaySalesOrderQuery, 
    useDeleteSalesOrderMutation, 
    useUpdateSalesOrderMutation, 
    useGetSalesOrderByIdQuery 
  } from "../../redux/api/OrderApi";
const productSchema = Yup.object().shape({
  product: Yup.object().required('Product is required'),
  unit: Yup.string(),
  quantity: Yup.number()
    .typeError('Quantity must be a number')
    .required('Quantity is required')
    .positive('Quantity must be positive'),
    saleRate: Yup.number()
    .typeError('Rate must be a number')
    .required('Rate is required')
    .positive('Rate must be positive'),
  note: Yup.string(),
  customer: Yup.object().required('Customer is required'),
});

const SaleOrderSchema = Yup.object().shape({
  saleDate: Yup.date().required('Date is required'),
});

const AddSales = () => { 
  const [SaleOrderOrderId, setSaleOrderOrderId] = useState(null);
  const [updateSalesOrder] = useUpdateSalesOrderMutation();
const [deleteSaleOrderOrder] = useDeleteSalesOrderMutation();
// const { data: SaleOrderOrders } = useGetSaleOrdersQuery();
const {data: todaySaleOrderOrder, refetch: refetchTodaySaleOrderOrders} = useGetTodaySalesOrderQuery();
const { data: singleSalesOrder } = useGetSalesOrderByIdQuery(SaleOrderOrderId, {
  skip: !SaleOrderOrderId  // <-- don't run unless ID is set
});
const [editProduct, setEditProduct] = useState(null);
const [editingSalesOrder, seteditingSalesOrder] = useState(null);
console.log("todaySaleOrderOrder",todaySaleOrderOrder);
useEffect(() => {
  if (singleSalesOrder) {
    formik.setValues({
      ...formik.values,
      saleDate: singleSalesOrder.saleDate,
      products: singleSalesOrder.products.map(p => ({
        ...p,
        product: productlist.find(pr => pr.value === p.product),
        customer: customersList.find(s => s.value === p.customer),
        SaleOrderRate: p.rate,
      }))
    });
  }
}, [singleSalesOrder]);

  const { data: productResponse } = useGetProductListQuery();
  const { data: customerResponse } = useGetAllCustomerQuery();
  const [createSalesOrder, { isLoading: isCreating }] = useCreateSalesOrderMutation();
  const productlist = productResponse?.data?.map(item => ({
    value: item?._id,
    label: item?.productName,
    unit: item?.unit,
    SaleOrderRate: item?.SaleOrderRate 
  }));

  const customersList = customerResponse?.data?.map(item => ({
    value: item?._id,
    label: item?.customerName
  }));

  const processedProducts = todaySaleOrderOrder?.map(order => ({
    ...order,
    SaleOrderOrderId: order._id // Store the SaleOrder order ID with each product
  })) || [];
  const formik = useFormik({
    initialValues: {
      saleDate: new Date(),
      currentProduct: {
        customer: null,
        product: null,
        quantity: 0,
        unit: '',
        SaleOrderRate: '',
        note: ''
      },
      products: [],
      editIndex: null
    },
    validationSchema: SaleOrderSchema,
    onSubmit: async(values) => {
      try {
        // Check if there's at least one product
        if (values.products.length === 0) {
          alert("Please add at least one product");
          return;
        }
  
        const salesData = {
            saleDate: values.saleDate,
            products: values.products.map(product => ({
              product: product.product.value,
              customer: product.customer.value,  // Changed from customer to customer
              quantity: product.quantity,
              unit: product.unit,
              saleRate: product.saleRate,  // Changed from SaleOrderRate
              note: product.note
          }))
        };
  
      
        const response = await createSalesOrder(salesData).unwrap();
        setSaleOrderOrderId(response?._id);
        alert("SaleOrder order saved successfully!");
        // navigate('/SaleOrders');
      } catch (error) {
        alert(`Failed to create SaleOrder order: ${error?.data?.message || error.message}`);
      }
    },
  });

  const handleProductSelect = (option) => {
    handleCurrentProductChange('product', option);
    // Auto-populate unit and rate from selected product
    if (option) {
      handleCurrentProductChange('unit', option.unit?.unitName || '');  // Access unitName properly
      handleCurrentProductChange('SaleOrderRate', option.SaleOrderRate || '');
    }
  };

  const handleAddProduct = async () => {
    try {
      await productSchema.validate(formik.values.currentProduct, { abortEarly: false });
      
      // Prepare the single product data for API
      const productData = {
        saleDate: formik.values.saleDate,
        productId: formik.values.currentProduct.product.value,
        customerId: formik.values.currentProduct.customer.value,
        quantity: formik.values.currentProduct.quantity,
        unit: formik.values.currentProduct.unit,
        SaleOrderRate: formik.values.currentProduct.SaleOrderRate,
        note: formik.values.currentProduct.note || ''
      };
  
      // Call API to create SaleOrder order immediately
      const response = await createSalesOrder(productData).unwrap();
  
      alert(`SaleOrder order for ${formik.values.currentProduct.product.label} created successfully!`);
  
      // Optionally add to products array to show in UI history
      formik.setValues({
        ...formik.values,
        products: [...formik.values.products, formik.values.currentProduct],
        currentProduct: {
          customer: null,
          product: null,
          quantity: 0,
          unit: '',
          SaleOrderRate: '',
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
    if (!editingSalesOrder) return;
  
    try {
      // Validate current product
      await productSchema.validate(formik.values.currentProduct);
     const SaleOrderOrderId = editingSalesOrder
      const updateData = {
        // The SaleOrder order ID to update
        saleDate: formik.values.saleDate,
        productId: formik.values.currentProduct.product.value,
        customerId: formik.values.currentProduct.customer.value,
        quantity: formik.values.currentProduct.quantity,
        unit: formik.values.currentProduct.unit,
        SaleOrderRate: formik.values.currentProduct.SaleOrderRate,
        note: formik.values.currentProduct.note || ''
      };
      console.log("Sending update payload:", updateData); 
      // Call update mutation
      const response = await updateSalesOrder({ _id: editingSalesOrder, ...updateData }).unwrap();
      
      // Refresh data
      refetchTodaySaleOrderOrders();
      
      // Reset form and editing state
      seteditingSalesOrder(null);
      formik.resetForm();
      
      alert("SaleOrder order updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      alert(`Failed to update: ${error?.data?.message || error.message}`);
    }
  };
  
  
  const handleRemoveProduct = async (id) => {
      
    if (id) {
      try {
        await deleteSaleOrderOrder(id).unwrap();
        console.log('Deleted SaleOrder order:', id);
      } catch (error) {
        console.error('Failed to delete:', error);
        alert('Error deleting product');
        return;
      }
    }
    alert('Product deleted successfully');
  };
  
  const handleEditProduct = (product) => {
    seteditingSalesOrder(product._id); // Store the SaleOrder order ID
    
    // Find the product and customer objects
    const productObj = productlist?.find(p => p.value === product.product?._id) || {
      value: product.product?._id,
      label: product.product?.productName
    };
    
    const customerObj = customersList?.find(s => s.value === product.customer?._id) || {
      value: product.customer?._id,
      label: product.customer?.customerName
    };
  
    formik.setValues({
      ...formik.values,
      saleDate: new Date(product.saleDate),
      currentProduct: {
        customer: customerObj,
        product: productObj,
        quantity: product.quantity,
        unit: product.unit,
        SaleOrderRate: product.rate || product.SaleOrderRate,
        note: product.note || ''
      }
    });
  };


  

  const handleCancelEdit = () => {
    formik.setValues({
      ...formik.values,
      currentProduct: {
        customer: null,
        product: null,
        quantity: 0,
        unit: '',
        SaleOrderRate: '',
        note: ''
      },
      editIndex: null
    });
    formik.setErrors({ currentProduct: {} });
  };

  const handleCurrentProductChange = (field, value) => {
    // Only convert to number for quantity and SaleOrderRate
    const processedValue = (field === 'quantity' || field === 'SaleOrderRate') 
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
console.log("formik.values.currentProduct.customer.customerId", formik?.values?.currentProduct);
  return (
    <div>
      {/* Add SaleOrder */}
      <div className="modal fade" id="add-units">
        <div className="modal-dialog SaleOrder modal-dialog-centered stock-adjust-modal">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
                
              <div className="content">
                <div className="modal-body custom-modal-body">
                <div className="modal-header border-0 custom-modal-header">
                  <div className="page-title">
                    <h4>Add Sales</h4>
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
                <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="input-blocks">
            <label>SaleOrder Date</label>
            <div className="input-groupicon calender-input">
              <Calendar className="info-img" />
              <DatePicker
                selected={formik.values.saleDate}
                onChange={(date) => formik.setFieldValue('saleDate', date)}
                className="filterdatepicker"
                dateFormat="dd-MM-yyyy"
                placeholderText="Choose Date"
              />
            </div>
            {formik.touched.saleDate && formik.errors.saleDate && (
              <div className="text-danger">{formik.errors.saleDate}</div>
            )}
          </div>
        </div>
      </div>

      {/* Single Product Form */}
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="input-blocks add-product">
            <label>Customer Name</label>
            <div className="row">
              <div className="col-lg-10 col-sm-10 col-10">
                <Select
                  name="customer"
                  options={customersList}
                  classNamePrefix="react-select"
                  placeholder="Choose"
                  value={formik.values.currentProduct.customer}
                  onChange={(option) => handleCurrentProductChange('customer', option)}
                  onBlur={() => formik.setFieldTouched('currentProduct.customer', true)}
                />
                {getCurrentProductError('customer') && (
                  <div className="text-danger">{getCurrentProductError('customer')}</div>
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
            <label>SaleOrder Rate</label>
            <input
              type="number"
              className="form-control"
              name="SaleOrderRate"
              value={formik.values.currentProduct.SaleOrderRate}
              onChange={(e) => handleCurrentProductChange('SaleOrderRate', e.target.value)}
              onBlur={() => formik.setFieldTouched('currentProduct.SaleOrderRate', true)}
            />
            {getCurrentProductError('SaleOrderRate') && (
              <div className="text-danger">{getCurrentProductError('SaleOrderRate')}</div>
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
    {editingSalesOrder ? (
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
            seteditingSalesOrder(null);
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
                    <th>Customer Name</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Unit</th>

                    <th>SaleOrder Rate</th>
                    <th>Note</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
  {(todaySaleOrderOrder || formik.values.products).map((product, index) => (
    <tr key={product._id || index}>
      <td>{index + 1}</td>
      <td>{product.customer?.customerName || product.customer?.label}</td>
      <td>{product.product?.productName || product.product?.label}</td>
      <td>{product.quantity}</td>
      <td>{product.unit}</td>
      <td>{product.SaleOrderRate || product.rate}</td>
      <td>{product.note || '-'}</td>
      <td>{(product.quantity * (product.SaleOrderRate || product.rate || 0)).toFixed(2)}</td>
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
      {/* /Add SaleOrder */}
    </div>
  );
};

export default AddSales;
