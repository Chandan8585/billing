import React from 'react'
import { Link } from 'react-router-dom'
import { all_routes } from '../../router/all_routes'
import CollapseHeader from '../../../core/common/collapse-header/collapse-header'
import CommonSelect from '../../../core/common/commonSelect'
import ImageWithBasePath from '../../../core/img/imagewithbasebath'

const PackagesGrid = () => {

  const planName = [
    { value: "Advanced", label: "Advanced" },
    { value: "Basic", label: "Basic" },
    { value: "Enterprise", label: "Enterprise" },
  ];
  const planType = [
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
  ];
  const currency = [
    { value: "USD", label: "USD" },
    { value: "Euro", label: "Euro" },
  ];
  const planPosition = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
  ];
  const plancurrency = [
    { value: "Fixed", label: "Fixed" },
    { value: "Percentage", label: "Percentage" },
  ];
  const discountType = [
    { value: "Fixed", label: "Fixed" },
    { value: "Percentage", label: "Percentage" },
  ];
  const status = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];
  return (
    <>
      <>
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content">
            {/* Breadcrumb */}
            <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
              <div className="my-auto mb-2">
                <h2 className="mb-1">Packages</h2>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to={all_routes.adminDashboard}>
                        <i className="ti ti-smart-home" />
                      </Link>
                    </li>
                    <li className="breadcrumb-item">Superadmin</li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Packages List
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="d-flex my-xl-auto right-content align-items-center flex-wrap ">
                <div className="me-2 mb-2">
                  <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
                    <Link to={all_routes.superAdminPackages} className="btn btn-icon btn-sm me-1">
                      <i className="ti ti-list-tree" />
                    </Link>
                    <Link
                      to={all_routes.superAdminPackagesGrid}
                      className="btn btn-icon btn-sm bg-primary text-white active"
                    >
                      <i className="ti ti-layout-grid" />
                    </Link>
                  </div>
                </div>
                <div className="me-2 mb-2">
                  <div className="dropdown">
                    <Link
                      to="#"
                      className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                      data-bs-toggle="dropdown"
                    >
                      <i className="ti ti-file-export me-1" />
                      Export
                    </Link>
                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item rounded-1"
                        >
                          <i className="ti ti-file-type-pdf me-1" />
                          Export as PDF
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="dropdown-item rounded-1"
                        >
                          <i className="ti ti-file-type-xls me-1" />
                          Export as Excel{" "}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mb-2">
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#add_plans"
                    className="btn btn-primary d-flex align-items-center"
                  >
                    <i className="ti ti-circle-plus me-2" />
                    Add Plan
                  </Link>
                </div>
                <div className="ms-2 head-icons">
                  <CollapseHeader />
                </div>
              </div>
            </div>
            {/* /Breadcrumb */}
            <div className="row">
              {/* Total Plans */}
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center overflow-hidden">
                      <div>
                        <p className="fs-12 fw-medium mb-1 text-truncate">
                          Total Plans
                        </p>
                        <h4>08</h4>
                      </div>
                    </div>
                    <div>
                      <span className="avatar avatar-lg bg-primary flex-shrink-0">
                        <i className="ti ti-box fs-16" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Total Plans */}
              {/* Total Plans */}
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center overflow-hidden">
                      <div>
                        <p className="fs-12 fw-medium mb-1 text-truncate">
                          Active Plans
                        </p>
                        <h4>08</h4>
                      </div>
                    </div>
                    <div>
                      <span className="avatar avatar-lg bg-success flex-shrink-0">
                        <i className="ti ti-activity-heartbeat fs-16" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Total Plans */}
              {/* Inactive Plans */}
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center overflow-hidden">
                      <div>
                        <p className="fs-12 fw-medium mb-1 text-truncate">
                          Inactive Plans
                        </p>
                        <h4>0</h4>
                      </div>
                    </div>
                    <div>
                      <span className="avatar avatar-lg bg-danger flex-shrink-0">
                        <i className="ti ti-player-pause fs-16" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Inactive Companies */}
              {/* No of Plans  */}
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center overflow-hidden">
                      <div>
                        <p className="fs-12 fw-medium mb-1 text-truncate">
                          No of Plan Types
                        </p>
                        <h4>02</h4>
                      </div>
                    </div>
                    <div>
                      <span className="avatar avatar-lg bg-skyblue flex-shrink-0">
                        <i className="ti ti-mask fs-16" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* /No of Plans */}
            </div>
            <div className="card">
              <div className="card-body p-3">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Plans List</h5>
                  <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                    <div className="dropdown me-3">
                      <Link
                        to="#"
                        className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                        data-bs-toggle="dropdown"
                      >
                        Select Plan
                      </Link>
                      <ul className="dropdown-menu  dropdown-menu-end p-3">
                        <li>
                          <Link
                            to="#"
                            className="dropdown-item rounded-1"
                          >
                            Basic
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="dropdown-item rounded-1"
                          >
                            Advanced
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="dropdown-item rounded-1"
                          >
                            Premium
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="dropdown-item rounded-1"
                          >
                            Enterprise
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="dropdown">
                      <Link
                        to="#"
                        className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                        data-bs-toggle="dropdown"
                      >
                        Sort By : Last 7 Days
                      </Link>
                      <ul className="dropdown-menu  dropdown-menu-end p-3">
                        <li>
                          <Link
                            to="#"
                            className="dropdown-item rounded-1"
                          >
                            Recently Added
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="dropdown-item rounded-1"
                          >
                            Ascending
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="dropdown-item rounded-1"
                          >
                            Desending
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="dropdown-item rounded-1"
                          >
                            Last Month
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="dropdown-item rounded-1"
                          >
                            Last 7 Days
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-center align-items-center mb-4">
                  <p className="mb-0 me-2">Monthly</p>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                    />
                  </div>
                  <p>Yearly</p>
                </div>
                <div className="row justify-content-center">
                  <div className="col-lg-3 col-md-6 col-sm-12 d-flex">
                    <div className="card flex-fill">
                      <div className="card-body">
                        <div className="card">
                          <div className="card-body">
                            <h4>Basic</h4>
                            <h1>
                              $50
                              <span className="fs-14 fw-normal text-gray">
                                /monthly
                              </span>
                            </h1>
                          </div>
                        </div>
                        <div className="pricing-content rounded bg-light mb-3">
                          <div className="price-hdr">
                            <h6 className="fs-14 fw-medium text-gray w-100">
                              Features Includes
                            </h6>
                          </div>
                          <div>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              10 Employees
                            </span>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              50 Projects
                            </span>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              50 Clients
                            </span>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              50 GB Storage
                            </span>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-circle-x-filled text-danger me-2" />
                              Voice &amp; Video Chat
                            </span>
                            <span className="text-dark d-flex align-items-center">
                              <i className="ti ti-circle-x-filled text-danger me-2" />
                              CRM
                            </span>
                          </div>
                        </div>
                        <Link to="#" className="btn btn-dark w-100">
                          Choose Plan
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 d-flex">
                    <div className="card flex-fill">
                      <div className="card-body">
                        <div className="card">
                          <div className="card-body">
                            <h4>Advanced</h4>
                            <h1>
                              $200
                              <span className="fs-14 fw-normal text-gray">
                                /monthly
                              </span>
                            </h1>
                          </div>
                        </div>
                        <div className="pricing-content rounded bg-light mb-3">
                          <div className="price-hdr">
                            <h6 className="fs-14 fw-medium text-gray w-100">
                              Features Includes
                            </h6>
                          </div>
                          <div>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              50 Employees
                            </span>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              100 Projects
                            </span>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              100 Clients
                            </span>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              50 GB Storage
                            </span>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              Voice &amp; Video Chat
                            </span>
                            <span className="text-dark d-flex align-items-center">
                              <i className="ti ti-circle-x-filled text-danger me-2" />
                              CRM
                            </span>
                          </div>
                        </div>
                        <Link to="#" className="btn btn-dark w-100">
                          Choose Plan
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 d-flex">
                    <div className="card flex-fill">
                      <div className="card-body">
                        <div className="card">
                          <div className="card-body">
                            <h4>Premium</h4>
                            <h1>
                              $300
                              <span className="fs-14 fw-normal text-gray">
                                /monthly
                              </span>
                            </h1>
                          </div>
                        </div>
                        <div className="pricing-content rounded bg-light mb-3">
                          <div className="price-hdr">
                            <h6 className="fs-14 fw-medium text-gray w-100">
                              Features Includes
                            </h6>
                          </div>
                          <div>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              100 Employees
                            </span>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              200 Projects
                            </span>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              100 Clients
                            </span>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              100 GB Storage
                            </span>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              Voice &amp; Video Chat
                            </span>
                            <span className="text-dark d-flex align-items-center">
                              <i className="ti ti-circle-x-filled text-danger me-2" />
                              CRM
                            </span>
                          </div>
                        </div>
                        <Link to="#" className="btn btn-dark w-100">
                          Choose Plan
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 d-flex">
                    <div className="card flex-fill">
                      <div className="card-body">
                        <div className="card">
                          <div className="card-body">
                            <h4>Enterprise</h4>
                            <h1>
                              $400
                              <span className="fs-14 fw-normal text-gray">
                                /monthly
                              </span>
                            </h1>
                          </div>
                        </div>
                        <div className="pricing-content rounded bg-light mb-3">
                          <div className="price-hdr">
                            <h6 className="fs-14 fw-medium text-gray w-100">
                              Features Includes
                            </h6>
                          </div>
                          <div>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              Unlimited Employees
                            </span>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              Unlimited Clients
                            </span>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              Unlimited Projects
                            </span>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              Unlimited Storage
                            </span>
                            <span className="text-dark d-flex align-items-center mb-3">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              Voice &amp; Video Chat
                            </span>
                            <span className="text-dark d-flex align-items-center">
                              <i className="ti ti-discount-check-filled text-success me-2" />
                              CRM
                            </span>
                          </div>
                        </div>
                        <Link to="#" className="btn btn-dark w-100">
                          Choose Plan
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
            <p className="mb-0">2014 - 2025 © SmartHR.</p>
            <p>
              Designed &amp; Developed By{" "}
              <Link to="#" className="text-primary">
                Dreams
              </Link>
            </p>
          </div>
        </div>
        {/* /Page Wrapper */}
      </>

      {/* Add Plan */}
      <div className="modal fade" id="add_plans">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Plan</h4>
              <button
                type="button"
                className="btn-close custom-btn-close p-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x" />
              </button>
            </div>
            <form>
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                      <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                        <ImageWithBasePath
                          src="assets/img/profiles/avatar-30.jpg"
                          alt="img"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="profile-upload">
                        <div className="mb-2">
                          <h6 className="mb-1">Upload Profile Image</h6>
                          <p className="fs-12">Image should be below 4 mb</p>
                        </div>
                        <div className="profile-uploader d-flex align-items-center">
                          <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                            Upload
                            <input
                              type="file"
                              className="form-control image-sign"
                              multiple
                            />
                          </div>
                          <Link
                            to="#"
                            className="btn btn-light btn-sm"
                          >
                            Cancel
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Name<span className="text-danger"> *</span>
                      </label>
                      <CommonSelect
                        className='select'
                        options={planName}
                        defaultValue={planName[0]}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Type<span className="text-danger"> *</span>
                      </label>
                      <CommonSelect
                        className='select'
                        options={planType}
                        defaultValue={planType[0]}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Position<span className="text-danger"> *</span>
                      </label>
                      <CommonSelect
                        className='select'
                        options={planPosition}
                        defaultValue={planPosition[0]}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Currency<span className="text-danger"> *</span>
                      </label>
                      <CommonSelect
                        className='select'
                        options={currency}
                        defaultValue={currency[0]}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <label className="form-label">
                          Plan Currency<span className="text-danger"> *</span>
                        </label>
                        <span className="text-primary">
                          <i className="fa-solid fa-circle-exclamation me-2" />
                          Set 0 for free
                        </span>
                      </div>
                      <CommonSelect
                        className='select'
                        options={plancurrency}
                        defaultValue={plancurrency[0]}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Discount Type<span className="text-danger"> *</span>
                      </label>
                      <div className="pass-group">
                        <CommonSelect
                          className='select'
                          options={discountType}
                          defaultValue={discountType[0]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Discount<span className="text-danger"> *</span>
                      </label>
                      <div className="pass-group">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Limitations Invoices</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Max Customers</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Product</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Supplier</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h6>Plan Modules</h6>
                      <div className="form-check d-flex align-items-center">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Select All
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Employees
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Invoices
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Reports
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Contacts
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Clients
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Estimates
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Goals
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Deals
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Projects
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Payments
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Assets
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Leads
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Tickets
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Taxes
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Activities
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Pipelines
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 me-2 text-dark fw-medium">
                          Access Trial
                        </label>
                        <div className="form-check form-switch me-2">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            role="switch"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center gx-3">
                    <div className="col-md-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="flex-fill">
                          <label className="form-label">Trial Days</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="d-block align-items-center ms-3">
                        <label className="form-check-label mt-0 me-2 text-dark">
                          Is Recommended
                        </label>
                        <div className="form-check form-switch me-2">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            role="switch"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Status<span className="text-danger"> *</span>
                        </label>
                        <CommonSelect
                          className='select'
                          options={status}
                          defaultValue={status[0]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea className="form-control" defaultValue={""} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="button" data-bs-dismiss="modal" className="btn btn-primary">
                  Add Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* /Add Plan */}
      {/* Edit Plan */}
      <div className="modal fade" id="edit_plans">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Plan</h4>
              <button
                type="button"
                className="btn-close custom-btn-close p-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x" />
              </button>
            </div>
            <form>
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                      <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                        <ImageWithBasePath
                          src="assets/img/profiles/avatar-30.jpg"
                          alt="img"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="profile-upload">
                        <div className="mb-2">
                          <h6 className="mb-1">Upload Profile Image</h6>
                          <p className="fs-12">Image should be below 4 mb</p>
                        </div>
                        <div className="profile-uploader d-flex align-items-center">
                          <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                            Upload
                            <input
                              type="file"
                              className="form-control image-sign"
                              multiple
                            />
                          </div>
                          <Link
                            to="#"
                            className="btn btn-light btn-sm"
                          >
                            Cancel
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Name<span className="text-danger"> *</span>
                      </label>
                      <CommonSelect
                        className='select'
                        options={planName}
                        defaultValue={planName[1]}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Type<span className="text-danger"> *</span>
                      </label>
                      <CommonSelect
                        className='select'
                        options={planType}
                        defaultValue={planType[1]}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Position<span className="text-danger"> *</span>
                      </label>
                      <CommonSelect
                        className='select'
                        options={planPosition}
                        defaultValue={planPosition[1]}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Plan Currency<span className="text-danger"> *</span>
                      </label>
                      <CommonSelect
                        className='select'
                        options={currency}
                        defaultValue={currency[1]}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <label className="form-label">
                          Plan Currency<span className="text-danger"> *</span>
                        </label>
                        <span className="text-primary">
                          <i className="fa-solid fa-circle-exclamation me-2" />
                          Set 0 for free
                        </span>
                      </div>
                      <CommonSelect
                        className='select'
                        options={plancurrency}
                        defaultValue={plancurrency[1]}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Discount Type<span className="text-danger"> *</span>
                      </label>
                      <div className="pass-group">
                        <CommonSelect
                          className='select'
                          options={discountType}
                          defaultValue={discountType[1]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3 ">
                      <label className="form-label">
                        Discount<span className="text-danger"> *</span>
                      </label>
                      <div className="pass-group">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Limitations Invoices</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Max Customers</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Product</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="mb-3">
                      <label className="form-label">Supplier</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h6>Plan Modules</h6>
                      <div className="form-check d-flex align-items-center">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Select All
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Employees
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Invoices
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Reports
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Contacts
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Clients
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Estimates
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Goals
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Deals
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Projects
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Payments
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Assets
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Leads
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Tickets
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Taxes
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Activities
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                      <div className="form-check d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 text-dark fw-medium">
                          <input className="form-check-input" type="checkbox" />
                          Pipelines
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center mb-3">
                        <label className="form-check-label mt-0 me-2 text-dark fw-medium">
                          Access Trial
                        </label>
                        <div className="form-check form-switch me-2">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            role="switch"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center gx-3">
                    <div className="col-md-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="flex-fill">
                          <label className="form-label">Trial Days</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="d-block align-items-center ms-3">
                        <label className="form-check-label mt-0 me-2  text-dark">
                          Is Recommended
                        </label>
                        <div className="form-check form-switch me-2">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            role="switch"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="mb-3 ">
                        <label className="form-label">
                          Status<span className="text-danger"> *</span>
                        </label>
                        <CommonSelect
                          className='select'
                          options={status}
                          defaultValue={status[1]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea className="form-control" defaultValue={""} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="button" data-bs-dismiss="modal" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* /Edit Plan */}

      <>
        {/* Delete Modal */}
        <div className="modal fade" id="delete_modal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center">
                <span className="avatar avatar-xl bg-danger-transparent rounded-circle text-danger mb-3">
                  <i className="ti ti-trash-x fs-36" />
                </span>
                <h4 className="mb-1">Confirm Delete</h4>
                <p className="mb-3">
                  You want to delete all the marked items, this cant be undone once
                  you delete.
                </p>
                <div className="d-flex justify-content-center">
                  <Link
                    to="#"
                    className="btn btn-secondary me-3"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </Link>
                  <Link to="#" className="btn btn-primary" data-bs-dismiss="modal">
                    Yes, Delete
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Modal */}
      </>
    </>

  )
}

export default PackagesGrid