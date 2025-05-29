import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import EditCategoryList from "../../core/modals/inventory/editcategorylist";
import Table from "../../core/pagination/datatable";
import TooltipIcons from "../../core/common/tooltip-content/tooltipIcons";
import RefreshIcon from "../../core/common/tooltip-content/refresh";
import CollapesIcon from "../../core/common/tooltip-content/collapes";
import CommonFooter from "../../core/common/footer/commonFooter";
import CommonDeleteModal from "../../core/common/modal/commonDeleteModal";
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetCategoryListQuery } from "../../core/redux/api/productApi";
import { useFormik } from "formik";
import * as Yup from 'yup';
const CategoryList = () => {
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [createCategory] = useCreateCategoryMutation();
  const [categoryDelete] = useDeleteCategoryMutation({
    onSuccess: () => {
      refetch();
      setCategoryToDelete(null);
      // Close modal logic here
    },
    onError: (error) => {
      alert("Deletion failed: " + error.message);
    }
  });
  const { data: dataSource, isLoading: categoryLoading, error: categoryError, refetch } = useGetCategoryListQuery(); 
  console.log("categ",categoryToDelete);
  const formik = useFormik({
    initialValues: {
      name: '',
      image: null
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('image', values.image);
      
      try {
        createCategory(values);
        // Handle success
       await refetch();
      } catch (error) {
        // Handle error
      }
   
    }
  });
  useEffect(()=>{
    refetch();
  }, [dataSource]);
  const handleDelete = (categoryToDelete  ) => {
    if (categoryToDelete) {
      categoryDelete(categoryToDelete);
    }
  };
  const columns = [
    {
      title: "Category Code",
      dataIndex: "categoryCode",
      sorter: (a, b) => a.categoryCode.localeCompare(b.categoryCode),
    },
    {
      title: "Category Image",
      dataIndex: "thumbnail",
      render: (thumbnail) => (
        <img
          src={thumbnail}
          alt="Category"
          style={{ width: 40, height: 40, borderRadius: '8px', objectFit: 'cover' }}
        />
      ),
    },
    {
      title: "Category Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Sub Categories",
      dataIndex: "subCategory",
      render: (subCategory) =>
        subCategory?.length > 0 ? (
          subCategory.map((sub, idx) => (
            <span key={idx} className="badge bg-primary text-white me-1 fs-10">
              {sub}
            </span>
          ))
        ) : (
          <span className="text-muted fs-12">None</span>
        ),
      sorter: (a, b) => a.subCategory.length - b.subCategory.length,
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      key: "actions",
      render: (_id) => (
        <div className="action-table-data">
          <div className="edit-delete-action">
            <Link
              className="me-2 p-2"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit-category"
            >
              <i data-feather="edit" className="feather-edit" />
            </Link>
            <button
              className="p-2"
              data-bs-toggle="modal"
              data-bs-target="#delete-modal"
              onClick={() => setCategoryToDelete(_id)}
            >
              <i data-feather="trash-2" className="feather-trash-2" />
            </button>
          </div>
        </div>
      ),
    },
  ];
  
if(categoryLoading) return <>loading</>
if(categoryError) return <>Error</>
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4 className="fw-bold">Category</h4>
                <h6>Manage your categories</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <TooltipIcons />
              <RefreshIcon />
              <CollapesIcon />
            </ul>
            <div className="page-btn">
              <Link
                to="#"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#add-category"
              >
                <i className='ti ti-circle-plus me-1'></i>
                Add Category
              </Link>
            </div>
          </div>
          {/* /product list */}
          <div className="card table-list-card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <div className="search-set">

              </div>
              <div className="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                
                <div className="dropdown me-2">
                  <Link
                    to="#"
                    className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    Status
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link
                        to="#"
                        className="dropdown-item rounded-1"
                      >
                        Active
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="dropdown-item rounded-1"
                      >
                        Inactive
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="dropdown">
                  <Link
                    to="#"
                    className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center"
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
            <div className="card-body">
              <div className="table-responsive category-table">
                <Table columns={columns} dataSource={dataSource} />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
        <CommonFooter />
      </div>

      {/* Add Category */}
      <div className="modal fade" id="add-category">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="page-wrapper-new p-0">
              <div className="content">
                <div className="modal-header">
                  <div className="page-title" id="modal-body">
                    <h4>Add Category</h4>
                  </div>
                  <button
                    type="button"
                    className="close bg-danger text-white fs-16"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
            <div className="modal-body">
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
      <div className="mb-3">
        <label className="form-label">
          Category Name<span className="text-danger ms-1">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-danger">{formik.errors.name}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">
          Category Image<span className="text-danger ms-1">*</span>
        </label>
        <input
          type="file"
          className="form-control"
          name="image"
          onChange={(event) => {
            formik.setFieldValue("image", event.currentTarget.files[0]);
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.image && formik.errors.image && (
          <div className="text-danger">{formik.errors.image}</div>
        )}
      </div>

      <div className="mt-3">
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={formik.isSubmitting}
           data-bs-dismiss="modal"
        >
          {formik.isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
      <div className="modal-footer">
      <button
        type="button"
        className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
        data-bs-dismiss="modal"
      >
        Cancel
      </button>
      <button
        to="#"
        data-bs-dismiss="modal"
        className="btn btn-primary fs-13 fw-medium p-2 px-3"
        type="submit" 
      >

        Add Category
      </button>
    </div>
    </form>

  </div>
              
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Add Category */}


      <EditCategoryList />
                <div className="modal fade" id="delete-modal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="page-wrapper-new p-0">
                                <div className="content p-5 px-3 text-center">
                                    <span className="rounded-circle d-inline-flex p-2 bg-danger-transparent mb-2">
                                        <i className="ti ti-trash fs-24 text-danger" />
                                    </span>
                                    <h4 className="fs-20 fw-bold mb-2 mt-1">Delete Product</h4>
                                    <p className="mb-0 fs-16">
                                        Are you sure you want to delete product?
                                    </p>
                                    <div className="modal-footer-btn mt-3 d-flex justify-content-center">
                                        <button
                                            type="button"
                                            className="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                                            data-bs-dismiss="modal"
                                        >
                                            Cancel
                                        </button>
                                        <button to='#'
                                            data-bs-dismiss="modal"
                                            className="btn btn-primary fs-13 fw-medium p-2 px-3"
                                            onClick={()=> handleDelete(categoryToDelete)}
                                        >
                                            Yes Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
  );
};

export default CategoryList;
 