import React, { useState } from "react";
import { useCreateUnitMutation } from "../../redux/api/productApi";

const Addunits = ({ onSubmit }) => {
  const [unitName, setUnitName] = useState('');
  const [shortName, setShortName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [createUnit] = useCreateUnitMutation();

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!unitName.trim()) {
    alert('Unit name is required');
    return;
  }

  setIsLoading(true);

  try {
    const response = await createUnit({
      unitName: unitName.trim(),
      shortName: shortName.trim()
    }).unwrap();
    
    alert("Unit added successfully");
    onSubmit(response); // Pass the direct response
    
    // Close modal with fallback
    const modalEl = document.getElementById('add-unit');
    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modal.hide();
    
    setUnitName('');
    setShortName('');
    
  } catch (error) {
    console.error('Error creating unit:', error);
    alert(`Error: ${error.data?.message || 'Failed to add unit'}`);
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="modal fade" id="add-unit">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="page-wrapper-new p-0">
            <div className="content">
              <div className="modal-header border-0 custom-modal-header">
                <div className="page-title">
                  <h4>Add Unit</h4>
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
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Unit Name*</label>
                    <input
                      type="text" 
                      className="form-control" 
                      value={unitName}
                      onChange={(e) => setUnitName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Short Name</label>
                    <input
                      type="text" 
                      className="form-control" 
                      value={shortName}
                      onChange={(e) => setShortName(e.target.value)}
                    />
                  </div>
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={isLoading || !unitName.trim()}
                    >
                      {isLoading ? 'Adding...' : 'Add Unit'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addunits;