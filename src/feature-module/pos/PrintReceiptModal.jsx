import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { Link } from 'react-router-dom';

const PrintReceiptModal = ({ user, serverCart, amount }) => {
 const receiptRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    pageStyle: `
      @page { size: auto; margin: 5mm; }
      body { font-family: Arial; }
      .print-content { padding: 20px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
      .text-end { text-align: right; }
      .no-print { display: none; }
    `,
    onAfterPrint: () => console.log('Printed successfully!')
  });

  return (
    <div className="modal fade" id="print-receipt" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body p-4">
            {/* This div will be printed */}
            <div className="print-content" ref={receiptRef}>
              <div className="text-center mb-3">
                <ImageWithBasePath 
                  src="assets/img/logo.png" 
                  width={150} 
                  alt="Company Logo" 
                  className="mb-2"
                />
                <h5>{user?.company || 'Your Company'}</h5>
                <p className="mb-1">Phone: +91 9876543210</p>
                <p>Email: company@example.com</p>
              </div>
              
              <div className="border-top border-bottom py-2 my-3">
                <h6 className="text-center mb-0">TAX INVOICE</h6>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <p className="mb-1"><strong>Invoice No:</strong> INV-{Math.floor(Math.random() * 10000)}</p>
                  <p className="mb-1"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                </div>
                <div className="col-6 text-end">
                  <p className="mb-1"><strong>Customer ID:</strong> CUST-{Math.floor(Math.random() * 1000)}</p>
                </div>
              </div>

              <table className="table mb-4">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th className="text-end">Price</th>
                    <th className="text-end">Qty</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {serverCart?.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.productName}</td>
                      <td className="text-end">₹{item.saleRate}</td>
                      <td className="text-end">{item.quantity}</td>
                      <td className="text-end">₹{(item.saleRate * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="text-end border-top pt-3">
                <p><strong>Sub Total:</strong> ₹{amount?.subtotal}</p>
                <p><strong>Tax (GST):</strong> ₹{amount?.tax}</p>
                <p><strong>Discount:</strong> -₹{amount?.discount}</p>
                <h5><strong>Total:</strong> ₹{amount?.total}</h5>
              </div>

              <div className="text-center mt-4 pt-3 border-top">
                <p className="mb-1">Thank you for your business!</p>
                <small>** Terms and conditions apply</small>
              </div>
            </div>

            <div className="text-center mt-4 no-print">
              <button 
                onClick={handlePrint}
                className="btn btn-primary px-4"
              >
                Print Receipt
              </button>
              <button 
                className="btn btn-secondary px-4 ms-2" 
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintReceiptModal;