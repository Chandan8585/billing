import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import CounterTwo from "../../core/common/counter/counterTwo";
import Select from "react-select" 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PosModals from "../../core/modals/pos-modal/posModals";
import { DatePicker } from "antd";
const Pos5 = () => {
     const [activeTab , setActiveTab] = useState('all')
    const Location = useLocation();
    const [showAlert1 , setShowAlert1] = useState(true)
      const settings = {
        dots: false,
        autoplay: false,
        slidesToShow: 5,
        arrows:false,
        infinite:false,
        margin: 0,
        speed: 500,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 5,
            },
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 4,
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
        { value: "search", label: "Shop 1" },
        { value: "search", label: "Shop 2" },
        { value: "search", label: "Shop 3" },
        { value: "search", label: "Shop 4" },

      ];
      const Currency = [
        { value: "USD", label: "Search Products" },
        { value: "EURO", label: "IPhone 14 64GB" },
      ];
    useEffect(() => {
        document.addEventListener("click", function (event) {
            if (event.target.closest(".product-info")) {
                let productInfo = event.target.closest(".product-info");
                productInfo.classList.toggle("active");
        
                if (document.querySelectorAll(".product-info.active").length > 0) {
                    // If "active" exists, hide .empty-cart and show .product-list
                    document.querySelector(".product-wrap .empty-cart").style.display = "none";
                    document.querySelector(".product-wrap .product-list").style.display = "flex";
                } else {
                    // If not "active", reverse the behavior
                    document.querySelector(".product-wrap .empty-cart").style.display = "flex";
                    document.querySelector(".product-wrap .product-list").style.display = "none";
                }
            }
        });
        document.body.classList.add("pos-page");
        return () => {
            document.body.classList.remove("pos-page");
            }
        
    }, [Location.pathname,showAlert1])
  return (
    <div className="main-wrapper pos-three pos-four">
      <div className="page-wrapper pos-pg-wrapper ms-0">
        <div className="content pos-design p-0">
          <div className="row align-items-start pos-wrapper">
            {/* Products */}
            <div className="col-md-12 col-lg-6">
              <div className="pos-categories tabs_wrapper">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                  <div>
                    <h5 className="mb-1">Welcome, Wesley Adrian</h5>
                    <p>December 24, 2024</p>
                  </div>
                  <div className="d-flex align-items-center flex-wrap gap-3">
                    <div className="input-icon-start pos-search position-relative">
                      <span className="input-icon-addon">
                        <i className="ti ti-search" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Product"
                      />
                    </div>
                    <Link to="#" className="btn btn-sm btn-primary">
                      View All Categories
                    </Link>
                  </div>
                </div>
                <Slider {...settings} className="tabs owl-carousel pos-category4 mb-4">
                  <li onClick={()=>setActiveTab('all')} className={`owl-item ${activeTab === 'all' ? 'active' : ''}`} id="all">
                    <h6>
                      <Link to="#">All Categories</Link>
                    </h6>
                  </li>
                  <li onClick={()=>setActiveTab('headphones')} className={`owl-item ${activeTab === 'headphones' ? 'active' : ''}`} id="headphones">
                    <h6>
                      <Link to="#">Headphones</Link>
                    </h6>
                  </li>
                  <li onClick={()=>setActiveTab('shoes')} className={`owl-item ${activeTab === 'shoes' ? 'active' : ''}`} id="shoes">
                    <h6>
                      <Link to="#">Shoes</Link>
                    </h6>
                  </li>
                  <li onClick={()=>setActiveTab('mobiles')} className={`owl-item ${activeTab === 'mobiles' ? 'active' : ''}`} id="mobiles">
                    <h6>
                      <Link to="#">Mobiles</Link>
                    </h6>
                  </li>
                  <li onClick={()=>setActiveTab('watches')} className={`owl-item ${activeTab === 'watches' ? 'active' : ''}`} id="watches">
                    <h6>
                      <Link to="#">Watches</Link>
                    </h6>
                  </li>
                  <li onClick={()=>setActiveTab('laptops')} className={`owl-item ${activeTab === 'laptops' ? 'active' : ''}`} id="laptops">
                    <h6>
                      <Link to="#">Laptops</Link>
                    </h6>
                  </li>
                  <li onClick={()=>setActiveTab('homeneed')} className={`owl-item ${activeTab === 'homeneed' ? 'active' : ''}`} id="homeneed">
                    <h6>
                      <Link to="#">Home Needs</Link>
                    </h6>
                  </li>
                  <li onClick={()=>setActiveTab('headphone')} className={`owl-item ${activeTab === 'headphone' ? 'active' : ''}`} id="headphone">
                    <h6>
                      <Link to="#">Headphones</Link>
                    </h6>
                  </li>
                </Slider>
                <div className="pos-products">
                  <div className="tabs_container">
                    <div className={`tab_content ${activeTab === 'all' ? 'active' : ''} `} data-tab="all">
                      <div className="row g-3">
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-01.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">Charger Cable</Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $30
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card active" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-02.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">
                                  Apple Airpods 2
                                </Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $120
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-03.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">Vacuum Cleaner</Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $800
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-04.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">Realme 8 Pro</Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $700
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-05.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">Vacuum Robot</Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $600
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-06.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">
                                  Apple Watch Series 9
                                </Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $300
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-07.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">
                                  Apple Watch Series 9
                                </Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $300
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-08.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">Bracelet</Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $1430
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-09.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">YETI Flask</Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $1560
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-10.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">Osmo Med Kit</Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $410
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-11.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">
                                  Celestique Perfume
                                </Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $150
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-12.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">Dell XPS 13</Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $1140
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-13.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">Cheese Snack</Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $15
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-14.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">
                                  Blue Boot Shoes
                                </Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $320
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-15.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">Sonic Aura X7</Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $230
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-16.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">
                                  Brown Formal Shoes
                                </Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $160
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-17.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">
                                  Apple Iphone 13{" "}
                                </Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $1200
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-18.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">
                                  PixelCrafter 3000
                                </Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $900
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-19.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">
                                  Citrify Orange Juice
                                </Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $80
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-20.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">
                                  Aroma Coffee Maker
                                </Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $170
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`tab_content ${activeTab === 'headphones' ? 'active' : ''} `} data-tab="headphones">
                      <div className="row g-3">
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-02.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">
                                  Apple Airpods 2
                                </Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $120
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-15.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">Sonic Aura X7</Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $1200
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`tab_content ${activeTab === 'shoes' ? 'active' : ''} `} data-tab="shoes">
                      <div className="row g-3">
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-14.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">
                                  Blue Boot Shoes
                                </Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $320
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-16.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">
                                  Brown Formal Shoes
                                </Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $160
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`tab_content ${activeTab === 'mobiles' ? 'active' : ''} `} data-tab="mobiles">
                      <div className="row g-3">
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-01.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">Charger Cable</Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $30
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-04.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">Realme 8 Pro</Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $700
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-17.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">
                                  Apple Iphone 13{" "}
                                </Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $1200
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`tab_content ${activeTab === 'watches' ? 'active' : ''} `} data-tab="watches">
                      <div className="row g-3">
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-07.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">
                                  Apple Watch Series 9
                                </Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $300
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`tab_content ${activeTab === 'laptops' ? 'active' : ''} `} data-tab="laptops">
                      <div className="row row-cols-xxl-5">
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-12.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">Dell XPS 13</Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $1140
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-01.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">Charger Cable</Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $30
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`tab_content ${activeTab === 'homeneed' ? 'active' : ''} `} data-tab="homeneed">
                      <div className="row row-cols-xxl-5">
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-03.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">Vacuum Cleaner</Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $800
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-05.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">Vacuum Robot</Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $600
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-13.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">Cheese Snack</Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $15
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-19.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">
                                  Citrify Orange Juice
                                </Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $80
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-20.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">
                                  Aroma Coffee Maker
                                </Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $170
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`tab_content ${activeTab === 'headphone' ? 'active' : ''} `} data-tab="headphone">
                      <div className="row row-cols-xxl-5">
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-02.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">
                                  Apple Airpods 2
                                </Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $120
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                          <div className="product-info card" onClick={()=>setShowAlert1(!showAlert1)} tabIndex="0">
                            <Link
                              to="#"
                              className="product-image"
                            >
                              <ImageWithBasePath
                                src="assets/img/products/pos-product-15.jpg"
                                alt="Products"
                              />
                            </Link>
                            <div className="product-content text-center">
                              <h6 className="fs-14 fw-bold mb-1">
                                <Link to="#">
                                  Apple Iphone 13{" "}
                                </Link>
                              </h6>
                              <div className="text-center">
                                <h6 className="fs-14 fw-bold text-gray-6">
                                  $1200
                                </h6>
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
            {/* /Products */}
            {/* Order Details */}
            <div className="col-md-12 col-lg-6 ps-0 theiaStickySidebar">
              <aside className="product-order-list">
                <div className="customer-info">
                  <div className="order-head bg-light d-flex align-items-center justify-content-between w-100 mb-3">
                    <div>
                      <h3>Order List</h3>
                      <span>Transaction ID : #65565</span>
                    </div>
                    <div>
                      <Link
                        className="link-danger fs-16"
                        to="#"
                      >
                        <i className="ti ti-trash-x-filled" />
                      </Link>
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <div className="input-icon-end position-relative">
                        <DatePicker className="form-control datetimepicker"
                          placeholder="dd/mm/yyyy" />
                        <span className="input-icon-addon">
                          <i className="ti ti-calendar text-gray-7" />
                        </span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type Ref Number"
                      />
                    </div>
                    <div className="col-md-4">
                    <Select
                      options={productOptions}
                      classNamePrefix="react-select select"
                      placeholder="Select"
                      />
                    </div>
                    <div className="col-md-12">
                      <div className="d-flex align-items-center gap-2">
                        <div className="w-100">
                        <Select
                            options={options}
                            classNamePrefix="react-select select"
                            placeholder="Choose a Name"
                            defaultValue={options[0]}
                            />
                        </div>
                        <Link
                          to="#"
                          className="btn btn-primary btn-icon"
                          data-bs-toggle="modal"
                          data-bs-target="#create"
                        >
                          <i className="ti ti-user-plus" />
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-6">
                    <Select
                      options={Currency}
                      classNamePrefix="react-select select"
                      placeholder="Choose"
                      defaultValue={Currency[0]}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Currency Exchange Rate"
                      />
                    </div>
                  </div>
                </div>
                <div className="product-added block-section">
                  <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
                    <h5 className="d-flex align-items-center mb-0">
                      Order Details
                    </h5>
                    <div className="badge bg-light text-gray-9 fs-12 fw-semibold py-2 border rounded">
                      Items : <span className="text-teal">3</span>
                    </div>
                  </div>
                  <div className="product-wrap">
                    <div className="empty-cart">
                      <div className="mb-1">
                        <ImageWithBasePath src="assets/img/icons/empty-cart.svg" alt="img" />
                      </div>
                      <p className="fw-bold">No Products Selected</p>
                    </div>
                    <div className="product-list border-0 p-0">
                      <div className="table-responsive">
                        <table className="table table-borderless">
                          <thead>
                            <tr>
                              <th className="bg-transparent fw-bold">
                                Product
                              </th>
                              <th className="bg-transparent fw-bold">
                                Batch No
                              </th>
                              <th className="bg-transparent fw-bold">Price</th>
                              <th className="bg-transparent fw-bold">QTY</th>
                              <th className="bg-transparent fw-bold">
                                Sub Total
                              </th>
                              <th className="bg-transparent fw-bold text-end" />
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <h6 className="fs-16 fw-medium mb-1">
                                  <Link
                                    to="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#products"
                                  >
                                    Iphone 11S
                                  </Link>
                                </h6>
                                In Stock:&nbsp;10
                              </td>
                              <td>
                                <input type="text" className="form-control" />
                              </td>
                              <td className="fw-bold">$400</td>
                              <td>
                                <div className="qty-item m-0">
                                  <CounterTwo defaultValue={4}/>
                                </div>
                              </td>
                              <td className="fw-bold">$400</td>
                              <td className="text-end">
                                <Link
                                  className="btn-icon delete-icon"
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete"
                                >
                                  <i className="ti ti-trash" />
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h6 className="fs-16 fw-medium mb-1">
                                  <Link
                                    to="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#products"
                                  >
                                    Samsung Galaxy S21
                                  </Link>
                                </h6>
                                In Stock: 06
                              </td>
                              <td>
                                <input type="text" className="form-control" />
                              </td>
                              <td className="fw-bold">$400</td>
                              <td>
                                <div className="qty-item m-0">
                                  <CounterTwo defaultValue={1}/>
                                </div>
                              </td>
                              <td className="fw-bold">$400</td>
                              <td className="text-end">
                                <Link
                                  className="btn-icon delete-icon"
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete"
                                >
                                  <i className="ti ti-trash" />
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h6 className="fs-16 fw-medium mb-1">
                                  <Link
                                    to="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#products"
                                  >
                                    Red Boot Shoes
                                  </Link>
                                </h6>
                                In Stock: 04
                              </td>
                              <td>
                                <input type="text" className="form-control" />
                              </td>
                              <td className="fw-bold">$600</td>
                              <td>
                                <div className="qty-item m-0">
                                  <CounterTwo defaultValue={2}/>
                                </div>
                              </td>
                              <td className="fw-bold">$600</td>
                              <td className="text-end">
                                <Link
                                  className="btn-icon delete-icon"
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete"
                                >
                                  <i className="ti ti-trash" />
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block-section order-method bg-light m-0">
                  <div className="order-total">
                    <div className="table-responsive">
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td>Sub Total</td>
                            <td className="text-end">$1250</td>
                          </tr>
                          <tr>
                            <td>
                              Shipping
                              <Link
                                to="#"
                                className="ms-3 link-default"
                                data-bs-toggle="modal"
                                data-bs-target="#shipping-cost"
                              >
                                <i className="ti ti-edit" />
                              </Link>
                            </td>
                            <td className="text-end">$35</td>
                          </tr>
                          <tr>
                            <td>
                              Tax
                              <Link
                                to="#"
                                className="ms-3 link-default"
                                data-bs-toggle="modal"
                                data-bs-target="#order-tax"
                              >
                                <i className="ti ti-edit" />
                              </Link>
                            </td>
                            <td className="text-end">$25</td>
                          </tr>
                          <tr>
                            <td>
                              Coupon
                              <Link
                                to="#"
                                className="ms-3 link-default"
                                data-bs-toggle="modal"
                                data-bs-target="#coupon-code"
                              >
                                <i className="ti ti-edit" />
                              </Link>
                            </td>
                            <td className="text-end">$25</td>
                          </tr>
                          <tr>
                            <td>
                              <span className="text-danger">Discount</span>
                              <Link
                                to="#"
                                className="ms-3 link-default"
                                data-bs-toggle="modal"
                                data-bs-target="#discount"
                              >
                                <i className="ti ti-edit" />
                              </Link>
                            </td>
                            <td className="text-danger text-end">-$24</td>
                          </tr>
                          <tr>
                            <td>Grand Total</td>
                            <td className="text-end">$56590</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row gx-2">
                    <div className="col-sm-4">
                      <Link
                        to="#"
                        className="btn btn-orange d-flex align-items-center justify-content-center w-100 mb-2"
                        data-bs-toggle="modal"
                        data-bs-target="#hold-order"
                      >
                        <i className="ti ti-player-pause me-2" />
                        Hold
                      </Link>
                      <Link
                        to="#"
                        className="btn btn-secondary d-flex align-items-center justify-content-center w-100 mb-2"
                        data-bs-toggle="modal"
                        data-bs-target="#orders"
                      >
                        <i className="ti ti-shopping-cart me-2" />
                        View Orders
                      </Link>
                    </div>
                    <div className="col-sm-4">
                      <Link
                        to="#"
                        className="btn btn-info d-flex align-items-center justify-content-center w-100 mb-2"
                      >
                        <i className="ti ti-trash me-2" />
                        Void
                      </Link>
                      <Link
                        to="#"
                        className="btn btn-indigo d-flex align-items-center justify-content-center w-100 mb-2"
                        data-bs-toggle="modal"
                        data-bs-target="#reset"
                      >
                        <i className="ti ti-reload me-2" />
                        Reset
                      </Link>
                    </div>
                    <div className="col-sm-4">
                      <Link
                        to="#"
                        className="btn btn-cyan d-flex align-items-center justify-content-center w-100 mb-2"
                        data-bs-toggle="modal"
                        data-bs-target="#payment-completed"
                      >
                        <i className="ti ti-cash-banknote me-2" />
                        Payment
                      </Link>
                      <Link
                        to="#"
                        className="btn btn-danger d-flex align-items-center justify-content-center w-100 mb-2"
                        data-bs-toggle="modal"
                        data-bs-target="#recents"
                      >
                        <i className="ti ti-refresh-dot me-2" />
                        Transaction
                      </Link>
                    </div>
                  </div>
                </div>
              
              </aside>
            </div>
            {/* /Order Details */}
          </div>
        </div>
      </div> 
      <PosModals/>
    </div>
  );
};

export default Pos5;
