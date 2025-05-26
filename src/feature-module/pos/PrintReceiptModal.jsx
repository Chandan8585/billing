import React, { useRef } from 'react';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import PropTypes from 'prop-types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PrintReceiptModal = ({ user, serverCart, amount }) => {
  const receiptRef = useRef();

  const handleGeneratePDF = () => {
    const input = receiptRef.current;
    
    if (!input) {
      console.error('PDF content ref is not available');
      return;
    }
  
    html2canvas(input, {
      scale: 2, // Higher quality
      logging: false,
      useCORS: true,
      allowTaint: true
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm'
      });
  
      // Calculate PDF dimensions to maintain aspect ratio
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Create a blob from the PDF
      const pdfBlob = pdf.output('blob');
      
      // Create an object URL for the blob
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      // Open the PDF in a new window and trigger print
      const printWindow = window.open(pdfUrl);
      
      // Wait for the PDF to load before printing
      printWindow.onload = () => {
        // Add a small delay to ensure the PDF is fully loaded
        setTimeout(() => {
          printWindow.print();
          // Clean up the object URL after printing
          URL.revokeObjectURL(pdfUrl);
        }, 500);
      };
    });
  };

  return (
    <div className="modal fade" id="print-receipt" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body p-4">
            {/* PDF content with explicit ID and ref */}
            <div id="print-content" ref={receiptRef} style={{ backgroundColor: 'white', padding: '20px' }}>
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
                <h6 className="text-center mb-0">ORDER INVOICE</h6>
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
                      <td>{item?.product?.productName}</td>
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

            {/* PDF controls - won't appear in PDF */}
            <div className="text-center mt-4">
              <button 
                onClick={handleGeneratePDF}
                className="btn btn-primary px-4 me-2"
              >
                Print Recipt
              </button>
              <button 
                className="btn btn-secondary px-4" 
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