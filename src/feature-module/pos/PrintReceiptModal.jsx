import React, { useState } from 'react';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import PropTypes from 'prop-types';

const PrintReceiptModal = ({ user, serverCart, amount }) => {
  const [showModal, setShowModal] = useState(false);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            @page {
              size: A5 portrait;
              margin: 0;
              padding: 0;
            }
            body {
              font-family: 'Arial Narrow', Arial, sans-serif;
              color: #000;
              margin: 0;
              padding: 0;
              width: 148mm;
              font-size: 12px;
            }
            .receipt-container {
              width: 100%;
              padding: 5mm;
              box-sizing: border-box;
            }
            .text-center { text-align: center; }
            .text-end { text-align: right; }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 5px 0;
              font-size: 11px;
            }
            th, td {
              padding: 3px 5px;
              border-bottom: 1px dashed #000;
              text-align: left;
            }
            .text-end th, .text-end td {
              text-align: right;
            }
            .border-top { border-top: 1px solid #000; }
            .border-bottom { border-bottom: 1px solid #000; }
            .logo {
              max-width: 60mm;
              height: auto;
              margin: 0 auto 5px;
              display: block;
            }
            .company-name {
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 3px;
            }
            .invoice-title {
              font-size: 13px;
              font-weight: bold;
              margin: 5px 0;
            }
            .total-section {
              font-size: 13px;
              margin-top: 8px;
            }
            .thank-you {
              margin-top: 10px;
              font-style: italic;
            }
            .terms {
              font-size: 10px;
              margin-top: 5px;
            }
            .no-border {
              border: none !important;
            }
            .dashed-border {
              border-bottom: 1px dashed #000;
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            ${document.getElementById('print-content').innerHTML}
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 200);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <>
      {/* Modal */}
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} id="print-receipt" tabIndex="-1" style={{ backgroundColor: showModal ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-4">
              {/* Receipt content */}
              <div id="print-content" className="receipt-content" style={{ color: '#000000' }}>
                <div className="text-center mb-2">
                  <ImageWithBasePath 
                    src="assets/img/logo.png" 
                    width={120} 
                    alt="Company Logo" 
                    className="logo"
                  />
                  <div className="company-name">{user?.company || 'Your Company'}</div>
                  <div>Phone: +91 9876543210</div>
                  <div>Email: company@example.com</div>
                </div>
                
                <div className="text-center border-top border-bottom py-1 my-1">
                  <div className="invoice-title">ORDER INVOICE</div>
                </div>

                <table className="no-border">
                  <tbody>
                    <tr>
                      <td><strong>Invoice No:</strong> INV-{Math.floor(Math.random() * 10000)}</td>
                      <td className="text-end"><strong>Date:</strong> {new Date().toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="dashed-border"><strong>Customer ID:</strong> CUST-{Math.floor(Math.random() * 1000)}</td>
                    </tr>
                  </tbody>
                </table>

                <table>
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
                        <td>{item?.product?.productName}</td>
                        <td className="text-end">₹{item.saleRate}</td>
                        <td className="text-end">{item.quantity}</td>
                        <td className="text-end">₹{(item.saleRate * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="text-end total-section">
                  <table className="no-border">
                    <tbody>
                      <tr>
                        <td className="text-end"><strong>Sub Total:</strong></td>
                        <td className="text-end" style={{ width: '30mm' }}>₹{amount?.subtotal}</td>
                      </tr>
                      <tr>
                        <td className="text-end"><strong>Tax (GST):</strong></td>
                        <td className="text-end">₹{amount?.tax}</td>
                      </tr>
                      <tr>
                        <td className="text-end"><strong>Discount:</strong></td>
                        <td className="text-end">-₹{amount?.discount}</td>
                      </tr>
                      <tr className="border-top">
                        <td className="text-end"><strong>TOTAL:</strong></td>
                        <td className="text-end">₹{amount?.total}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="text-center thank-you">
                  Thank you for your business!
                </div>
                <div className="text-center terms">
                  ** Terms and conditions apply
                </div>
              </div>

              {/* Print controls */}
              <div className="text-center mt-4">
                <button 
                  onClick={handlePrint}
                  className="btn btn-primary px-4 me-2"
                  data-bs-dismiss="modal"
                >
                  Print Receipt
                </button>
                <button 
                  className="btn btn-secondary px-4" 
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

PrintReceiptModal.propTypes = {
  user: PropTypes.shape({
    company: PropTypes.string,
  }),
  serverCart: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.shape({
        productName: PropTypes.string,
      }),
      saleRate: PropTypes.number,
      quantity: PropTypes.number,
    })
  ),
  amount: PropTypes.shape({
    subtotal: PropTypes.number,
    tax: PropTypes.number,
    discount: PropTypes.number,
    total: PropTypes.number,
  }),
};

export default PrintReceiptModal;