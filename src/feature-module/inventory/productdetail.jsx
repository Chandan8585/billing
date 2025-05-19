import React, { useEffect } from 'react'
import ImageWithBasePath from '../../core/img/imagewithbasebath'
import { useParams } from 'react-router-dom';
import { useGetProductDetailByIdQuery } from '../../core/redux/api/productApi';


const ProductDetail = () => {
    const { _id } = useParams();  
  
    const { data: currentProduct, error: detailError , isLoading: detailStatus } = useGetProductDetailByIdQuery(_id); 
   console.table("Product Detail", currentProduct, detailStatus, detailError);

  if (detailStatus) {
    return <div>Loading...</div>;
  }

  if (detailError) {
    return <div>Error loading product detail!</div>;
  }
    return (
        <div>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="page-title">
                            <h4>About {currentProduct?.productName}</h4>
                            <h6>Full details of a product</h6>
                        </div>
                    </div>
                    {/* /add */}
                    <div className="row">
                        <div className="col-lg-8 col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    {/* <div className="bar-code-view">
                                        <ImageWithBasePath src="assets/img/barcode/barcode1.png" alt="barcode" />
                                        <a className="printimg">
                                            <ImageWithBasePath src="assets/img/icons/printer.svg" alt="print" />
                                        </a>
                                    </div> */}
                                    <div className="productdetails">
                                    <ul className="product-bar">
                                        <li>
                                        <h4>Product Id</h4>
                                        <h6>{currentProduct?.productId || 'N/A'}</h6>
                                        </li>
                                        <li>
                                        <h4>SKU</h4>
                                        <h6>{currentProduct?.sku || 'N/A'}</h6>
                                        </li>
                                        <li>
                                        <h4>Product</h4>
                                        <h6>{currentProduct?.productName}</h6>
                                        </li>
                                        <li>
                                        <h4>Category</h4>
                                        <h6>{currentProduct?.category?.name || 'N/A'}</h6>
                                        </li>
                                        <li>
                                            <h4>Sub Category</h4>
                                            <h6>
                                            {currentProduct?.category?.subCategory
                                                    .map((item, index) => (
                                                        <span key={index}>  {item} {index < currentProduct?.category?.subCategory?.length - 1 && ', '} </span>
                                                    ))
                                                || 'N/A'}
                                            </h6>
                                            </li>

                                        <li>
                                        <h4>Brand</h4>
                                        <h6>{currentProduct?.brand?.brandName || 'None'}</h6>
                                        </li>
                                        <li>
                                        <h4>Unit</h4>
                                        <h6>{currentProduct?.unit?.unitName || 'pcs'}</h6>
                                        </li>
                                      
                                        <li>
                                        <h4>Minimum Qty Alert</h4>
                                        <h6>{currentProduct?.quantityAlert || 'N/A'}</h6>
                                        </li>
                                        <li>
                                        <h4>Quantity</h4>
                                        <h6>{currentProduct?.quantity || 0}</h6>
                                        </li>
                                        <li>
                                        <h4>Tax (GST Type)</h4>
                                        <h6>{currentProduct?.gstType ? `Inclusive` : 'Exclusive'}</h6>
                                        </li>
                                        <li>
                                        <h4>Tax (GST)</h4>
                                        <h6>{currentProduct?.gstRate ? `${currentProduct.gstRate}%` : '0.00%'}</h6>
                                        </li>
                                        <li>
                                        <h4>Discount Type</h4>
                                        <h6>{currentProduct?.discountType || 'N/A'}</h6>
                                        </li>
                                        <li>
                                        <h4>Price</h4>
                                        <h6>
                                            ₹{currentProduct?.saleRate?.toFixed(2) || '0.00'} 
                                            {currentProduct?.originalPrice && (
                                            <span className="text-muted ms-2">
                                                <del>₹{currentProduct?.originalPrice.toFixed(2)}</del>
                                            </span>
                                            )}
                                        </h6>
                                        </li>
                                        <li>
                                        <h4>Status</h4>
                                        <h6>{currentProduct?.available > 0 ? 'In Stock' : 'Out of Stock'}</h6>
                                        </li>
                                        <li>
                                        <h4>Description</h4>
                                        <h6>{currentProduct?.description || 'No description available'}</h6>
                                        </li>
                                    </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="slider-product-details">
                                        <div className="owl-carousel owl-theme product-slide">
                                            {/* <div className="slider-product">
                                                <ImageWithBasePath src={currentProduct?.image} alt="img"  style={{ width: '150px', height: '150px', objectFit: 'cover' }}/>
                                                <h4>macbookpro.jpg</h4>
                                                <h6>581kb</h6>
                                            </div> */}
                                            <div className="slider-product">
                                            {currentProduct?.image?.map((img, index) => (
                                                    <img 
                                                    key={index}
                                                    src={img} 
                                                    alt={`Product ${index + 1}`} 
                                                    className="img-thumbnail"
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                    />
                                                ))}
                                                   <h4>{currentProduct?.name}</h4>
                                                   <h6>581kb</h6>
                                            </div>
                                          
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /add */}
                </div>
            </div>


        </div>
    )
}

export default ProductDetail
