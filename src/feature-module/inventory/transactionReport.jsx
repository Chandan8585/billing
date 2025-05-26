import React, { useState, useMemo } from "react";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Link } from "react-router-dom";
import Select from "react-select";
import Table from "../../core/pagination/datatable";
import TooltipIcons from "../../core/common/tooltip-content/tooltipIcons";
import RefreshIcon from "../../core/common/tooltip-content/refresh";
import CollapesIcon from "../../core/common/tooltip-content/collapes";
import { ProductName, Store } from "../../core/common/selectOption/selectOption";
import { DatePicker } from "antd";
import CommonFooter from "../../core/common/footer/commonFooter";
import { useGetAllOrdersQuery } from "../../core/redux/api/OrderApi";
// import LoadingSpinner from "../../core/common/LoadingSpinner"; 

const TransactionReport = () => {
  const { data: orders = [], isLoading, isError } = useGetAllOrdersQuery();
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Calculate report statistics
  const reportStats = useMemo(() => {
    if (!orders.length) return {
      totalAmount: 0,
      totalPaid: 0,
      totalUnpaid: 0,
      overdue: 0,
      totalOrders: 0
    };

    const totals = orders.reduce((acc, order) => {
      acc.totalAmount += order.amount?.total || 0;
      // Add your payment status logic here
      acc.totalPaid += order.paymentStatus === 'paid' ? order.amount?.total || 0 : 0;
      acc.totalUnpaid += order.paymentStatus === 'unpaid' ? order.amount?.total || 0 : 0;
      acc.overdue += order.paymentStatus === 'overdue' ? order.amount?.total || 0 : 0;
      return acc;
    }, { totalAmount: 0, totalPaid: 0, totalUnpaid: 0, overdue: 0 });

    return {
      ...totals,
      totalOrders: orders.length
    };
  }, [orders]);

  // Filter orders based on search and filters
  const filteredData = useMemo(() => {
    return orders.filter(order => {
      // Date filter
      if (dateRange && dateRange[0] && dateRange[1]) {
        const orderDate = new Date(order.createdAt);
        if (orderDate < dateRange[0] || orderDate > dateRange[1]) {
          return false;
        }
      }

      // Store filter
      console.log('store', order?.user?.store)
      if (selectedStore && order.user?.store !== selectedStore.value) {
        return false;
      }

      // Product filter
      if (selectedProduct && !order.items.some(
        item => item.productName === selectedProduct.value
      )) {
        return false;
      }

      // Search text
      if (searchText) {
        const searchLower = searchText.toLowerCase();
        return (
          String(order.billNumber).includes(searchLower) ||
          order.user?.firstName.toLowerCase().includes(searchLower) ||
          order.user?.lastName.toLowerCase().includes(searchLower) ||
          String(order.amount?.total).includes(searchLower)
        )
      }

      return true;
    });
  }, [orders, searchText, dateRange, selectedStore, selectedProduct]);

  const columns = [
    {
      title: "Invoice Number",
      dataIndex: "billNumber",
      key: "billNumber",
      sorter: (a, b) => a.billNumber - b.billNumber,
    },
    {
      title: "Person at Counter",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <span>
          {user?.firstName} {user?.lastName}
        </span>
      ),
    },
    {
      title: "Store",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <span>
          {user?.store}
        </span>
      ),
    },
    {
      title: "Warehouse",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <span>
          {user?.warehouse}
        </span>
      ),
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items) => items?.length || 0,
    },
    {
      title: "Subtotal",
      dataIndex: "amount",
      key: "subtotal",
      render: (amount) => `Rs ${(amount?.subtotal || 0).toFixed(2)}`,
    },
    {
      title: "Gst",
      dataIndex: "amount",
      key: "tax",
      render: (amount) => `Rs ${(amount?.gst || 0).toFixed(2)}`,
    },
    {
      title: "Total",
      dataIndex: "amount",
      key: "total",
      render: (amount) => `Rs ${(amount?.total || 0).toFixed(2)}`,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (status) => (
    //     <span className={`badge bg-${status === 'paid' ? 'success' : 'danger'}`}>
    //       {status || 'unpaid'}
    //     </span>
    //   )
    // }
  ];

  if (isLoading) return <>hi</>;
  if (isError) return <div className="alert alert-danger">Error loading orders</div>;

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="add-item d-flex">
            <div className="page-title">
              <h4>Sales Report</h4>
              <h6>Manage your Sales report</h6>
            </div>
          </div>
          <ul className="table-top-head">
            <RefreshIcon />
            <CollapesIcon />
          </ul>
        </div>

        {/* Stats Cards */}
        <div className="row">
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card border border-success sale-widget flex-fill">
              <div className="card-body d-flex align-items-center">
                <span className="sale-icon bg-success text-white">
                  <i className="ti ti-align-box-bottom-left-filled fs-24" />
                </span>
                <div className="ms-2">
                  <p className="fw-medium mb-1">Total Revenue</p>
                  <div>
                    <h3>Rs {reportStats.totalAmount.toFixed(2)}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card border border-info sale-widget flex-fill">
              <div className="card-body d-flex align-items-center">
                <span className="sale-icon bg-info text-white">
                  <i className="ti ti-align-box-bottom-left-filled fs-24" />
                </span>
                <div className="ms-2">
                  <p className="fw-medium mb-1">Total Paid</p>
                  <div>
                    <h3>Rs {reportStats.totalPaid.toFixed(2)}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card border border-orange sale-widget flex-fill">
              <div className="card-body d-flex align-items-center">
                <span className="sale-icon bg-orange text-white">
                  <i className="ti ti-moneybag fs-24" />
                </span>
                <div className="ms-2">
                  <p className="fw-medium mb-1">Total Unpaid</p>
                  <div>
                    <h3>Rs {reportStats.totalUnpaid.toFixed(2)}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12 d-flex">
            <div className="card border border-danger sale-widget flex-fill">
              <div className="card-body d-flex align-items-center">
                <span className="sale-icon bg-danger text-white">
                  <i className="ti ti-alert-circle-filled fs-24" />
                </span>
                <div className="ms-2">
                  <p className="fw-medium mb-1">Overdue</p>
                  <div>
                    <h3>Rs {reportStats.overdue.toFixed(2)}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card border-0">
          <div className="card-body pb-1">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row align-items-end">
                <div className="col-lg-10">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label className="form-label">Date Range</label>
                        <DatePicker.RangePicker
                          className="form-control"
                          onChange={setDateRange}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label className="form-label">Store</label>
                        <Select
                          classNamePrefix="react-select"
                          options={Store}
                          placeholder="All Stores"
                          value={selectedStore}
                          onChange={setSelectedStore}
                          isClearable
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label className="form-label">Products</label>
                        <Select
                          classNamePrefix="react-select"
                          options={ProductName}
                          placeholder="All Products"
                          value={selectedProduct}
                          onChange={setSelectedProduct}
                          isClearable
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="mb-3">
                    <button 
                      className="btn btn-primary w-100" 
                      type="button"
                      onClick={() => {
                        setDateRange(null);
                        setSelectedStore(null);
                        setSelectedProduct(null);
                        setSearchText("");
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Orders Table */}
        <div className="card table-list-card hide-search">
          <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <div>
              <h4>Sales Report</h4>
              <p>Showing {filteredData.length} of {orders.length} orders</p>
            </div>
            <div className="search-set">
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button className="btn btn-searchset">
                  <i className="ti ti-search" />
                </button>
              </div>
            </div>
            <ul className="table-top-head">
              <TooltipIcons />
              <li>
                <Link data-bs-toggle="tooltip" data-bs-placement="top" title="Print">
                  <i className="ti ti-printer" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              {filteredData.length > 0 ? (
                <Table 
                  columns={columns} 
                  dataSource={filteredData} 
                  rowKey="_id"
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '25', '50', '100']
                  }}
                />
              ) : (
                <div className="alert alert-info">No orders found matching your criteria</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CommonFooter />
    </div>
  );
};

export default TransactionReport;